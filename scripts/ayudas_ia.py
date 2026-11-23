"""Ficha ampliada de cada ayuda (/es/ayudas/convocatoria/<código>/): preguntas frecuentes, preguntas sugeridas para el
Asistente de ayudas y el texto oficial troceado por artículos para que el asistente responda sobre esa ayuda en concreto.

For each grant it:
1. Downloads the official documents listed in the BDNS (Spanish text of the call first; other-language copies only when
   there is no Spanish one) and the regulatory bases when their URL is a PDF or a readable page (BOE, regional gazettes).
2. Asks Claude (forced tool call, so the JSON is always valid) for a structured summary built ONLY from those texts:
   «En breve», eight topics (who can apply, what is funded, eligible costs, amount, how and when, evaluation,
   obligations, compatibility), 6 FAQs with the article they come from, and 6 suggested questions for the chat.
3. Stores everything in content/ayudas_ia/<código>.json (committed by the workflow), so each grant is processed once,
   and again only when the BDNS lists a new or changed document.

Which grants: AYUDAS_IA_IDS (comma list) or content/ayudas_ia/pilot.txt; AYUDAS_IA_ALL=1 processes every open grant,
at most AYUDAS_IA_MAX (default 25) new ones per run. Needs ANTHROPIC_API_KEY; without it, nothing is generated and the
pages use whatever is already cached.

Run alone: python scripts/ayudas_ia.py [code ...]
"""
import io
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import ayudas  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "content" / "ayudas_ia"
DOC_URL = ayudas.API + "/convocatorias/documentos?idDocumento="
MAX_INPUT = 250_000   # characters of official text sent to Claude (~70k tokens)
MAX_STORE = 250_000   # characters of official text kept for the chat assistant
TEMAS = ["Quién puede pedirla", "Qué se financia", "Gastos subvencionables", "Cuantía e intensidad",
         "Cómo y cuándo se solicita", "Cómo se evalúa", "Obligaciones y justificación", "Compatibilidad con otras ayudas"]
VERSION = 3  # bump to regenerate every cached ficha after a prompt change


# ---------------------------------------------------------------- documents
def fetch(url, timeout=60, body=None):
    req = urllib.request.Request(url, data=body, headers=ayudas.UA)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read(), (r.headers.get("Content-Type") or "").lower()
    except urllib.error.URLError as e:
        if "SSL" not in str(e):
            raise
    # some regional gazettes (portaldogc.gencat.cat) still need older TLS settings; the content is public
    import ssl
    ctx = ssl.create_default_context()
    ctx.set_ciphers("DEFAULT@SECLEVEL=1")
    ctx.options |= getattr(ssl, "OP_LEGACY_SERVER_CONNECT", 0x4)
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        return r.read(), (r.headers.get("Content-Type") or "").lower()


def pdf_text(data):
    from pypdf import PdfReader
    r = PdfReader(io.BytesIO(data))
    out = []
    for p in r.pages[:120]:
        try:
            out.append(p.extract_text() or "")
        except Exception:  # noqa: BLE001
            out.append("")
    return clean("\n".join(out))


def html_text(data):
    from bs4 import BeautifulSoup
    s = BeautifulSoup(data, "html.parser")
    for t in s(["script", "style", "nav", "header", "footer", "noscript", "form"]):
        t.decompose()
    main = s.find(id="textoxslt") or s.find("main") or s.find("article") or s.body or s  # BOE: #textoxslt
    return clean(main.get_text("\n"))


def clean(t):
    t = t.replace("\xa0", " ").replace("­", "")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"(\w)-\n(\w)", r"\1\2", t)              # words cut at the end of a line
    t = re.sub(r"\n\s*\d{1,3}\s*/\s*\d{1,3}\s*\n", "\n", t)  # "3/24" page numbers
    t = re.sub(r"\n\s*(?=[A-Z0-9]*\d)(?=[A-Z0-9]*[A-Z])[A-Z0-9]{12,40}\s*(?=\n)", "\n", t)  # signature verification codes (CSV)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


DOGC_API = "https://portaldogc.gencat.cat/eadop-rest/api/dogc/documentDOGC"


def dogc_text(document_id):
    """Spanish text of a DOGC document (dogc.gencat.cat pages are built with JavaScript from this public API)."""
    data, _ = fetch(DOGC_API, body=urllib.parse.urlencode({"documentId": document_id, "language": "es_ES"}).encode())
    d = json.loads(data)
    return html_text(("<h1>" + (d.get("titleDocument") or "") + "</h1>" + (d.get("textDocument") or "")).encode("utf-8"))


def doc_text(url):
    m = re.search(r"dogc\.gencat\.cat/.*[?&]documentId=(\d+)", url)
    if m:
        return dogc_text(m.group(1))
    data, ct = fetch(url)
    if data[:4] == b"%PDF" or "pdf" in ct:
        return pdf_text(data)
    if "html" in ct or data.lstrip()[:1] == b"<":
        return html_text(data)
    return ""


def bases_url(u):
    """URL from which the text of the regulatory bases can be read, or None (pages that need JavaScript)."""
    if not u or not u.startswith("http"):
        return None
    m = re.search(r"boe\.es/.*?(?:id=|/)(BOE-[A-Z]-\d{4}-\d+)", u)
    if m:
        return "https://www.boe.es/diario_boe/txt.php?id=" + m.group(1)
    if re.search(r"\.pdf($|\?)|descargarArchivo|/pdf/|VEROBJ|bon\.navarra\.es/es/anuncio|dogc\.gencat\.cat/.*documentId=\d", u, re.I):
        return u
    return None


def documents(code):
    """Official texts of one grant: [{"nombre", "url", "texto"}], Spanish first."""
    d = ayudas.api("convocatorias", {"vpd": "GE", "numConv": code}, tries=2)
    docs = d.get("documentos") or []
    es = [x for x in docs if re.search(r"castellano|español|bases|extracto", x.get("descripcion") or "", re.I) and not re.search(r"formulario|anexo|modelo", x.get("descripcion") or "", re.I)]
    pick = es or [x for x in docs if not re.search(r"formulario|modelo", x.get("descripcion") or "", re.I)][:1]
    out = []
    for x in pick[:3]:
        try:
            t = doc_text(DOC_URL + str(x["id"]))
        except Exception as e:  # noqa: BLE001
            print("ayudas_ia: document failed", code, x.get("id"), e)
            continue
        if len(t) > 500:
            out.append({"nombre": (x.get("descripcion") or "Convocatoria").strip(), "url": ayudas.BDNS_URL + code, "texto": t, "id": x["id"], "fecha": x.get("datMod")})
        time.sleep(0.3)
    bu = bases_url(d.get("urlBasesReguladoras"))
    if bu and not any("bases" in o["nombre"].lower() for o in out):
        try:
            t = doc_text(bu)
            if len(t) > 2000:
                out.append({"nombre": "Bases reguladoras", "url": d.get("urlBasesReguladoras"), "texto": t})
        except Exception as e:  # noqa: BLE001
            print("ayudas_ia: bases failed", code, bu, e)
    return d, out


def sections(docs):
    """Split the official texts into articles (or ~3,000-character blocks) for the chat assistant."""
    head = re.compile(r"\n(?=(?:Art[íi]culo|Article|Base|Apartado|Disposici[óo]n|Anexo|ANEXO|Cap[íi]tulo|CAP[ÍI]TULO)\s+[\wºª.]{1,6}\b"
                      r"|(?:Primer[oa]|Segund[oa]|Tercer[oa]|Cuart[oa]|Quint[oa]|Sext[oa]|S[ée]ptim[oa]|Octav[oa]|Noven[oa]|D[ée]cim[oa])[\s.\-–]"
                      r"|\d{1,2}\.(?:\d{1,2}\.?)?\s+[A-ZÁÉÍÓÚÑ][^\n.]{3,90}\.?\s*\n)")
    out, total = [], 0
    for d in docs:
        parts = head.split("\n" + d["texto"])
        for p in parts:
            p = p.strip()
            if len(p) < 80:
                continue
            title, n = p.split("\n", 1)[0].strip(" .")[:120], 0
            while p:
                cut = len(p)
                if cut > 3500:
                    cut = p.rfind("\n", 2000, 3500)
                    if cut < 0:
                        cut = p.rfind(". ", 2000, 3500) + 1 or 3500
                chunk, p = p[:cut].strip(), p[cut:].strip()
                out.append({"doc": d["nombre"], "t": title + (" (continuación)" if n else ""), "x": chunk})
                n += 1
                total += len(chunk)
                if total > MAX_STORE:
                    return out
    return out


# ---------------------------------------------------------------- Claude
SYSTEM = f"""Eres analista de ayudas públicas de Ullswater Investments (asesores de financiación, Madrid). Recibes los datos de una
convocatoria de la Base de Datos Nacional de Subvenciones (BDNS) y el texto de sus documentos oficiales. Preparas la información
que verá una empresa en la ficha de esa ayuda y que usará un asistente de IA para responder preguntas sobre ella.

Reglas:
- Usa SOLO lo que dicen los documentos recibidos. No completes con conocimiento general ni con otras convocatorias. Si un dato
  no aparece, no lo pongas (y en las respuestas di que no consta en los documentos publicados).
- Cada punto y cada respuesta lleva la referencia de dónde sale: documento y artículo, base o apartado, por ejemplo
  «Convocatoria, apartado 5» o «Bases reguladoras, base 7». Si las bases no se han recibido y la convocatoria remite a ellas,
  dilo así.
- Cifras, porcentajes, plazos y límites, exactos como en el texto, con su condición (p. ej. «hasta el 45 % para pequeñas empresas»).
- Español de España, claro y directo, para gerentes de pymes. Frases cortas. Sin adornos ni lenguaje de marketing.
- Las preguntas frecuentes son las que haría una empresa que se plantea pedir la ayuda. Respuestas de 1 a 4 frases.
- Las preguntas sugeridas para el chat son concretas de esta ayuda (no genéricas), de 4 a 9 palabras, y su respuesta debe
  estar en los documentos.
- Temas de la ficha, en este orden y solo los que tengan contenido: {", ".join(TEMAS)}.

""" + """Devuelve SOLO un objeto JSON válido, sin texto antes ni después y sin bloque de código, con esta forma:
{"titulo_bases": "título de las bases reguladoras corregido (espacios, mayúsculas), sin cambiar su contenido; vacío si no consta",
 "en_breve": "2 o 3 frases: qué financia, para quién y lo esencial de la cuantía y el plazo",
 "ficha": [{"tema": "<uno de los temas>", "puntos": [{"t": "una idea, máximo 2 frases", "ref": "documento y artículo/base/apartado"}]}],
 "faq": [{"q": "pregunta", "a": "respuesta de 1 a 4 frases", "ref": "documento y artículo"}],   (de 4 a 6)
 "sugeridas": ["pregunta corta para el chat"],   (de 4 a 6)
 "avisos": ["limitaciones: documentos que faltan, texto ilegible, remisiones a textos no recibidos"]}
Como máximo 5 puntos por tema. Dentro de los textos no uses comillas rectas ("): usa comillas angulares (« »)."""

TOOL = {
    "name": "ficha_ayuda",
    "description": "Ficha ampliada de la ayuda, basada solo en los documentos oficiales recibidos.",
    "input_schema": {
        "type": "object",
        "properties": {
            "titulo_bases": {"type": "string", "description": "Título de las bases reguladoras corregido (espacios, mayúsculas), sin cambiar su contenido. Vacío si no consta."},
            "en_breve": {"type": "string", "description": "2 o 3 frases: qué financia, para quién y lo esencial de la cuantía y el plazo."},
            "ficha": {"type": "array", "items": {"type": "object", "properties": {
                "tema": {"type": "string", "enum": TEMAS},
                "puntos": {"type": "array", "items": {"type": "object", "properties": {
                    "t": {"type": "string", "description": "Una idea por punto, máximo 2 frases."},
                    "ref": {"type": "string", "description": "Documento y artículo/base/apartado."}}, "required": ["t", "ref"]}}},
                "required": ["tema", "puntos"]}},
            "faq": {"type": "array", "description": "4 a 6 preguntas.", "items": {"type": "object", "properties": {
                "q": {"type": "string"}, "a": {"type": "string"}, "ref": {"type": "string"}}, "required": ["q", "a", "ref"]}},
            "sugeridas": {"type": "array", "description": "4 a 6 preguntas.", "items": {"type": "string"}},
            "avisos": {"type": "array", "items": {"type": "string"}, "description": "Limitaciones: documentos que faltan, texto ilegible, remisiones a otros textos no recibidos."},
        },
        "required": ["en_breve", "ficha", "faq", "sugeridas"],
    },
}


def ask_claude(x, docs, key, model):
    meta = {"codigo_bdns": x["id"], "titulo_oficial": x["descripcion"], "organo": " / ".join(filter(None, [x.get("n2"), x.get("n3")])),
            "plazo": {"inicio": x.get("inicio"), "fin": x.get("fin"), "texto": x.get("textFin")}, "presupuesto_total": x.get("presupuesto"),
            "beneficiarios": x.get("beneficiarios"), "finalidad": x.get("finalidad"), "instrumentos": x.get("instrumentos"),
            "fondos": x.get("fondos"), "bases_reguladoras": x.get("basesTxt")}
    budget, parts = MAX_INPUT, []
    for d in docs:
        t = d["texto"][:max(0, budget)]
        budget -= len(t)
        cut = ' truncado="si"' if len(t) < len(d["texto"]) else ""
        parts.append(f'<documento nombre="{d["nombre"]}"{cut}>\n{t}\n</documento>')
    user = "Datos de la BDNS:\n" + json.dumps(meta, ensure_ascii=False, indent=1) + "\n\n" + "\n\n".join(parts)
    body = {"model": model, "max_tokens": 24000, "system": SYSTEM, "messages": [{"role": "user", "content": user}]}
    req = urllib.request.Request("https://api.anthropic.com/v1/messages", method="POST", data=json.dumps(body).encode(),
                                 headers={"x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"})
    for i in range(3):
        try:
            with urllib.request.urlopen(req, timeout=600) as r:
                res = json.loads(r.read())
            txt = "".join(b.get("text", "") for b in res.get("content", []))
            raw = txt[txt.find("{"):txt.rfind("}") + 1]
            try:
                o = json.loads(raw)
            except ValueError:  # stray straight quotes inside a text: repair instead of paying for another answer
                from json_repair import repair_json
                o = json.loads(repair_json(raw))
            if valid(o):
                return o, res.get("usage", {})
            raise ValueError(f"wrong shape (stop_reason {res.get('stop_reason')})")
        except urllib.error.HTTPError as e:
            print(f"ayudas_ia: Claude failed for {x['id']} (try {i + 1}): HTTP {e.code}", e.read()[:600].decode("utf-8", "replace"))
            if e.code in (400, 401, 403, 404):
                break
            time.sleep(15 * (i + 1))
        except Exception as e:  # noqa: BLE001
            print(f"ayudas_ia: Claude failed for {x['id']} (try {i + 1}):", e)
            time.sleep(10 * (i + 1))
    return None, {}


def valid(o):
    try:
        ok = (isinstance(o.get("en_breve"), str) and o["en_breve"].strip()
              and all(isinstance(t, dict) and isinstance(t.get("puntos"), list) and all(isinstance(p, dict) and p.get("t") for p in t["puntos"]) for t in o.get("ficha") or [])
              and len(o.get("faq") or []) >= 3 and all(isinstance(f, dict) and f.get("q") and f.get("a") for f in o["faq"])
              and len(o.get("sugeridas") or []) >= 3 and all(isinstance(q, str) for q in o["sugeridas"]))
    except (AttributeError, TypeError):
        ok = False
    if not ok:
        print("ayudas_ia: answer with the wrong shape:", json.dumps(o, ensure_ascii=False)[:300] if o else None)
    return bool(ok)


# ---------------------------------------------------------------- run
def load(code):
    f = DIR / f"{code}.json"
    if f.exists():
        try:
            return json.loads(f.read_text(encoding="utf-8"))
        except ValueError:
            return None
    return None


def wanted(cache, today):
    ids = [s.strip() for s in os.environ.get("AYUDAS_IA_IDS", "").split(",") if s.strip()]
    pilot = DIR / "pilot.txt"
    if not ids and pilot.exists():
        ids = [s.split("#")[0].strip() for s in pilot.read_text(encoding="utf-8").splitlines() if s.split("#")[0].strip()]
    if os.environ.get("AYUDAS_IA_ALL") == "1":
        rest = [c for c, x in cache["items"].items() if (x.get("fin") or "9999") >= today and c not in ids]
        rest.sort(key=lambda c: cache["items"][c].get("fin") or "9999")
        ids += rest
    return [c for c in ids if c in cache["items"]]


def update(cache=None, codes=None, today=None):
    """Generate the missing or outdated fichas. Never raises. Returns the number generated."""
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        print("ayudas_ia: no ANTHROPIC_API_KEY, using cached fichas only")
        return 0
    model = os.environ.get("ANTHROPIC_MODEL") or "claude-sonnet-5-5"
    today = (today or date.today()).isoformat()
    cache = cache or ayudas.load_cache()
    codes = codes or wanted(cache, today)
    limit = int(os.environ.get("AYUDAS_IA_MAX", "25"))
    DIR.mkdir(parents=True, exist_ok=True)
    done = 0
    for code in codes:
        if done >= limit:
            break
        x = cache["items"].get(code)
        if not x:
            continue
        old = load(code)
        try:
            d, docs = documents(code)
        except Exception as e:  # noqa: BLE001
            print("ayudas_ia: BDNS detail failed", code, e)
            continue
        stamp = sorted(f'{doc.get("id", doc["url"])}:{doc.get("fecha", "")}' for doc in docs)
        if old and old.get("version") == VERSION and old.get("stamp") == stamp:
            continue
        if not docs:
            print("ayudas_ia: no readable documents for", code)
            continue
        out, usage = ask_claude(x, docs, key, model)
        if not out:
            continue
        rec = {"id": code, "version": VERSION, "generado": today, "modelo": model, "stamp": stamp,
               "fuentes": [{"nombre": doc["nombre"], "url": doc["url"], "caracteres": len(doc["texto"])} for doc in docs],
               **out, "secciones": sections(docs)}
        (DIR / f"{code}.json").write_text(json.dumps(rec, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        done += 1
        print(f"ayudas_ia: {code} ok ({sum(len(doc['texto']) for doc in docs)} chars, tokens {usage.get('input_tokens')}/{usage.get('output_tokens')})")
    print(f"ayudas_ia: {done} fichas generated")
    return done


if __name__ == "__main__":
    update(codes=sys.argv[1:] or None)
