"""Ayudas en España: Spanish-only section /es/ayudas/ built from the Base de Datos Nacional de Subvenciones (BDNS).

Every build:
1. Lists the State (last 365 days) and regional (last 183 days) calls registered in the BDNS for companies
   (pymes and large companies) through its public API, and downloads the detail of the codes it has not seen.
2. Keeps the competitive or open-request calls that are still open (or closed less than 90 days ago, so their pages
   do not vanish), and drops nominative grants, prizes, cancelled calls and social/cultural/education aims.
3. With ANTHROPIC_API_KEY, writes a short clear title and a two-sentence summary for each new call (cached).
4. Writes /es/ayudas/ (search with assistant and map), one page per region, /es/ayudas/estatales/,
   one page per call (/es/ayudas/convocatoria/<código BDNS>/, schema.org MonetaryGrant) and /es/ayudas/ayudas.json.

State is kept in content/ayudas_cache.json (committed by the workflow) so the API is called gently and the site
still builds when the API is down. Source: Sistema Nacional de Publicidad de Subvenciones y Ayudas Públicas (IGAE).
"""
import json
import os
import re
import time
import urllib.parse
import urllib.request
from datetime import date, timedelta
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "content" / "ayudas_cache.json"
API = "https://www.infosubvenciones.es/bdnstrans/api"
BDNS_URL = "https://www.infosubvenciones.es/bdnstrans/GE/es/convocatorias/"
UA = {"User-Agent": "UllswaterInvestments-AyudasEspana/1.0 (+https://www.ullswaterinvestments.com/es/ayudas/)"}
KEEP_CLOSED_DAYS = 90
MAX_DETAILS = 1500  # per build; the cache carries the rest over to the next run

EXCLUDED_AIMS = {"Cultura", "Educación", "Servicios Sociales y Promoción Social", "Cooperación internacional para el desarrollo y cultural",
                 "Desempleo", "Otras Prestaciones económicas", "Acceso a la vivienda y fomento de la edificación"}
REGIONS = {"ANDALUCÍA": "Andalucía", "ARAGÓN": "Aragón", "PRINCIPADO DE ASTURIAS": "Asturias", "ILLES BALEARS": "Illes Balears",
           "CANARIAS": "Canarias", "CANTABRIA": "Cantabria", "CASTILLA-LA MANCHA": "Castilla-La Mancha", "CASTILLA Y LEÓN": "Castilla y León",
           "CATALUÑA": "Cataluña", "COMUNITAT VALENCIANA": "Comunitat Valenciana", "EXTREMADURA": "Extremadura", "GALICIA": "Galicia",
           "COMUNIDAD DE MADRID": "Comunidad de Madrid", "REGIÓN DE MURCIA": "Región de Murcia", "COMUNIDAD FORAL DE NAVARRA": "Navarra",
           "PAÍS VASCO": "País Vasco", "LA RIOJA": "La Rioja", "CIUDAD AUTÓNOMA DE CEUTA": "Ceuta", "CIUDAD AUTÓNOMA DE MELILLA": "Melilla"}
STATE = "Toda España"
# Tile cartogram of Spain: region, column, row, column span, short label (phones)
TILES = [["Galicia", 1, 1, 1, "Gal."], ["Asturias", 2, 1, 1, "Ast."], ["Cantabria", 3, 1, 1, "Cant."], ["País Vasco", 4, 1, 1, "Euskadi"],
         ["Navarra", 5, 1, 1, "Nav."], ["Castilla y León", 2, 2, 2, "Cast. y León"], ["La Rioja", 4, 2, 1, "Rioja"], ["Aragón", 5, 2, 1, "Arag."],
         ["Cataluña", 6, 2, 1, "Cat."], ["Extremadura", 2, 3, 1, "Extr."], ["Comunidad de Madrid", 3, 3, 1, "Madrid"],
         ["Castilla-La Mancha", 4, 3, 1, "CLM"], ["Comunitat Valenciana", 5, 3, 1, "C. Val."], ["Illes Balears", 6, 3, 1, "Bal."],
         ["Andalucía", 2, 4, 2, "Andalucía"], ["Región de Murcia", 4, 4, 1, "Murcia"], ["Canarias", 1, 5, 1, "Can."], ["Ceuta", 2, 5, 1, "Ceuta"],
         ["Melilla", 3, 5, 1, "Mel."]]
TILE_LABEL = {"Comunidad de Madrid": "Madrid", "Región de Murcia": "Murcia", "Comunitat Valenciana": "C. Valenciana"}
# Regional development agencies (same list as the daily sources sheet)
AGENCIES = {
    "Andalucía": [["Andalucía TRADE", "https://www.andaluciatrade.es"]],
    "Aragón": [["Instituto Aragonés de Fomento", "https://www.iaf.es"]],
    "Asturias": [["SEKUENS", "https://www.sekuens.es"]],
    "Illes Balears": [["IDI", "https://www.idi.es"]],
    "Canarias": [["ACIISI", "https://www.gobiernodecanarias.org/aciisi"], ["PROEXCA", "https://www.proexca.es"]],
    "Cantabria": [["SODERCAN", "https://www.sodercan.es"]],
    "Castilla-La Mancha": [["Adelante Empresas", "https://adelante-empresas.castillalamancha.es"]],
    "Castilla y León": [["Instituto para la Competitividad Empresarial (ICE)", "https://empresas.jcyl.es"]],
    "Cataluña": [["ACCIÓ", "https://www.accio.gencat.cat"]],
    "Comunitat Valenciana": [["IVACE+i", "https://www.ivace.es"], ["Agència Valenciana de la Innovació", "https://innoavi.es"]],
    "Extremadura": [["Extremadura Avante", "https://www.extremaduraavante.es"]],
    "Galicia": [["IGAPE", "https://www.igape.es"], ["GAIN", "https://gain.xunta.gal"]],
    "Comunidad de Madrid": [["Comunidad de Madrid", "https://www.comunidad.madrid"], ["Fundación madri+d", "https://www.madrimasd.org"]],
    "Región de Murcia": [["Instituto de Fomento (INFO)", "https://www.institutofomentomurcia.es"]],
    "Navarra": [["Gobierno de Navarra", "https://www.navarra.es"], ["SODENA", "https://www.sodena.com"]],
    "País Vasco": [["SPRI", "https://www.spri.eus"]],
    "La Rioja": [["ADER", "https://www.ader.es"]],
    "Ceuta": [["PROCESA", "https://www.procesa.es"]],
    "Melilla": [["Proyecto Melilla", "https://www.promesa.net"]],
}
CATS = ["I+D+i", "Digitalización", "Energía", "Inversión e industria", "Agroalimentación", "Internacionalización", "Comercio y turismo", "Empleo y formación"]


# Programas estatales de convocatoria permanente (no aparecen como convocatorias nuevas en la BDNS). Datos de las fichas
# oficiales; revisar cuando cambien (fuente y fecha en cada uno).
PERMANENTES = [
    {"id": "cdti-pid", "nombre": "CDTI · Proyectos de I+D (PID)", "organismo": "CDTI Innovación", "tipo": "Ayuda parcialmente reembolsable",
     "que": "Proyectos de I+D empresarial aplicada, individuales o en cooperación (nacional o internacional), con hasta 48 meses en cooperación nacional.",
     "quien": "Empresas con personalidad jurídica que desarrollen el proyecto en España.",
     "datos": [["Presupuesto mínimo", "175.000 € por empresa"], ["Financiación", "Hasta el 85 % del presupuesto aprobado"],
               ["Tramo no reembolsable", "Sí, según disponibilidad de fondos"], ["Duración", "De 12 a 36 meses"]],
     "url": "https://www.cdti.es/", "fuente": "Ficha CDTI «Proyectos de I+D», julio de 2026",
     "pdf": "https://www.cdti.es/sites/default/files/2026-09/1._proyectos_de_id_2026_07_0.pdf", "cat": "I+D+i"},
    {"id": "cdti-lic", "nombre": "CDTI · Línea Directa de Innovación (LIC)", "organismo": "CDTI Innovación", "tipo": "Ayuda parcialmente reembolsable (de minimis)",
     "que": "Proyectos de innovación tecnológica de 9 a 24 meses: activos fijos nuevos, personal, materiales, servicios externos y gastos generales.",
     "quien": "Empresas con domicilio fiscal en España (las grandes, con calificación al menos B-).",
     "datos": [["Presupuesto", "De 175.000 € a 6 millones €"], ["Financiación", "Hasta el 75 % (85 % con FEDER)"],
               ["Tramo no reembolsable", "7 % (10 % con fondos europeos)"], ["Interés", "Euribor a un año + 0,50 % (5 años) o + 1 % (7 años)"],
               ["Solicitud", "Continua, todo el año"]],
     "url": "https://www.cdti.es/", "fuente": "Ficha CDTI «Línea Directa de Innovación», enero de 2026",
     "pdf": "https://www.cdti.es/sites/default/files/2026-02/3.lic_2026_02.pdf", "cat": "I+D+i"},
    {"id": "cdti-lica", "nombre": "CDTI · Línea Directa de Expansión (LIC-A)", "organismo": "CDTI Innovación", "tipo": "Ayuda parcialmente reembolsable",
     "que": "Inversión inicial innovadora en zonas asistidas: nuevo establecimiento, ampliación, diversificación o transformación de la producción.",
     "quien": "Pymes en zonas «c»; pymes y grandes empresas en zonas «a» (Andalucía, Canarias, Castilla-La Mancha, Extremadura, Murcia, Ceuta y Melilla).",
     "datos": [["Presupuesto", "De 175.000 € a 30 millones €"], ["Financiación", "Hasta el 75 %"], ["Interés", "Euribor a un año + 0,75 %"],
               ["Devolución", "9 años, con 1 año de carencia"]],
     "url": "https://www.cdti.es/", "fuente": "Ficha CDTI «Línea Directa de Expansión», julio de 2026",
     "pdf": "https://www.cdti.es/sites/default/files/2026-09/4._lica_2026_07.pdf", "cat": "Inversión e industria"},
    {"id": "enisa", "nombre": "ENISA · Préstamos participativos", "organismo": "ENISA (Ministerio de Industria y Turismo)", "tipo": "Préstamo participativo",
     "que": "Financiación de proyectos empresariales viables e innovadores de pymes y startups, sin ceder capital. Además de sus líneas generales, tiene líneas temáticas como Emprendedoras Digitales, AgroInnpulso y Audiovisual e Industrias Culturales y Creativas.",
     "quien": "Pymes y startups con sede en España.",
     "datos": [["Actividad 2025", "514 préstamos por 86,2 M€ (importe medio de unos 179.000 €)"], ["Solicitud", "Abierta, en la web de ENISA"]],
     "url": "https://www.enisa.es/", "fuente": "Nota de prensa del Ministerio de Industria y Turismo, 29 de enero de 2026", "cat": "Inversión e industria"},
    {"id": "ico", "nombre": "ICO · Empresas y Emprendedores", "organismo": "Instituto de Crédito Oficial (a través de los bancos)", "tipo": "Préstamo, leasing, renting o línea de crédito",
     "que": "Liquidez, inversión en activos fijos nuevos o de segunda mano, vehículos, reformas, tecnología y adquisición de empresas.",
     "quien": "Autónomos y empresas, públicas y privadas, que operen en España.",
     "datos": [["Financiación", "Hasta el 100 % de la necesidad (el máximo lo fija el banco)"], ["Plazo", "De 1 a 20 años, con hasta 3 de carencia"],
               ["Solicitud", "Todo 2026, en las entidades de crédito adheridas"]],
     "url": "https://www.ico.es/", "fuente": "Ficha de la Línea ICO Empresas y Emprendedores 2026", "cat": "Inversión e industria"},
]


def slug(s):
    import unicodedata
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


# ---------------------------------------------------------------- BDNS API
def api(path, params, tries=4):
    url = f"{API}/{path}?" + urllib.parse.urlencode(params)
    err = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001
            err = e
            time.sleep(2 * (i + 1))
    raise err


def list_codes(today):
    codes = {}
    for adm, days in (("C", 365), ("A", 183)):
        page = 0
        while page < 100:
            d = api("convocatorias/busqueda", {"vpd": "GE", "page": page, "pageSize": 50, "tiposBeneficiario": "3,4", "tipoAdministracion": adm,
                                               "fechaDesde": (today - timedelta(days=days)).strftime("%d/%m/%Y"), "fechaHasta": today.strftime("%d/%m/%Y")})
            for c in d.get("content", []):
                codes[str(c["numeroConvocatoria"])] = c.get("fechaRecepcion", "")
            if d.get("last") or not d.get("content"):
                break
            page += 1
            time.sleep(0.3)
    return codes


def keep(d):
    """Calls worth showing to companies: open-request or competitive, for companies, with an economic aim."""
    if "instrumental" in (d.get("tipoConvocatoria") or ""):
        return False
    if (d.get("descripcionFinalidad") or "") in EXCLUDED_AIMS:
        return False
    t = (d.get("descripcion") or "").lower()
    if re.search(r"anulada|\bpremio|concesión de una subvención a |concesión directa de una (?:ayuda|subvención) a (?!las personas titulares)", t):
        return False
    b = [x.get("descripcion", "") for x in d.get("tiposBeneficiarios") or []]
    return any("PYME" in x or "GRAN EMPRESA" in x for x in b)


def reduce(d):
    """Keep only what the pages need from a BDNS record."""
    o = d.get("organo") or {}
    return {
        "id": str(d["codigoBDNS"]), "descripcion": re.sub(r"\s+", " ", d.get("descripcion") or "").strip(),
        "n1": o.get("nivel1"), "n2": (o.get("nivel2") or "").replace("\xa0", " "), "n3": (o.get("nivel3") or "").replace("\xa0", " "),
        "recibida": d.get("fechaRecepcion"), "inicio": d.get("fechaInicioSolicitud"), "fin": d.get("fechaFinSolicitud"),
        "textFin": d.get("textFin"), "abierto": bool(d.get("abierto")), "presupuesto": d.get("presupuestoTotal"),
        "tipoConvocatoria": d.get("tipoConvocatoria"), "finalidad": d.get("descripcionFinalidad"),
        "instrumentos": [i.get("descripcion", "").strip() for i in d.get("instrumentos") or []],
        "beneficiarios": [i.get("descripcion", "").strip() for i in d.get("tiposBeneficiarios") or []],
        "sectores": [i.get("descripcion", "").strip() for i in d.get("sectores") or []][:8],
        "regiones": [i.get("descripcion", "").strip() for i in d.get("regiones") or []][:6],
        "fondos": [i.get("descripcion", "").strip() for i in d.get("fondos") or []], "mrr": bool(d.get("mrr")),
        "reglamento": (d.get("reglamento") or {}).get("descripcion"), "sede": d.get("sedeElectronica"),
        "bases": d.get("urlBasesReguladoras"), "basesTxt": d.get("descripcionBasesReguladoras"),
        "anuncios": [{"diario": a.get("desDiarioOficial"), "fecha": a.get("datPublicacion"), "url": a.get("url")} for a in d.get("anuncios") or []][:3],
    }


def load_cache():
    if CACHE.exists():
        try:
            return json.loads(CACHE.read_text(encoding="utf-8"))
        except ValueError:
            pass
    return {"updated": None, "items": {}, "seen": {}}


def refresh(today=None):
    """Update the cache from the BDNS. Never raises: on API trouble the cached data is used."""
    today = today or date.today()
    cache = load_cache()
    items, seen = cache["items"], cache["seen"]
    try:
        codes = list_codes(today)
    except Exception as e:  # noqa: BLE001
        print("ayudas: BDNS list failed, using cache:", e)
        return cache
    # re-check open calls without a closing date (their "abierto" flag changes)
    recheck = [c for c, x in items.items() if not x.get("fin") and x.get("abierto")]
    todo = [c for c in codes if c not in items and c not in seen] + recheck
    done = 0
    for c in todo[:MAX_DETAILS]:
        try:
            d = api("convocatorias", {"vpd": "GE", "numConv": c}, tries=2)
        except Exception as e:  # noqa: BLE001
            print("ayudas: detail failed", c, e)
            continue
        if keep(d):
            old = items.get(c, {})
            items[c] = {**reduce(d), **{k: old[k] for k in ("titulo_claro", "resumen") if k in old}}
        else:
            seen[c] = d.get("fechaRecepcion") or codes.get(c, "")
            items.pop(c, None)
        done += 1
        time.sleep(0.25)
    # prune: closed long ago, or no longer in the listing window and closed
    lim = (today - timedelta(days=KEEP_CLOSED_DAYS)).isoformat()
    for c in list(items):
        x = items[c]
        fin = x.get("fin") or deadline_hint(x)
        if (fin and fin < lim) or (not fin and not x.get("abierto")):
            seen[c] = x.get("recibida") or ""
            del items[c]
    old_seen = (today - timedelta(days=400)).isoformat()
    cache["seen"] = {c: r for c, r in seen.items() if (r or "9999") >= old_seen}
    cache["updated"] = today.isoformat()
    summarise(items, today)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"ayudas: {len(codes)} codes listed, {done} details fetched, {len(items)} calls kept")
    return cache


# ---------------------------------------------------------------- clear titles and summaries (Claude, optional)
SUM_PROMPT = """Eres editor de Ullswater Investments (asesores de financiación pública, Madrid). Recibes convocatorias de ayudas públicas españolas
tal como figuran en la Base de Datos Nacional de Subvenciones. Para cada una devuelve:
- "titulo": un título claro en español de España, de 50 a 95 caracteres, que diga qué se financia (sin "Resolución de…", sin fechas de la orden, sin mayúsculas sostenidas). Conserva nombres propios de programas (p. ej. INNTERCONECTA-STEP, PREE, Cheque TIC).
- "resumen": dos frases (máximo 300 caracteres) que digan qué financia y a quién va dirigida.
Usa SOLO los datos recibidos: no inventes importes, porcentajes, plazos ni requisitos. Dentro de los textos no uses comillas rectas ("): usa comillas angulares (« »).
Devuelve SOLO un objeto JSON válido {"<id>": {"titulo": "...", "resumen": "..."}}."""


def summarise(items, today, limit=300):
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        return 0
    model = os.environ.get("ANTHROPIC_MODEL") or "claude-sonnet-5-5"
    todo = [x for x in items.values() if not x.get("resumen") and (x.get("fin") or "9999") >= today.isoformat()][:limit]
    added = 0
    queue = [todo[i:i + 20] for i in range(0, len(todo), 20)]
    while queue:
        chunk = queue.pop(0)
        payload = {x["id"]: {"titulo_oficial": x["descripcion"], "organismo": x["n3"] or x["n2"], "ambito": x["n2"], "finalidad": x["finalidad"],
                             "beneficiarios": x["beneficiarios"], "sectores": x["sectores"], "fondos": x["fondos"], "instrumento": x["instrumentos"]} for x in chunk}
        req = urllib.request.Request("https://api.anthropic.com/v1/messages", method="POST", headers={
            "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
            data=json.dumps({"model": model, "max_tokens": 8000, "system": SUM_PROMPT,
                             "messages": [{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}]}).encode())
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                txt = "".join(b.get("text", "") for b in json.loads(r.read())["content"])
            out = json.loads(txt[txt.find("{"):txt.rfind("}") + 1])
        except Exception as e:  # noqa: BLE001
            print(f"ayudas: summary batch of {len(chunk)} failed:", e)
            if len(chunk) > 4:  # retry in halves; a single bad quote should not lose the whole batch
                queue += [chunk[:len(chunk) // 2], chunk[len(chunk) // 2:]]
            continue
        for x in chunk:
            v = out.get(x["id"]) or {}
            t, s = (v.get("titulo") or "").strip(), (v.get("resumen") or "").strip()
            if 20 <= len(t) <= 140 and 40 <= len(s) <= 420:
                x["titulo_claro"], x["resumen"] = t, s
                added += 1
    print(f"ayudas: {added} clear titles and summaries written")
    return added


# ---------------------------------------------------------------- presentation helpers
def cap(s):
    s = (s or "").strip().rstrip(".")
    if s.isupper():
        s = s.lower()
    return s[:1].upper() + s[1:]


SMALL = {"de", "del", "la", "las", "el", "los", "y", "e", "para", "en", "a", "i", "d'"}
ACR = {"info", "itrem", "icex", "icf", "ivace", "cdti", "sepe", "fogaiba", "icca", "intia", "soib", "spri", "ader", "e.p.e.", "agaur", "adrbalears", "ice", "igape", "idi", "iaf", "sodercan", "idae", "enisa", "ico", "cofides", "red.es", "aei", "isciii", "fega", "accio", "acció"}


def nice_org(o):
    o = (o or "").strip()
    if not (o.isupper() or o == o[:1] + o[1:].lower()):
        return o
    ws = o.lower().split(" ")
    out = []
    for i, w in enumerate(ws):
        core = w.strip("(),")
        if core in ACR:
            out.append(w.replace(core, core.upper()))
        elif i and w in SMALL:
            out.append(w)
        else:
            out.append(w[:1].upper() + w[1:])
    o = " ".join(out)
    o = re.sub(r"-(\w)", lambda m: "-" + m.group(1).upper(), o)
    return re.sub(r"\bD'(\w)", lambda m: "d'" + m.group(1).upper(), o)


def heuristic_title(t):
    t = re.sub(r"\s+", " ", t).strip()
    m = re.search(r"(?:de|efectúa la) convocatoria (?:plurianual )?(?:de |para )(ayudas .+|subvenciones .+)", t, re.I)
    if m and re.match(r"(?i)resoluci|orden", t):
        t = m.group(1)
    m = re.search(r"por (?:la|el) que se (?:aprueba la convocatoria(?: para el año \d{4})? (?:del procedimiento de concesión )?de |aprueban? (?:la )?convocatoria (?:de |para )?|convocan?(?: para el año \d{4}| en el año \d{4}| para \d{4})?,? |establecen? (?:las bases reguladoras y )?(?:se convocan )?|regula la concesión directa de )(.+)", t, re.I)
    if m:
        t = m.group(1)
    t = re.sub(r"^(?:RESOLUCIÓN|ORDEN|Resolución|Orden|Resolucion)\s*(?:de convocatoria de |por la que se aprueba la )?", "", t)
    m = re.search(r"(?:aprueba la convocatoria de|De la convocatoria del año \d{4} de) (.+)", t, re.I)
    if m:
        t = m.group(1)
    t = re.sub(r"^(?:De|Del) \d{1,2} de \w+ de(?:l)? \d{4},?\s*(?:[^,]{0,60},\s*)?(?:para )?", "", t)
    t = re.sub(r",? cofinanciad[ao]s? (?:por|en).*$", "", t, flags=re.I)
    t = re.sub(r"^(?:la |las |los )", "", t, flags=re.I)
    t = re.sub(r"^[,\s]+", "", t)
    t = re.sub(r"^Onvocatoria", "Convocatoria", t)
    return cap(t)[:160]


def categories(x):
    txt = (x["descripcion"] + " " + (x.get("finalidad") or "") + " " + " ".join(x.get("sectores") or [])).lower()
    f, c = x.get("finalidad") or "", set()
    if f == "Investigación, desarrollo e innovación" or re.search(r"i\+d|investigaci|innovaci|tecnolog|desarrollo experimental|innterconecta|startup|emprendimiento innovador|esa bic", txt):
        c.add("I+D+i")
    if re.search(r"digital|ciberseg|inteligencia artificial|\btic\b|comercio electr", txt):
        c.add("Digitalización")
    if re.search(r"energ|eficiencia|renovable|autoconsumo|transición nuclear|descarboniz|hidrógeno", txt):
        c.add("Energía")
    if f == "Agricultura, Pesca y Alimentación" or re.search(r"agrar|agrícol|ganad|pesca|vitivin|forestal|regad|fitosanit|alimentari|explotacion|mataderos|acuicul|fertiliz", txt):
        c.add("Agroalimentación")
    if re.search(r"internacionaliz|exportaci|mercados de terceros|mercados exteriores|ferias?\b|misi[oó]n comercial", txt):
        c.add("Internacionalización")
    if f == "Fomento del Empleo" or re.search(r"contrataci|empleo|autoempleo|formación|personal investigador", txt):
        c.add("Empleo y formación")
    if f == "Comercio, Turismo y Pymes" or re.search(r"comerci|turism|artesan|hostel", txt):
        c.add("Comercio y turismo")
    if f == "Industria y Energía" or re.search(r"industri|inversi|productiv|reindustrializ", txt):
        c.add("Inversión e industria")
    return sorted(c, key=CATS.index) if c else ["Otras"]


def funds(x):
    out = set()
    for f in x.get("fondos") or []:
        k = f.split(" ")[0]
        out.add({"MRR": "PRTR", "FSE": "FSE+"}.get(k, k))
    if x.get("mrr"):
        out.add("PRTR")
    return sorted(out)


MONTHS = {m: i + 1 for i, ms in enumerate([["enero", "gener", "xaneiro", "urtarrila"], ["febrero", "febrer", "febreiro"], ["marzo", "març", "marzo"],
          ["abril", "abril"], ["mayo", "maig", "maio"], ["junio", "juny", "xuño"], ["julio", "juliol", "xullo"], ["agosto", "agost"],
          ["septiembre", "setiembre", "setembre", "setembro"], ["octubre", "outubro"], ["noviembre", "novembre", "novembro"],
          ["diciembre", "desembre", "decembro"]]) for m in ms}
_DATE = (r"(\d{1,2})[./-](\d{1,2})[./-](\d{4}|\d{2})\b"
         r"|(\d{1,2})(?:º|°)? (?:de |d')?(" + "|".join(sorted(MONTHS, key=len, reverse=True)) + r")(?:,)? (?:de |del )?(\d{4})")
_IA = {}


def _dates(t):
    out = []
    for m in re.finditer(_DATE, (t or "").lower()):
        try:
            if m.group(1):
                y = int(m.group(3)) + (2000 if len(m.group(3)) == 2 else 0)
                out.append(date(y, int(m.group(2)), int(m.group(1))))
            else:
                out.append(date(int(m.group(6)), MONTHS[m.group(5)], int(m.group(4))))
        except ValueError:
            pass
    return out


def ia_ficha(code):
    if code not in _IA:
        f = ROOT / "content" / "ayudas_ia" / f"{code}.json"
        try:
            _IA[code] = json.loads(f.read_text(encoding="utf-8")) if f.exists() else {}
        except ValueError:
            _IA[code] = {}
    return _IA[code]


def deadline_hint(x):
    """Closing date of a call the BDNS lists without one, read from its «textFin» (e.g. «26.08.2026», «hasta el 9 de octubre de
    2026») or from the AI ficha («… y termina el 30 de octubre de 2026»). None when the text gives no explicit end date."""
    got = _dates(x.get("textFin"))
    if not got:
        for t in ia_ficha(x["id"]).get("ficha") or []:
            if t.get("tema", "").startswith("Cómo y cuándo"):
                for sent in (sn for pt in t.get("puntos") or [] for sn in re.split(r"(?<=\.) ", pt.get("t") or "")):
                    if not re.search(r"plazo|solicitud|presentaci", sent, re.I) or re.search(r"ejecu|justifica", sent, re.I):
                        continue
                    for m in re.finditer(r"(?:termina|finaliza|acaba|concluye|hasta)\b[^.;]{0,30}?((?:\d{1,2}[./-]\d{1,2}[./-]\d{2,4})|(?:\d{1,2} de \w+ de \d{4}))", sent, re.I):
                        got += _dates(m.group(1))
    rec = min(d for d in ((x.get("inicio") or "")[:10], (x.get("recibida") or "")[:10], "9999") if d) if (x.get("inicio") or x.get("recibida")) else "2000-01-01"
    got = [d for d in got if rec <= d.isoformat() <= (date.fromisoformat(rec) + timedelta(days=3 * 366)).isoformat()]
    return max(got).isoformat() if got else None


NUM = {"un": 1, "una": 1, "uno": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6, "diez": 10, "quince": 15, "veinte": 20, "treinta": 30}


def relative_end(x):
    """Latest plausible end of a call whose deadline is only relative («15 días naturales», «dos meses desde la publicación»),
    counted from the later of its start date and its registration in the BDNS. Used only to stop showing as open the calls
    that clearly ended long ago, never as a displayed date."""
    texts = [x.get("textFin") or ""]
    for t in ia_ficha(x["id"]).get("ficha") or []:
        if t.get("tema", "").startswith("Cómo y cuándo"):
            texts += [pt.get("t") or "" for pt in (t.get("puntos") or [])[:2] if re.search(r"plazo", pt.get("t") or "", re.I)]
    if re.search(r"periodo|período|convocatoria abierta|hasta agotar|agotamiento", " ".join(texts), re.I):
        return None  # several application windows or open until funds run out: no single relative deadline
    best = None
    for t in texts:
        for m in re.finditer(r"\b(\d{1,3}|" + "|".join(NUM) + r")\s+(d[ií]as?\s+h[aá]biles|d[ií]as?(?:\s+naturales)?|mes(?:es)?)\b", t.lower()):
            n = int(m.group(1)) if m.group(1).isdigit() else NUM[m.group(1)]
            u = m.group(2)
            days = n * 31 if u.startswith("mes") else (n * 7 + 4) // 5 + 3 if "h" in u.replace("dí", "d").replace("di", "d")[3:] else n
            if 0 < days <= 400:
                best = max(best or 0, days)
    base = max((d for d in ((x.get("inicio") or "")[:10], (x.get("recibida") or "")[:10]) if d), default=None)
    return (date.fromisoformat(base) + timedelta(days=best + 30)).isoformat() if best and base else None  # 30 days of margin


def plazo_text(x):
    """BDNS free-text deadline («15 días naturales», «UN MES»…), tidied for display."""
    t = re.sub(r"\s+", " ", x.get("textFin") or "").strip().rstrip(".")
    t = re.sub(r"\bd(días)\b", r"\1", t)  # «15 ddías»
    t = cap(t)[:140] if t and not re.fullmatch(r"[\d./ -]+", t) else ""
    return re.sub(r"\b(boe|bocm|boja|bopa|boib|bocyl|bon|boa|bor|boc|bome|bocce|dogv|dogc|dog|doe|docm|borm|bopv|bdns)\b", lambda m: m.group(1).upper(), t)


def view(x, today):
    """Public record of one call, as used by the pages and ayudas.json."""
    region = STATE if x["n1"] == "ESTADO" else REGIONS.get(x["n2"], cap(x["n2"]))
    org = nice_org(x["n2"] if x["n1"] == "ESTADO" else (x["n3"] or x["n2"]))
    ins = " ".join(x.get("instrumentos") or []).upper()
    tipo = "Préstamo" if "PRÉSTAMO" in ins or "PRESTAMO" in ins else "Garantía" if "GARANT" in ins else "Subvención" if "SUBVENCI" in ins else "Otra"
    b = x.get("beneficiarios") or []
    ben = (["Pyme / autónomo"] if any("PYME" in s for s in b) else []) + (["Gran empresa"] if any("GRAN EMPRESA" in s for s in b) else []) \
        + (["Entidad sin actividad económica"] if any("NO DESARROLLAN" in s and "JURÍDICAS" in s for s in b) else [])
    pres = x.get("presupuesto")
    fin, fuente = x.get("fin"), "bdns" if x.get("fin") else None
    if not fin:
        fin = deadline_hint(x)
        fuente = "texto" if fin else None
    rel = None if fin else relative_end(x)
    estado = "cerrada" if (fin and fin < today) or (not fin and not x.get("abierto")) or (rel and rel < today) else "abierta"
    return {"id": x["id"], "titulo": x.get("titulo_claro") or heuristic_title(x["descripcion"]), "resumen": x.get("resumen") or "",
            "original": x["descripcion"], "organismo": org, "region": region, "ambito": "Estatal" if region == STATE else "Autonómica",
            "presupuesto": round(pres) if pres and pres >= 1000 else None, "inicio": x.get("inicio"), "fin": fin, "estado": estado,
            "finalidad": x.get("finalidad"), "categorias": categories(x), "tipo": tipo,
            "concurrencia": "Competitiva" if "competitiva" in (x.get("tipoConvocatoria") or "") else "Por orden de solicitud",
            "fondos": funds(x), "beneficiarios": ben, "sede": x.get("sede"), "bases": x.get("bases"), "recibida": x.get("recibida"),
            "fin_fuente": fuente, "plazo_txt": "" if fin else plazo_text(x),
            "url": f"/es/ayudas/convocatoria/{x['id']}/", "bdns": BDNS_URL + x["id"]}


def group(views):
    """Merge near-identical lines (same body, title and deadline) into one entry."""
    g = {}
    for v in views:
        k = (v["organismo"], v["titulo"][:70], v["fin"])
        if k in g:
            h = g[k]
            h["lineas"] = h.get("lineas", 1) + 1
            h.setdefault("otros", []).append(v["id"])
            if v["presupuesto"]:
                h["presupuesto"] = (h["presupuesto"] or 0) + v["presupuesto"]
        else:
            g[k] = dict(v)
    return list(g.values())


def eur(n):
    if not n:
        return "No indicado"
    if n >= 1e6:
        return f"{n / 1e6:,.1f}".replace(",", "X").replace(".", ",").replace("X", ".").replace(",0", "") + " M€"
    if n >= 1e3:
        return f"{round(n / 1e3):,}".replace(",", ".") + " mil €"
    return f"{round(n):,} €".replace(",", ".")


MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]


def fdate(iso):
    if not iso:
        return "Sin fecha fija"
    y, m, d = iso.split("-")
    return f"{int(d)} {MESES[int(m) - 1]} {y}"


def days_left(iso, today):
    return (date.fromisoformat(iso) - date.fromisoformat(today)).days


# ---------------------------------------------------------------- pages
CSS = """.ay-hero{background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 100%);color:#fff}
.ay-hero .wrap{padding:44px 22px 40px}.ay-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:40px;align-items:center}
.ay-hero h1{font-size:44px;line-height:1.08;margin:0 0 12px;color:#fff}.ay-hero .lead{font-size:18px;margin:0 0 20px}
.ay-wiz{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:14px;padding:16px;display:grid;gap:12px}
.ay-wiz label{display:grid;gap:4px;font-size:14px;color:#d5dcef}
.ay select,.ay input[type=search]{font:inherit;font-size:16px;min-height:44px;border-radius:9px;border:1px solid var(--line);padding:8px 12px;background:#fff;color:var(--ink);width:100%}
.ay select:focus-visible,.ay input:focus-visible,.ay button:focus-visible,.ay a:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.ay-n{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;color:#d5dcef}.ay-n b{font-size:32px;color:var(--gold);line-height:1}
.ay-map{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-rows:66px;gap:6px}
.ay-t{border:0;border-radius:10px;background:#2e4380;color:#fff;font:inherit;cursor:pointer;padding:6px 8px;text-align:left;display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;transition:transform .15s}
.ay-t:hover{transform:translateY(-2px);background:#3a519a;color:#fff}.ay-t small{font-size:13px;line-height:1.15;color:#e6e9f4}.ay-t span{font-size:20px;font-weight:700}
.ay-t .ab{display:none}.ay-t.on{outline:3px solid var(--gold);outline-offset:1px}.ay-t.zero{opacity:.45}
.ay-leg{font-size:13px;color:#c5cbe0;margin-top:10px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center}
.ay-all{background:transparent;border:1px solid rgba(255,255,255,.45);color:#fff;border-radius:999px;font:inherit;font-size:14px;padding:6px 14px;min-height:36px;cursor:pointer;text-decoration:none}
.ay-all.on{background:var(--gold);color:var(--navy);border-color:var(--gold)}
.ay .wrap.body{padding-top:34px;padding-bottom:20px}
.ay-f{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;align-items:end}.ay-f label{display:grid;gap:4px;font-size:14px;color:var(--muted)}
.ay-ck{display:flex!important;align-items:center;gap:8px;min-height:44px;color:var(--ink)!important}.ay-ck input{width:20px;height:20px;accent-color:var(--navy)}
.ay-rh{border-left:4px solid var(--gold);padding:4px 0 4px 16px;margin:0 0 20px}.ay-rh h2{margin:0;font-size:28px}.ay-rh p{margin:4px 0 0;color:var(--muted)}
.ay-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin:24px 0 12px}.ay-bar h2{margin:0;font-size:24px}
.ay-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:14px}
.ay-c{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:9px}
.ay-c:hover{border-color:var(--gold)}.ay-c h3{margin:0;font-size:17px;line-height:1.3}.ay-c h3 a{color:var(--navy);text-decoration:none}.ay-c h3 a:hover{text-decoration:underline}
.ay-m{font-size:14px;color:var(--muted)}.ay-tags{display:flex;flex-wrap:wrap;gap:6px}
.ay-tag{font-size:12.5px;border-radius:999px;padding:2px 10px;background:#f1f3f7;color:var(--ink);white-space:nowrap}.ay-tag.eu{background:#eef1fa;color:var(--navy);font-weight:700}
.ay-fx{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr) minmax(0,1fr);gap:8px;border-top:1px solid var(--line);padding-top:9px}
.ay-fx div{font-size:13px;color:var(--muted)}.ay-fx b{display:block;font-size:15px;color:var(--ink)}.ay-urg{color:#b42318!important}
.ay-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}.ay-b{display:inline-flex;align-items:center;min-height:40px;padding:6px 12px;border-radius:8px;border:1px solid var(--line);text-decoration:none;font-size:14px;font-weight:600;color:var(--navy);background:#fff;font-family:inherit;cursor:pointer}
.ay-b.p{background:var(--navy);color:#fff;border-color:var(--navy)}.ay-b.p:hover{background:var(--navy2);color:#fff}
.ay-empty{padding:28px;border:1px dashed var(--line);border-radius:12px;text-align:center;color:var(--muted)}.ay-more{display:flex;justify-content:center;margin-top:18px}
.ay-src{font-size:13.5px;color:var(--muted);margin-top:26px;max-width:90ch}
.ay-doc{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:32px;align-items:start}.ay-doc h2{font-size:24px;margin:26px 0 10px}
.ay-kv{width:100%;border-collapse:collapse;font-size:15px}.ay-kv th{text-align:left;font-weight:600;color:var(--muted);padding:9px 12px 9px 0;vertical-align:top;width:38%;border-bottom:1px solid var(--line)}.ay-kv td{padding:9px 0;border-bottom:1px solid var(--line)}
.ay-side{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:18px;display:grid;gap:10px;position:sticky;top:86px}
.ay-side .big{font-size:28px;font-weight:800;color:var(--navy);line-height:1.1}.ay-closed{background:#fdecea;color:#8a1c13;border-radius:8px;padding:10px 12px;font-weight:600}
.ay-regs{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.ay-regs a{font-size:14px;border:1px solid var(--line);border-radius:999px;padding:6px 12px;text-decoration:none;color:var(--navy)}
.aia{border:1px solid var(--line);border-radius:14px;padding:20px;margin:6px 0 22px;background:#fff}
.aia-h{display:flex;gap:12px;align-items:center}.aia-i{width:40px;height:40px;border-radius:50%;background:var(--navy);color:var(--gold);display:flex;align-items:center;justify-content:center;font-size:20px;flex:none}
.aia-h h2{margin:0!important;font-size:20px!important}.aia-h p{margin:2px 0 0;font-size:14px;color:var(--muted)}
.aia-q{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 12px}.aia-q button{font:inherit;font-size:14.5px;line-height:1.3;text-align:left;background:#f4f6fb;color:var(--navy);border:1px solid #d7dbe6;border-radius:999px;padding:8px 14px;min-height:40px;cursor:pointer}
.aia-q button:hover{border-color:var(--navy);background:#eef1fa}.aia-f{display:flex;gap:8px}.aia-f input{flex:1;min-width:0;font:inherit;font-size:16px;min-height:44px;border:1px solid var(--line);border-radius:9px;padding:8px 12px}
.aia-f button{font:inherit;font-weight:700;background:var(--gold);color:var(--navy);border:0;border-radius:9px;padding:0 18px;min-height:44px;cursor:pointer}
.aia-n{font-size:12.5px;color:var(--muted);margin:10px 0 0}.aia-br{background:var(--bg);border-left:4px solid var(--gold);padding:12px 16px;margin:0 0 6px;font-size:16px}
.ay-doc details{border-bottom:1px solid var(--line);padding:4px 0}.ay-doc summary{cursor:pointer;font-weight:700;color:var(--navy);padding:10px 0;font-size:16.5px;list-style-position:outside}
.ay-doc summary::marker{color:var(--gold)}.ay-doc details ul{margin:0 0 12px;padding-left:20px}.ay-doc details li{margin:6px 0}.ay-ref{display:block;font-size:12.5px;color:var(--muted)}
.ay-faq p{margin:0 0 8px}.ay-faq .more{font:inherit;font-size:14px;background:none;border:0;color:var(--navy);text-decoration:underline;cursor:pointer;padding:0;margin:0 0 12px}
.ay-wk{background:#fff8e6;border:1px solid #f0d58a;border-radius:12px;padding:16px 18px;margin:0 0 22px}.ay-wk h2{margin:0 0 8px;font-size:20px}
.ay-wk ul,.ay-cal ul{list-style:none;margin:0;padding:0}.ay-wk li,.ay-cal li{display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;padding:8px 0;border-top:1px solid rgba(0,0,0,.07);align-items:baseline}
.ay-wk li:first-child{border-top:0}.ay-wk time,.ay-cal time{font-weight:700;color:#b42318;font-size:14px}.ay-wk a,.ay-cal a{color:var(--navy);font-weight:600;text-decoration:none}.ay-wk a:hover,.ay-cal a:hover{text-decoration:underline}
.ay-wk small,.ay-cal small{display:block;color:var(--muted);font-size:13px}.ay-wk .all{display:inline-block;margin-top:8px;font-weight:700}
.ay-cal h2{font-size:22px;margin:28px 0 6px;padding-bottom:6px;border-bottom:2px solid var(--gold)}.ay-cal time.far{color:var(--ink)}
.ay-pp{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:14px}.ay-pp .ay-c p{margin:0;font-size:15px}
.ay-pp dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;margin:0;font-size:14px;border-top:1px solid var(--line);padding-top:9px}.ay-pp dt{color:var(--muted)}.ay-pp dd{margin:0;font-weight:600}
.ay-perm{border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin:22px 0 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center;background:var(--bg)}
.ay-perm p{margin:0}.ay-perm b{color:var(--navy)}
@media(max-width:900px){.ay-grid,.ay-doc{grid-template-columns:minmax(0,1fr)}.ay-side{position:static}.ay-hero h1{font-size:34px}}
@media(max-width:600px){.ay-wk li,.ay-cal li{grid-template-columns:minmax(0,1fr);gap:2px}.aia-q button:nth-child(n+5){display:none}.aia{padding:16px}.ay-t .lg{display:none}.ay-t .ab{display:block}.ay-t span{font-size:17px}.ay-map{gap:4px;grid-auto-rows:56px}.ay-fx{grid-template-columns:repeat(2,minmax(0,1fr))}.ay-kv th{width:44%}}
@media(prefers-reduced-motion:reduce){.ay-t{transition:none}.ay-t:hover{transform:none}}"""


def card_html(v, today):
    if v["fin"]:
        d = days_left(v["fin"], today)
        plazo = f'<b class="{"ay-urg" if d <= 15 else ""}">{"Hoy" if d == 0 else "Mañana" if d == 1 else f"Quedan {d} días"}</b>{fdate(v["fin"])}'
    else:
        plazo = f'<b>Consultar bases</b>{escape(v["plazo_txt"][:48]) if v.get("plazo_txt") else "Sin fecha fija"}'
    tags = "".join(f'<span class="ay-tag eu">{escape(f)}</span>' for f in v["fondos"]) + "".join(
        f'<span class="ay-tag">{escape(c)}</span>' for c in v["categorias"] if c != "Otras")
    return (f'<article class="ay-c"><h3><a href="{v["url"]}">{escape(v["titulo"])}</a></h3>'
            f'<div class="ay-m">{escape(v["organismo"])} · {escape(v["region"])}{(" · " + str(v["lineas"]) + " líneas") if v.get("lineas") else ""}</div>'
            f'<div class="ay-tags">{tags}</div>'
            f'<div class="ay-fx"><div>{plazo}</div><div><b>{eur(v["presupuesto"])}</b>Presupuesto</div><div><b>{escape(v["tipo"])}</b>{"Concurrencia competitiva" if v["concurrencia"] == "Competitiva" else "Por orden de solicitud"}</div></div>'
            f'<div class="ay-links"><a class="ay-b" href="{v["url"]}">Ver ficha</a><a class="ay-b" href="{escape(v["bdns"])}" target="_blank" rel="noopener">Ficha oficial (BDNS) ↗</a></div></article>')


def tiles_html(counts, current=""):
    out = []
    for r, c, row, span, ab in TILES:
        n = counts.get(r, 0)
        lab = TILE_LABEL.get(r, r)
        out.append(f'<a class="ay-t{" on" if r == current else ""}{"" if n else " zero"}" style="grid-column:{c}/span {span};grid-row:{row}" href="/es/ayudas/{slug(r)}/" data-r="{escape(r)}" aria-label="{escape(r)}: {n} ayudas abiertas"><small class="lg">{escape(lab)}</small><small class="ab">{escape(ab)}</small><span>{n}</span></a>')
    return "".join(out)


def item_list_ld(views, base, name):
    return {"@context": "https://schema.org", "@type": "ItemList", "name": name, "numberOfItems": len(views),
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": base + v["url"], "name": v["titulo"]} for i, v in enumerate(views[:100])]}


def grant_ld(v, base):
    ld = {"@context": "https://schema.org", "@type": "MonetaryGrant", "@id": base + v["url"] + "#grant", "name": v["titulo"], "alternateName": v["original"][:300],
          "identifier": f"BDNS {v['id']}", "url": base + v["url"], "sameAs": v["bdns"],
          "funder": {"@type": "GovernmentOrganization", "name": v["organismo"], "areaServed": "España" if v["region"] == STATE else v["region"]},
          "areaServed": {"@type": "Place", "name": "España" if v["region"] == STATE else v["region"] + ", España"},
          "description": v["resumen"] or v["original"][:300], "inLanguage": "es"}
    if v["presupuesto"]:
        ld["amount"] = {"@type": "MonetaryAmount", "currency": "EUR", "value": v["presupuesto"]}
    if v["inicio"]:
        ld["startDate"] = v["inicio"]
    if v["fin"]:
        ld["endDate"] = v["fin"]
    return ld


GLUE = {"parael": "para el", "parala": "para la", "paralos": "para los", "paralas": "para las", "debenregir": "deben regir",
        "deberánregir": "deberán regir", "dela": "de la", "delas": "de las", "delos": "de los", "enel": "en el", "enla": "en la",
        "enlos": "en los", "enlas": "en las", "conel": "con el", "conla": "con la", "porel": "por el", "porla": "por la",
        "quese": "que se", "yla": "y la", "yel": "y el", "sobrela": "sobre la"}


def unglue(s):
    """Words the BDNS sometimes delivers stuck together («debenregir», «parael»)."""
    return re.sub(r"\b(" + "|".join(GLUE) + r")\b", lambda m: GLUE[m.group(1)], s or "")


def ia_parts(v, ia):
    """AI block (suggested questions), detail sections, FAQ and chat context of one grant page, from content/ayudas_ia/<id>.json."""
    sug = [q for q in ia.get("sugeridas") or [] if q.strip()][:6]
    chips = "".join(f'<button type="button" data-uaa-q="{escape(q)}">{escape(q)}</button>' for q in sug)
    top = (f'<section class="aia" aria-labelledby="aia-t"><div class="aia-h"><div class="aia-i" aria-hidden="true">✦</div><div>'
           f'<h2 id="aia-t">Pregunta a la IA sobre esta ayuda</h2><p>Responde con los documentos oficiales de la convocatoria, citando el artículo.</p></div></div>'
           f'<div class="aia-q">{chips}</div>'
           f'<form class="aia-f" id="aia-f"><label for="aia-in" style="position:absolute;left:-9999px">Tu pregunta sobre esta ayuda</label>'
           f'<input id="aia-in" maxlength="600" autocomplete="off" placeholder="Escribe tu pregunta sobre esta ayuda"><button type="submit">Preguntar</button></form>'
           f'<p class="aia-n">Asistente de IA. Información general, no es asesoramiento: comprueba siempre la convocatoria oficial. '
           f'¿Prefieres hablar con una persona? Usa «¿Te ayudamos a prepararla?».</p></section>')
    det = ""
    if ia.get("en_breve"):
        det += f'<h2>La ayuda en breve</h2><p class="aia-br">{escape(ia["en_breve"])}</p>'
    temas = [t for t in ia.get("ficha") or [] if t.get("puntos")]
    if temas:
        det += "<h2>La ayuda en detalle</h2>" + "".join(
            f'<details{" open" if i < 2 else ""}><summary>{escape(t["tema"])}</summary><ul>'
            + "".join(f'<li>{escape(p["t"])}<span class="ay-ref">{escape(p.get("ref") or "")}</span></li>' for p in t["puntos"])
            + "</ul></details>" for i, t in enumerate(temas))
    faq = [f for f in ia.get("faq") or [] if f.get("q") and f.get("a")]
    if faq:
        det += '<h2>Preguntas frecuentes</h2><div class="ay-faq">' + "".join(
            f'<details{" open" if i == 0 else ""}><summary>{escape(f["q"])}</summary><p>{escape(f["a"])}<span class="ay-ref">{escape(f.get("ref") or "")}</span></p>'
            f'<button type="button" class="more" data-uaa-q="{escape(f["q"])} Dame más detalle.">Ampliar con el asistente →</button></details>' for i, f in enumerate(faq)) + "</div>"
    if det:
        fu = " · ".join(escape(f["nombre"]) for f in ia.get("fuentes") or [])
        det += (f'<p class="ay-src">Resumen preparado con IA a partir de los documentos oficiales publicados ({fu}) el {fdate(ia.get("generado"))}. '
                f'Puede contener errores u omisiones: la referencia es siempre la convocatoria oficial.</p>')
    ld = {"@type": "FAQPage", "@id": "#faq", "mainEntity": [{"@type": "Question", "name": f["q"], "acceptedAnswer": {"@type": "Answer", "text": f["a"]}} for f in faq]} if faq else None
    ctx = {"tipo": "ayuda", "id": v["id"], "titulo": v["titulo"], "sugeridas": sug}
    js = ('<script type="application/json" id="uaa-ctx">' + json.dumps(ctx, ensure_ascii=False).replace("</", "<\\/") + "</script>"
          "<script>(function(){function go(q){q=(q||'').trim();if(!q)return;if(window.UAA&&window.UAA.ask)window.UAA.ask(q);else(window.UAA_Q=window.UAA_Q||[]).push(q)}"
          "document.querySelectorAll('[data-uaa-q]').forEach(function(b){b.addEventListener('click',function(){go(b.getAttribute('data-uaa-q'))})});"
          "var f=document.getElementById('aia-f'),i=document.getElementById('aia-in');if(f)f.addEventListener('submit',function(e){e.preventDefault();if(!i.value.trim()){i.focus();return}go(i.value);i.value=''})})()</script>")
    return top, det, ld, js


def ia_public(v, ia, base):
    """/es/ayudas/convocatoria/<id>/ia.json: what the chat assistant reads about this grant."""
    return {"id": v["id"], "titulo": v["titulo"], "titulo_oficial": v["original"], "url": base + v["url"], "bdns": v["bdns"], "organismo": v["organismo"],
            "region": v["region"], "plazo": {"inicio": v["inicio"], "fin": v["fin"], "estado": v["estado"]}, "presupuesto": v["presupuesto"],
            "en_breve": ia.get("en_breve"), "ficha": ia.get("ficha"), "faq": ia.get("faq"), "avisos": ia.get("avisos"),
            "fuentes": ia.get("fuentes"), "generado": ia.get("generado"), "secciones": ia.get("secciones")}


def summary(cache=None, today=None):
    """Figures for the promotion band on the home page: open calls, State/regional split, calls per region, closing in 7 days."""
    today = (today or date.today()).isoformat()
    cache = cache or load_cache()
    open_v = group([v for v in (view(x, today) for x in cache["items"].values()) if v["estado"] != "cerrada"])
    lim = (date.fromisoformat(today) + timedelta(days=7)).isoformat()
    regs = {}
    for v in open_v:
        regs[v["region"]] = regs.get(v["region"], 0) + 1
    return {"updated": cache.get("updated") or today, "open": len(open_v), "state": regs.get(STATE, 0),
            "regional": len(open_v) - regs.get(STATE, 0), "regions": sorted((r, n) for r, n in regs.items() if r != STATE),
            "closing7": sum(1 for v in open_v if v["fin"] and today <= v["fin"][:10] <= lim)}


def build(site_dir, base, chrome, today=None, cache=None, staging=False, book="", email=""):
    """Write every /es/ayudas/ page. chrome = {"head": css/font links, "header": html, "footer": html, "tail": scripts}. Returns the list of paths."""
    today = (today or date.today()).isoformat()
    cache = cache or load_cache()
    allv = [view(x, today) for x in cache["items"].values()]
    open_v = group([v for v in allv if v["estado"] != "cerrada"])
    open_v.sort(key=lambda v: (v["fin"] or "9999", v["titulo"]))
    updated = cache.get("updated") or today
    paths = []
    robots = '<meta name="robots" content="noindex,nofollow">' if staging else '<meta name="robots" content="index,follow,max-image-preview:large">'
    org_ld = {"@type": "ProfessionalService", "@id": base + "/#org", "name": "Ullswater Investments", "url": base + "/"}

    def bc(items):
        return {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": base + u} for i, (n, u) in enumerate(items)]}

    def doc(path, title, desc, body, lds, en=None):
        lang = chrome["header"].replace(' aria-current="page"', "")
        sw = (f'<nav class="lang" aria-label="Idioma"><a href="{en or "/"}" hreflang="en" lang="en" data-lang="en">EN</a>'
              f'<a href="{path}" hreflang="es" lang="es" data-lang="es" aria-current="true">ES</a></nav>')
        lang = re.sub(r'<nav class="lang".*?</nav>', sw, lang, count=1, flags=re.S)
        ld = {"@context": "https://schema.org", "@graph": [org_ld] + lds}
        html = f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)}</title><meta name="description" content="{escape(desc)}"><link rel="canonical" href="{base}{path}"><link rel="alternate" hreflang="es" href="{base}{path}">{robots}
<meta property="og:type" content="website"><meta property="og:site_name" content="Ullswater Investments · EU Funding Advisors"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{base}{path}"><meta property="og:locale" content="es_ES"><meta property="og:image" content="{base}/assets/og.png"><meta name="twitter:card" content="summary_large_image">
{chrome["head"]}<style>{CSS}</style><script type="application/ld+json">{json.dumps(ld, ensure_ascii=False).replace("</", "<\\/")}</script></head><body>
{lang}<main id="main" class="ay">{body}</main>{chrome["footer"]}{chrome["tail"]}</body></html>"""
        d = site_dir / path.strip("/")
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(html, encoding="utf-8")
        paths.append(path)

    src_note = (f'<p class="ay-src">Fuente: Base de Datos Nacional de Subvenciones (Sistema Nacional de Publicidad de Subvenciones y Ayudas Públicas, '
                f'Ministerio de Hacienda). Convocatorias del Estado y de las comunidades autónomas dirigidas a pymes y grandes empresas, '
                f'sin las subvenciones nominativas, los premios ni las convocatorias locales. Actualizado el {fdate(updated)}. '
                f'Los títulos están resumidos: el título oficial figura en cada ficha. Consulta siempre la convocatoria oficial antes de solicitar.</p>')
    help_band = (f'<section class="band alt"><div class="wrap"><div class="cta"><div><h2>¿Quieres saber qué ayuda encaja con tu proyecto?</h2>'
                 f'<p>Revisamos tu caso, combinamos ayudas españolas y europeas y preparamos la solicitud.</p></div><div class="actions" style="margin:0">'
                 f'<a class="btn" href="{book}" target="_blank" rel="noopener">Reserva una reunión</a><a class="btn ghost" style="white-space:normal;overflow-wrap:anywhere" href="mailto:{email}?subject=Ayudas%20en%20Espa%C3%B1a">{email}</a></div></div></div></section>')

    # ---- main search page
    counts = {}
    nat = sum(1 for v in open_v if v["region"] == STATE)
    for v in open_v:
        counts[v["region"]] = counts.get(v["region"], 0) + 1
    tile_counts = {r: counts.get(r, 0) + nat for r, *_ in TILES}
    data = json.dumps([{k: v[k] for k in ("id", "titulo", "organismo", "region", "presupuesto", "fin", "categorias", "tipo", "concurrencia", "fondos", "beneficiarios", "url", "bdns", "recibida", "original", "plazo_txt")} | ({"lineas": v["lineas"]} if v.get("lineas") else {}) for v in open_v],
                      ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    first = "".join(card_html(v, today) for v in open_v[:24])
    lim7 = (date.fromisoformat(today) + timedelta(days=7)).isoformat()
    week = [v for v in open_v if v["fin"] and v["fin"] <= lim7]

    def row(v):
        d = days_left(v["fin"], today)
        when = "Hoy" if d == 0 else "Mañana" if d == 1 else fdate(v["fin"])
        return (f'<li><time datetime="{v["fin"]}" class="{"" if d <= 15 else "far"}">{when}</time><div><a href="{v["url"]}">{escape(v["titulo"])}</a>'
                f'<small>{escape(v["organismo"])} · {escape(v["region"])} · {eur(v["presupuesto"])}</small></div></li>')
    week_html = (f'<section class="ay-wk" aria-labelledby="wk-t"><h2 id="wk-t">Cierran en los próximos 7 días ({len(week)})</h2><ul>'
                 + "".join(row(v) for v in week[:8]) + f'</ul><a class="all" href="/es/ayudas/cierres/">Calendario completo de cierres →</a></section>') if week else ""
    opts_reg = "".join(f"<option>{escape(r)}</option>" for r, *_ in TILES)
    opts_cat = "".join(f"<option>{escape(c)}</option>" for c in CATS)
    body = f"""<section class="ay-hero"><div class="wrap"><div class="ay-grid"><div>
<div class="crumbs"><a href="/es/">Inicio</a> › Ayudas en España</div>
<h1>Ayudas públicas para empresas en España</h1>
<p class="lead">Convocatorias estatales y autonómicas abiertas, con el plazo, el presupuesto y si llevan fondos europeos. Actualizado cada día desde la Base de Datos Nacional de Subvenciones.</p>
<div class="ay-wiz"><label for="q-reg">¿Dónde está tu empresa?<select id="q-reg"><option value="">Toda España</option>{opts_reg}</select></label>
<label for="q-size">¿Qué tamaño tiene?<select id="q-size"><option value="">Cualquier tamaño</option><option value="Pyme / autónomo">Pyme o autónomo</option><option value="Gran empresa">Gran empresa</option></select></label>
<label for="q-cat">¿Qué quieres financiar?<select id="q-cat"><option value="">Cualquier proyecto</option>{opts_cat}</select></label>
<div class="ay-n"><b id="n">{len(open_v)}</b><span id="nl">ayudas abiertas encajan</span></div></div></div>
<div><div class="ay-map" id="map" role="group" aria-label="Mapa de comunidades autónomas">{tiles_html(tile_counts)}</div>
<div class="ay-leg"><a class="ay-all on" id="all" href="/es/ayudas/">Toda España</a><span>Ayudas abiertas por comunidad (incluye las {nat} estatales)</span></div></div></div></div></section>
<div class="wrap body">{week_html}
<div class="ay-rh" id="rh" hidden><h2 id="rh-t"></h2><p id="rh-p"></p></div>
<div class="ay-f"><label for="f-q">Buscar<input type="search" id="f-q" placeholder="p. ej. eficiencia energética, ferias, I+D"></label>
<label for="f-tipo">Tipo de ayuda<select id="f-tipo"><option value="">Todas</option><option>Subvención</option><option>Préstamo</option></select></label>
<label for="f-plazo">Plazo<select id="f-plazo"><option value="">Todas las abiertas</option><option value="15">Cierra en 15 días</option><option value="60">Cierra en 60 días</option><option value="sin">Abierta sin fecha fija</option></select></label>
<label for="f-fondo">Fondos europeos<select id="f-fondo"><option value="">Con o sin fondos UE</option><option value="any">Solo con fondos UE</option></select></label>
<label for="f-sort">Ordenar<select id="f-sort"><option value="fin">Cierre más próximo</option><option value="pres">Mayor presupuesto</option><option value="new">Más recientes</option></select></label>
<label class="ay-ck"><input type="checkbox" id="f-est" checked> Incluir ayudas estatales</label></div>
<div class="ay-bar"><h2 id="rt">Ayudas abiertas en España</h2><button class="ay-b" id="reset" type="button">Quitar filtros</button></div>
<div class="ay-list" id="list">{first}</div><div class="ay-more"><button class="ay-b" id="more" type="button">Ver más</button></div>
<div class="ay-perm"><p><b>Programas abiertos todo el año:</b> CDTI (I+D, innovación y expansión), préstamos participativos de ENISA y líneas ICO. No salen como convocatorias nuevas en la BDNS.</p><a class="ay-b p" href="/es/ayudas/programas-permanentes/">Ver programas permanentes</a></div>
<p class="ay-src"><a href="/es/ayudas/cierres/">Calendario de cierres</a> · ¿Buscas también convocatorias europeas? <a href="https://calls.ullswaterinvestments.com/">Convocatorias UE abiertas</a> · <a href="https://calls.ullswaterinvestments.com/spain/">I+D+i en España (en inglés)</a> · <a href="/es/ayudas/ayudas.json">Datos en JSON</a></p>
{src_note}</div>{help_band}
<script>{{const DATA={data};const AG={json.dumps(AGENCIES, ensure_ascii=False)};const TODAY="{today}";const TILES={json.dumps(TILES, ensure_ascii=False)};const TL={json.dumps(TILE_LABEL, ensure_ascii=False)};
{JS}}}</script>"""
    doc("/es/ayudas/", f"Ayudas y subvenciones para empresas en España ({len(open_v)} abiertas) | Ullswater Investments",
        f"Buscador de las {len(open_v)} ayudas públicas estatales y autonómicas abiertas para pymes y grandes empresas: plazo, presupuesto, fondos europeos y enlace oficial. Actualizado a diario.",
        body, [bc([("Inicio", "/es/"), ("Ayudas en España", "/es/ayudas/")]), item_list_ld(open_v, base, "Ayudas abiertas para empresas en España")],
        en="https://calls.ullswaterinvestments.com/spain/")

    # ---- one page per region + State calls
    regs_links = '<div class="ay-regs">' + "".join(f'<a href="/es/ayudas/{slug(r)}/">{escape(r)}</a>' for r, *_ in TILES) + f'<a href="/es/ayudas/estatales/">Ayudas estatales</a><a href="/es/ayudas/cierres/">Calendario de cierres</a><a href="/es/ayudas/programas-permanentes/">Programas permanentes</a></div>'
    for r, *_ in TILES + [[STATE]]:
        own = [v for v in open_v if v["region"] == r]
        state = [v for v in open_v if v["region"] == STATE] if r != STATE else []
        p = "/es/ayudas/estatales/" if r == STATE else f"/es/ayudas/{slug(r)}/"
        name = "ayudas estatales para empresas" if r == STATE else f"ayudas para empresas en {r}"
        ag = AGENCIES.get(r, [])
        agl = (" Agencias de referencia: " + " · ".join(f'<a href="{escape(u)}" target="_blank" rel="noopener">{escape(n)}</a>' for n, u in ag) + ".") if ag else ""
        h1 = "Ayudas estatales para empresas" if r == STATE else f"Ayudas para empresas en {r}"
        lead = ("Convocatorias abiertas de la Administración General del Estado para empresas de toda España." if r == STATE else
                f"{len(own)} convocatorias abiertas del Gobierno autonómico y {len(state)} estatales a las que también pueden optar las empresas de {r}.")
        body = (f'<section class="ay-hero"><div class="wrap"><div class="crumbs"><a href="/es/">Inicio</a> › <a href="/es/ayudas/">Ayudas en España</a> › {escape(TILE_LABEL.get(r, r) if r != STATE else "Estatales")}</div>'
                f'<h1>{escape(h1)}</h1><p class="lead">{escape(lead)}</p></div></section><div class="wrap body">'
                + (f'<div class="ay-rh"><h2>Agencias y fuentes</h2><p>{agl.strip()}</p></div>' if agl else "")
                + f'<div class="ay-bar"><h2>{"Convocatorias estatales abiertas" if r == STATE else "Convocatorias de " + escape(r)} ({len(own)})</h2><a class="ay-b" href="/es/ayudas/{"" if r == STATE else "#" + slug(r)}">Filtrar en el buscador</a></div>'
                + (f'<div class="ay-list">{"".join(card_html(v, today) for v in own)}</div>' if own else '<div class="ay-empty">Ahora mismo no hay convocatorias autonómicas abiertas para empresas registradas en la BDNS. Vuelve pronto: se actualiza cada día.</div>')
                + (f'<div class="ay-bar"><h2>Ayudas estatales abiertas ({len(state)})</h2></div><div class="ay-list">{"".join(card_html(v, today) for v in state)}</div>' if state else "")
                + f'<div class="ay-bar"><h2>Otras comunidades</h2></div>{regs_links}{src_note}</div>{help_band}')
        doc(p, f"{h1}: {len(own) + len(state)} convocatorias abiertas | Ullswater Investments",
            f"{h1}: convocatorias abiertas con plazo, presupuesto, fondos europeos y enlace a la ficha oficial. Actualizado a diario.",
            body, [bc([("Inicio", "/es/"), ("Ayudas en España", "/es/ayudas/"), (h1, p)]), item_list_ld(own + state, base, h1)])

    # ---- calendar of deadlines
    dated = [v for v in open_v if v["fin"]]
    undated = [v for v in open_v if not v["fin"]]
    lim30 = (date.fromisoformat(today) + timedelta(days=30)).isoformat()
    groups = [("Esta semana", [v for v in dated if v["fin"] <= lim7]), ("En los próximos 30 días", [v for v in dated if lim7 < v["fin"] <= lim30])]
    later = {}
    for v in dated:
        if v["fin"] > lim30:
            later.setdefault(v["fin"][:7], []).append(v)
    MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    groups += [(f"{MES[int(k[5:]) - 1].capitalize()} de {k[:4]}", vs) for k, vs in sorted(later.items())]
    cal = "".join(f'<h2>{escape(g)} <span class="ay-m">({len(vs)})</span></h2><ul>{"".join(row(v) for v in vs)}</ul>' for g, vs in groups if vs)
    cal += (f'<h2>Sin fecha de cierre fija <span class="ay-m">({len(undated)})</span></h2><p class="ay-m">Plazos por periodos, hasta agotar el crédito o contados desde la publicación: consulta las bases.</p><ul>'
            + "".join(f'<li><time class="far">Ver bases</time><div><a href="{v["url"]}">{escape(v["titulo"])}</a><small>{escape(v["organismo"])} · {escape(v["region"])}'
                      f'{" · " + escape(v["plazo_txt"]) if v.get("plazo_txt") else ""}</small></div></li>' for v in undated) + "</ul>") if undated else ""
    body = (f'<section class="ay-hero"><div class="wrap"><div class="crumbs"><a href="/es/">Inicio</a> › <a href="/es/ayudas/">Ayudas en España</a> › Calendario de cierres</div>'
            f'<h1>Calendario de cierres de ayudas</h1><p class="lead">Las {len(open_v)} ayudas estatales y autonómicas abiertas para empresas, ordenadas por fecha de cierre. '
            f'{len(groups[0][1])} cierran esta semana.</p></div></section><div class="wrap body"><div class="ay-cal">{cal}</div>'
            f'<div class="ay-bar"><h2>Por comunidad</h2><a class="ay-b" href="/es/ayudas/">Abrir el buscador</a></div>{regs_links}{src_note}</div>{help_band}')
    doc("/es/ayudas/cierres/", f"Calendario de cierres de ayudas para empresas ({len(groups[0][1])} esta semana) | Ullswater Investments",
        f"Fechas de cierre de las {len(open_v)} ayudas públicas estatales y autonómicas abiertas para empresas en España, semana a semana. Actualizado a diario.",
        body, [bc([("Inicio", "/es/"), ("Ayudas en España", "/es/ayudas/"), ("Calendario de cierres", "/es/ayudas/cierres/")]),
               item_list_ld(dated, base, "Calendario de cierres de ayudas para empresas")])

    # ---- permanent State programmes (CDTI, ENISA, ICO)
    cards = "".join(
        f'<article class="ay-c" id="{p["id"]}"><h3><a href="{escape(p["url"])}" target="_blank" rel="noopener">{escape(p["nombre"])}</a></h3>'
        f'<div class="ay-m">{escape(p["organismo"])} · Toda España</div><div class="ay-tags"><span class="ay-tag eu">{escape(p["tipo"])}</span><span class="ay-tag">{escape(p["cat"])}</span></div>'
        f'<p>{escape(p["que"])}</p><p class="ay-m"><b>Para quién:</b> {escape(p["quien"])}</p>'
        f'<dl>{"".join(f"<dt>{escape(k)}</dt><dd>{escape(val)}</dd>" for k, val in p["datos"])}</dl>'
        f'<div class="ay-links"><a class="ay-b p" href="{escape(p["url"])}" target="_blank" rel="noopener">Web oficial ↗</a>'
        + (f'<a class="ay-b" href="{escape(p["pdf"])}" target="_blank" rel="noopener">Ficha oficial (PDF) ↗</a>' if p.get("pdf") else "")
        + f'</div><p class="ay-m" style="font-size:12.5px">Fuente: {escape(p["fuente"])}.</p></article>' for p in PERMANENTES)
    body = (f'<section class="ay-hero"><div class="wrap"><div class="crumbs"><a href="/es/">Inicio</a> › <a href="/es/ayudas/">Ayudas en España</a> › Programas permanentes</div>'
            f'<h1>Programas de financiación abiertos todo el año</h1><p class="lead">Instrumentos estatales que se solicitan en cualquier momento y que por eso no aparecen '
            f'como convocatorias nuevas en la Base de Datos Nacional de Subvenciones: CDTI, ENISA e ICO.</p></div></section>'
            f'<div class="wrap body"><div class="ay-pp">{cards}</div>'
            f'<p class="ay-src">Datos resumidos de las fichas oficiales de cada organismo en la fecha indicada. Las condiciones cambian: comprueba siempre la web oficial antes de solicitar. '
            f'Combinados con las <a href="/es/ayudas/">convocatorias estatales y autonómicas abiertas</a> y con los fondos europeos, permiten financiar buena parte de un proyecto.</p></div>{help_band}')
    doc("/es/ayudas/programas-permanentes/", "Programas de financiación permanentes: CDTI, ENISA e ICO | Ullswater Investments",
        "CDTI Proyectos de I+D y Línea Directa de Innovación, préstamos participativos de ENISA y Línea ICO Empresas y Emprendedores: qué financian, para quién y condiciones principales.",
        body, [bc([("Inicio", "/es/"), ("Ayudas en España", "/es/ayudas/"), ("Programas permanentes", "/es/ayudas/programas-permanentes/")]),
               {"@type": "ItemList", "name": "Programas de financiación permanentes para empresas en España", "itemListElement": [
                   {"@type": "ListItem", "position": i + 1, "item": {"@type": "FinancialProduct", "name": p["nombre"], "description": p["que"], "url": p["url"],
                                                                      "provider": {"@type": "GovernmentOrganization", "name": p["organismo"]}}} for i, p in enumerate(PERMANENTES)]}])

    # ---- one page per call (open and recently closed)
    import ayudas_ia
    n_ia = 0
    for v in group(allv):
        ia = ayudas_ia.load(v["id"]) or {}
        ia_top, ia_det, ia_ld, ia_js = ia_parts(v, ia) if ia.get("faq") else ("", "", None, "")
        closed = v["estado"] == "cerrada"
        rlink = "/es/ayudas/estatales/" if v["region"] == STATE else f"/es/ayudas/{slug(v['region'])}/"
        if v["fin"]:
            d = days_left(v["fin"], today)
            plazo = f"Cerrada el {fdate(v['fin'])}" if closed else f"Hasta el {fdate(v['fin'])} ({'hoy' if d == 0 else 'mañana' if d == 1 else f'quedan {d} días'})"
        else:
            plazo = (f"Según la convocatoria: {v['plazo_txt'].rstrip('.')}. Consulta las bases para la fecha exacta" if v.get("plazo_txt")
                     else "Sin fecha de cierre en la BDNS: consulta las bases")
        if v.get("fin_fuente") == "texto":
            plazo += ". Fecha tomada del texto de la convocatoria (la BDNS no la recoge)"
        rows = [("Organismo", escape(v["organismo"])), ("Ámbito", escape("Estatal (toda España)" if v["region"] == STATE else f"Autonómico: {v['region']}")),
                ("Plazo de solicitud", escape((f"Desde el {fdate(v['inicio'])}. " if v["inicio"] else "") + plazo)), ("Presupuesto", eur(v["presupuesto"]) + (f" ({v['lineas']} líneas)" if v.get("lineas") else "")),
                ("Tipo de ayuda", escape(v["tipo"])), ("Procedimiento", "Concurrencia competitiva" if v["concurrencia"] == "Competitiva" else "Por orden de solicitud o concesión directa"),
                ("Beneficiarios", escape(", ".join(v["beneficiarios"]) or "Ver bases")), ("Finalidad", escape(v["finalidad"] or "")),
                ("Fondos europeos", escape(", ".join(v["fondos"])) if v["fondos"] else "No consta"), ("Código BDNS", v["id"] + (f" (y {', '.join(v['otros'])})" if v.get("otros") else ""))]
        x = cache["items"].get(v["id"], {})
        if x.get("sectores"):
            rows.append(("Sectores (CNAE)", escape(", ".join(x["sectores"]))))
        if x.get("reglamento"):
            rows.append(("Régimen de ayudas", escape(x["reglamento"])))
        links = [f'<a class="ay-b p" href="{escape(v["bdns"])}" target="_blank" rel="noopener">Ficha oficial en la BDNS ↗</a>']
        if v["sede"]:
            links.append(f'<a class="ay-b" href="{escape(v["sede"])}" target="_blank" rel="noopener">Sede electrónica ↗</a>')
        if v["bases"]:
            links.append(f'<a class="ay-b" href="{escape(v["bases"])}" target="_blank" rel="noopener">Bases reguladoras ↗</a>')
        for a in x.get("anuncios") or []:
            if a.get("url") and a["url"] != v["bases"]:
                links.append(f'<a class="ay-b" href="{escape(a["url"])}" target="_blank" rel="noopener">{escape((a.get("diario") or "Diario oficial").split(".")[0])} ↗</a>')
                break
        tags = "".join(f'<span class="ay-tag eu">{escape(f)}</span>' for f in v["fondos"]) + "".join(f'<span class="ay-tag">{escape(c)}</span>' for c in v["categorias"] if c != "Otras")
        body = (f'<section class="ay-hero"><div class="wrap"><div class="crumbs"><a href="/es/">Inicio</a> › <a href="/es/ayudas/">Ayudas en España</a> › <a href="{rlink}">{escape(TILE_LABEL.get(v["region"], v["region"]) if v["region"] != STATE else "Estatales")}</a></div>'
                f'<h1 style="font-size:34px">{escape(v["titulo"])}</h1><p class="lead">{escape(v["resumen"] or v["organismo"] + " · " + ("Toda España" if v["region"] == STATE else v["region"]))}</p></div></section>'
                f'<div class="wrap body"><div class="ay-doc"><div>'
                + ('<p class="ay-closed">El plazo de esta convocatoria ha terminado. Mira las <a href="' + rlink + '">ayudas abiertas</a> o pídenos aviso de la próxima.</p>' if closed else "")
                + f'<div class="ay-tags" style="margin-bottom:12px">{tags}</div>{ia_top}<table class="ay-kv"><tbody>{"".join(f"<tr><th scope=row>{k}</th><td>{val}</td></tr>" for k, val in rows)}</tbody></table>'
                + ia_det + f'<h2>Título oficial</h2><p>{escape(unglue(v["original"]))}</p>'
                + (f'<h2>Bases reguladoras</h2><p>{escape(ia.get("titulo_bases") or unglue(x["basesTxt"]))}</p>' if x.get("basesTxt") else "")
                + f'<div class="ay-links" style="margin-top:18px">{"".join(links)}</div>{src_note}{ia_js}</div>'
                f'<aside class="ay-side"><div class="ay-m">{"Plazo" if not closed else "Estado"}</div><div class="big">{escape(fdate(v["fin"]) if v["fin"] else "Ver bases")}</div>'
                f'<div class="ay-m">{escape(plazo)}</div><div class="ay-m">Presupuesto</div><div class="big" style="font-size:22px">{eur(v["presupuesto"])}</div>'
                f'<a class="ay-b p" href="{book}" target="_blank" rel="noopener">¿Te ayudamos a prepararla?</a><a class="ay-b" href="mailto:{email}?subject=BDNS%20{v["id"]}">{email}</a>'
                f'<a class="ay-b" href="{rlink}">Más ayudas en {escape(TILE_LABEL.get(v["region"], v["region"]) if v["region"] != STATE else "toda España")}</a></aside></div></div>')
        desc = (v["resumen"] or v["original"])[:150] + f" Plazo: {plazo.lower()}. Presupuesto: {eur(v['presupuesto'])}."
        doc(v["url"], f"{v['titulo'][:80]} | Ayudas en España · Ullswater", desc, body,
            [bc([("Inicio", "/es/"), ("Ayudas en España", "/es/ayudas/"), (v["region"] if v["region"] != STATE else "Estatales", rlink), (v["titulo"][:80], v["url"])]), grant_ld(v, base)]
            + ([{**ia_ld, "@id": base + v["url"] + "#faq"}] if ia_ld else []))
        if ia.get("faq"):
            (site_dir / v["url"].strip("/") / "ia.json").write_text(json.dumps(ia_public(v, ia, base), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
            n_ia += 1

    (site_dir / "es" / "ayudas" / "ayudas.json").write_text(json.dumps(
        {"updated": updated, "source": "Base de Datos Nacional de Subvenciones (SNPSAP, IGAE - Ministerio de Hacienda)", "license_note": "Datos públicos de la BDNS; consulte el aviso legal de infosubvenciones.es",
         "count": len(open_v), "calls": [{**v, "url": base + v["url"], **({"ia": base + v["url"] + "ia.json"} if ayudas_ia.load(v["id"]) else {})} for v in open_v]}, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"ayudas: {len(paths)} pages ({len(open_v)} open calls, {n_ia} with AI ficha)")
    return paths


JS = r"""const $=id=>document.getElementById(id);const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const slug=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const st={reg:"",size:"",cat:"",q:"",tipo:"",plazo:"",fondo:"",sort:"fin",est:true,shown:24};
const M=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const days=f=>Math.round((Date.parse(f)-Date.parse(TODAY))/864e5);
const fdate=f=>{const[y,m,d]=f.split("-");return +d+" "+M[+m-1]+" "+y};
const eur=n=>!n?"No indicado":n>=1e6?(n/1e6).toLocaleString("es-ES",{maximumFractionDigits:1})+" M€":n>=1e3?Math.round(n/1e3).toLocaleString("es-ES")+" mil €":Math.round(n).toLocaleString("es-ES")+" €";
function ok(x,ign){if(!ign&&st.reg&&x.region!==st.reg&&!(st.est&&x.region==="Toda España"))return false;if(!st.est&&x.region==="Toda España")return false;
if(st.size&&!x.beneficiarios.includes(st.size))return false;if(st.cat&&!x.categorias.includes(st.cat))return false;if(st.tipo&&x.tipo!==st.tipo)return false;
if(st.fondo&&!x.fondos.length)return false;if(st.plazo==="sin"&&x.fin)return false;if(st.plazo&&st.plazo!=="sin"&&(!x.fin||days(x.fin)>+st.plazo))return false;
if(st.q){const h=(x.titulo+" "+x.original+" "+x.organismo+" "+x.categorias.join(" ")).toLowerCase();if(!st.q.toLowerCase().split(/\s+/).every(w=>h.includes(w)))return false}return true}
function card(x){const d=x.fin?days(x.fin):null;const pl=x.fin?`<b class="${d<=15?"ay-urg":""}">${d===0?"Hoy":d===1?"Mañana":"Quedan "+d+" días"}</b>${fdate(x.fin)}`:`<b>Consultar bases</b>${x.plazo_txt?esc(x.plazo_txt.slice(0,48)):"Sin fecha fija"}`;
return `<article class="ay-c"><h3><a href="${x.url}">${esc(x.titulo)}</a></h3><div class="ay-m">${esc(x.organismo)} · ${esc(x.region)}${x.lineas?` · ${x.lineas} líneas`:""}</div>
<div class="ay-tags">${x.fondos.map(f=>`<span class="ay-tag eu">${esc(f)}</span>`).join("")}${x.categorias.filter(c=>c!=="Otras").map(c=>`<span class="ay-tag">${esc(c)}</span>`).join("")}</div>
<div class="ay-fx"><div>${pl}</div><div><b>${eur(x.presupuesto)}</b>Presupuesto</div><div><b>${esc(x.tipo)}</b>${x.concurrencia==="Competitiva"?"Concurrencia competitiva":"Por orden de solicitud"}</div></div>
<div class="ay-links"><a class="ay-b" href="${x.url}">Ver ficha</a><a class="ay-b" href="${esc(x.bdns)}" target="_blank" rel="noopener">Ficha oficial (BDNS) ↗</a></div></article>`}
function render(){const r=DATA.filter(x=>ok(x,false));const s=st.sort;
r.sort((a,b)=>s==="pres"?(b.presupuesto||0)-(a.presupuesto||0):s==="new"?(b.recibida||"").localeCompare(a.recibida||""):(a.fin||"9999").localeCompare(b.fin||"9999"));
$("n").textContent=r.length;$("nl").textContent=r.length===1?"ayuda abierta encaja":"ayudas abiertas encajan";
$("list").innerHTML=r.length?r.slice(0,st.shown).map(card).join(""):`<div class="ay-empty">No hay ayudas abiertas con estos filtros. Prueba a quitar alguno o a incluir las estatales.</div>`;
$("more").style.display=r.length>st.shown?"":"none";$("more").textContent=`Ver más (${r.length-st.shown} restantes)`;
const pool=DATA.filter(x=>ok(x,true));const nat=pool.filter(x=>x.region==="Toda España").length;
for(const a of $("map").querySelectorAll(".ay-t")){const rg=a.dataset.r;const n=pool.filter(x=>x.region===rg).length+(st.est?nat:0);a.querySelector("span").textContent=n;a.classList.toggle("zero",!n);a.classList.toggle("on",st.reg===rg);a.setAttribute("aria-label",rg+": "+n+" ayudas abiertas")}
$("all").classList.toggle("on",!st.reg);const rh=$("rh");
if(st.reg){rh.hidden=false;$("rh-t").textContent="Ayudas para empresas en "+st.reg;const a=AG[st.reg]||[];
$("rh-p").innerHTML=(a.length?"Agencias de referencia: "+a.map(g=>`<a href="${esc(g[1])}" target="_blank" rel="noopener">${esc(g[0])}</a>`).join(" · ")+". ":"")+`<a href="/es/ayudas/${slug(st.reg)}/">Página de ${esc(TL[st.reg]||st.reg)}</a>. `+(st.est?"Incluye las ayudas estatales.":"Solo ayudas autonómicas.");
$("rt").textContent="Ayudas abiertas en "+st.reg}else{rh.hidden=true;$("rt").textContent="Ayudas abiertas en España"}
$("q-reg").value=st.reg;$("q-size").value=st.size;$("q-cat").value=st.cat}
function setReg(r){st.reg=r;st.shown=24;const h=r?"#"+slug(r):"";try{history.replaceState(null,"",location.pathname+location.search+h)}catch(e){}render()}
$("map").addEventListener("click",e=>{const a=e.target.closest(".ay-t");if(!a)return;e.preventDefault();setReg(st.reg===a.dataset.r?"":a.dataset.r)});
$("all").addEventListener("click",e=>{e.preventDefault();setReg("")});$("q-reg").addEventListener("change",e=>setReg(e.target.value));
const bind=(id,k,ev="change")=>$(id).addEventListener(ev,e=>{st[k]=e.target.type==="checkbox"?e.target.checked:e.target.value;st.shown=24;render()});
bind("q-size","size");bind("q-cat","cat");bind("f-q","q","input");bind("f-tipo","tipo");bind("f-plazo","plazo");bind("f-fondo","fondo");bind("f-sort","sort");bind("f-est","est");
$("more").addEventListener("click",()=>{st.shown+=24;render()});
$("reset").addEventListener("click",()=>{Object.assign(st,{reg:"",size:"",cat:"",q:"",tipo:"",plazo:"",fondo:"",sort:"fin",est:true,shown:24});["f-q","f-tipo","f-plazo","f-fondo"].forEach(i=>$(i).value="");$("f-sort").value="fin";$("f-est").checked=true;setReg("")});
const fromHash=()=>{const h=location.hash.slice(1);const t=TILES.find(t=>slug(t[0])===h);st.reg=t?t[0]:"";render()};window.addEventListener("hashchange",fromHash);fromHash();"""
