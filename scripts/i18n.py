"""Spanish version of www.ullswaterinvestments.com (/es/...).

Every English page is rendered first; this module turns it into its Spanish twin:
- the HTML is split into translatable segments (a block's text with its inline markup, plus alt/aria-label/title/meta texts);
- each segment is looked up in content/i18n_es.json (numbers are masked, so "Explore 449 EU calls" and
  "Explore 451 EU calls" share one entry);
- internal links point to the /es/ twin, <html lang>, canonical, og:locale and the language switcher are adjusted.

Segments with no translation stay in English and are reported, so the build can translate them
(translate_missing, with the Anthropic API when ANTHROPIC_API_KEY is set) and store them in the dictionary."""
import json
import os
import re
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag, Comment

ROOT = Path(__file__).resolve().parent.parent
DICT = ROOT / "content" / "i18n_es.json"
INLINE = {"a", "b", "strong", "em", "i", "small", "span", "br", "code", "sup", "sub", "abbr", "time"}
SKIP = {"script", "style", "noscript", "svg", "code", "pre"}
ATTRS = ("alt", "aria-label", "title", "placeholder")
NUM = re.compile(r"\d+(?:[.,:]\d+)*")
NOT_LINKED = ("/assets/", "/data/", "/favicon", "/sitemap", "/llms", "/robots", "/es/")


def load():
    return json.loads(DICT.read_text(encoding="utf-8")) if DICT.exists() else {}


def save(d):
    DICT.write_text(json.dumps(dict(sorted(d.items())), ensure_ascii=False, indent=0), encoding="utf-8")


def mask(s):
    nums = []

    def rep(m):
        nums.append(m.group(0))
        return "{%d}" % (len(nums) - 1)
    return NUM.sub(rep, s), nums


def unmask(s, nums):
    for i, n in enumerate(nums):
        s = s.replace("{%d}" % i, n)
    return s


def needs(text):
    """Only text with lower-case words is worth translating (acronyms, ids and numbers stay)."""
    return bool(re.search(r"[a-z]{2,}", text))


class Translator:
    def __init__(self):
        self.d = load()
        self.missing = {}

    def tr(self, s):
        core = s.strip()
        if not core or not needs(re.sub(r"<[^>]+>", "", core)):
            return s
        key, nums = mask(" ".join(core.split()))
        hit = self.d.get(key)
        if hit is None:
            self.missing[key] = True
            return s
        lead, trail = s[:len(s) - len(s.lstrip())], s[len(s.rstrip()):]
        return lead + unmask(hit, nums) + trail


def _inline_only(tag):
    for c in tag.children:
        if isinstance(c, Tag) and (c.name not in INLINE or not _inline_only(c)):
            return False
    return True


def _has_direct_text(tag):
    return any(isinstance(c, NavigableString) and not isinstance(c, Comment) and c.strip() for c in tag.children)


def _segments(node, out):
    for c in list(node.children):
        if not isinstance(c, Tag) or c.name in SKIP:
            continue
        if _has_direct_text(c) and _inline_only(c):
            out.append(c)
        else:
            _segments(c, out)


def to_es(html, path, es_paths, t):
    soup = BeautifulSoup(html, "html.parser")
    soup.html["lang"] = "es"
    head = soup.head
    if soup.title and soup.title.string:
        soup.title.string = t.tr(soup.title.string)
    for m in head.find_all("meta"):
        if m.get("name") == "description" or m.get("property") in ("og:title", "og:description"):
            m["content"] = t.tr(m["content"])
        if m.get("property") == "og:locale":
            m["content"] = "es_ES"
        if m.get("property") == "og:url":
            m["content"] = m["content"].replace("ullswaterinvestments.com/", "ullswaterinvestments.com/es/", 1)
    canon = head.find("link", rel="canonical")
    if canon:
        canon["href"] = canon["href"].replace("ullswaterinvestments.com/", "ullswaterinvestments.com/es/", 1)
    body = soup.body
    segs = []
    _segments(body, segs)
    for s in segs:
        inner = "".join(str(x) for x in s.contents)
        new = t.tr(inner)
        if new != inner:
            s.clear()
            for x in list(BeautifulSoup(new, "html.parser").contents):
                s.append(x)
    for tag in body.find_all(True):
        for a in ATTRS:
            if tag.has_attr(a):
                tag[a] = t.tr(tag[a])
        if tag.name == "a" and tag.has_attr("href") and not tag.has_attr("data-lang"):
            h = tag["href"]
            if h.startswith("/") and not h.startswith(NOT_LINKED):
                p, _, frag = h.partition("#")
                if p in es_paths:
                    tag["href"] = "/es" + p + ("#" + frag if frag else "")
    for a in body.select("a[data-lang]"):
        if a["data-lang"] == "es":
            a["aria-current"] = "true"
        elif a.has_attr("aria-current"):
            del a["aria-current"]
    return "<!doctype html>" + str(soup).replace("<!DOCTYPE html>", "", 1).replace("<!doctype html>", "", 1)


PROMPT = """You translate the English website of Ullswater Investments (EU funding advisors, Madrid and Brussels) into Spanish (Spain).
Return ONLY a JSON object mapping each input key to its Spanish translation.
Rules:
- Keep every HTML tag and attribute exactly as it is; translate only visible text (and keep href/mailto values untouched).
- Keep placeholders such as {0} {1} exactly.
- Keep acronyms, call identifiers, programme codes and proper names (Ullswater Investments, Software in a Box, ITEA, EIC, EIF, EIB, CDTI, ENISA, LIFE, ERC, MSCA).
- Official Spanish names: Horizon Europe -> Horizonte Europa; Digital Europe Programme -> Programa Europa Digital; European Innovation Council -> Consejo Europeo de Innovación (EIC); European Investment Fund -> Fondo Europeo de Inversiones (FEI); European Investment Bank -> Banco Europeo de Inversiones (BEI); European Defence Fund -> Fondo Europeo de Defensa; European Commission -> Comisión Europea; call (for proposals) -> convocatoria; grant -> subvención.
- Professional, concise, natural Spanish for executives; use "usted"-free neutral style (imperatives in tú are fine for buttons: "Reserva una reunión").
"""
# EU terminology glossary (246 terms + style rules), brought over from the Spanish pilot site (ullswater-web-es, Nov 2026).
_G = ROOT / "content" / "glosario-es.json"
if _G.exists():
    _g = json.loads(_G.read_text(encoding="utf-8"))
    PROMPT += ("\nAlways use this official EU terminology (English -> Spanish):\n"
               + "\n".join(f"- {x['en']} -> {x['es']}" for x in _g.get("terminos", []))
               + "\nStyle rules for call titles:\n" + "\n".join(f"- {r}" for r in _g.get("reglas", [])) + "\n")


def translate_missing(t, limit=1500):
    """Translate the segments the dictionary lacks with Claude (needs ANTHROPIC_API_KEY). Returns how many were added."""
    key = os.environ.get("ANTHROPIC_API_KEY")
    todo = [k for k in t.missing if k not in t.d][:limit]
    if not key or not todo:
        return 0
    model = os.environ.get("ANTHROPIC_MODEL") or "claude-sonnet-5-5"
    added = 0
    for i in range(0, len(todo), 60):
        chunk = todo[i:i + 60]
        req = urllib.request.Request("https://api.anthropic.com/v1/messages", method="POST", headers={
            "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
            data=json.dumps({"model": model, "max_tokens": 16000, "system": PROMPT,
                             "messages": [{"role": "user", "content": json.dumps({k: k for k in chunk}, ensure_ascii=False)}]}).encode())
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                txt = "".join(b.get("text", "") for b in json.loads(r.read())["content"])
            out = json.loads(txt[txt.find("{"):txt.rfind("}") + 1])
        except Exception as e:
            print("translation batch failed:", e)
            continue
        for k in chunk:
            v = out.get(k)
            if isinstance(v, str) and v.strip() and sorted(re.findall(r"\{\d+\}", v)) == sorted(re.findall(r"\{\d+\}", k)):
                t.d[k] = v
                added += 1
    if added:
        save(t.d)
    return added
