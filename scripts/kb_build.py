#!/usr/bin/env python3
"""Knowledge base of the Ullswater network for the "Asistente de ayudas" chat (Worker ullswater-ai, tools search_site and get_page).

Sources (all public):
  - www:     site/llms-full.txt of this build (services, courses, about, projects, guides)
  - news:    https://news.ullswaterinvestments.com/llms-full.txt
  - events:  https://events.ullswaterinvestments.com/llms-full.txt and /webinars/ (library)
  - project landings: the public home page of each live landing in content.PROJECTS (never /confidential/)
EU calls are not included: the Worker reads them from calls.ullswaterinvestments.com with its own tools.

Writes:
  site/data/kb.json     {"updated", "model", "dim", "docs": [{u, t, s, d}], "chunks": [[doc index, text]]}
  site/data/kb-vec.bin  int8 vectors (L2-normalised x127), one row of DIM bytes per chunk, BAAI/bge-small-en-v1.5
Embeddings are skipped (kb.json only, keyword search in the Worker) when sentence-transformers is not installed.
Unchanged chunks reuse .cache/kb/vectors.npz (keyed by text hash).
"""
import hashlib
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
sys.path.insert(0, str(ROOT / "scripts"))
import content as C  # noqa: E402

MODEL = "BAAI/bge-small-en-v1.5"
DIM = 384
CHUNK, OVERLAP = 900, 150
CACHE = ROOT / ".cache" / "kb" / "vectors.npz"
UA = {"User-Agent": "ullswater-kb/1.0 (+https://www.ullswaterinvestments.com)"}


def get(url, timeout=40):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:  # a missing source must not break the www build
        print(f"kb: could not fetch {url}: {e}")
        return ""


def parse_llms(text, site):
    """Split an llms-full.txt into pages: a '#'/'##' heading followed by a 'URL:' line starts a page."""
    docs, cur = [], None
    lines = text.splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"^#{1,2}\s+(.+?)\s*$", line)
        nxt = next((x for x in lines[i + 1:i + 3] if x.strip()), "")
        if m and nxt.startswith("URL: "):
            cur = {"t": m.group(1).split(" | ")[0].strip(), "u": nxt[5:].strip(), "s": site, "d": "", "x": []}
            docs.append(cur)
            continue
        if cur is None or line.startswith("URL: ") or line.strip() == "---":
            continue
        dm = re.match(r"^Date:\s*(\d{4}-\d{2}-\d{2})", line) or re.match(r"^- When:\s*(.+)$", line)
        if dm and not cur["d"]:
            cur["d"] = dm.group(1)[:40]
        cur["x"].append(line)
    out = []
    for d in docs:
        d["x"] = re.sub(r"\n{3,}", "\n\n", "\n".join(d["x"])).strip()
        if len(d["x"]) > 80 and "/confidential" not in d["u"]:
            out.append(d)
    return out


def html_text(html):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "style", "noscript", "svg", "nav", "footer"]):
        t.decompose()
    title = (soup.title.string or "").strip() if soup.title else ""
    main = soup.find("main") or soup.body or soup
    text = "\n".join(x.strip() for x in main.get_text("\n").splitlines() if x.strip())
    return title, text


def chunks(text):
    """Paragraph-aware chunks of about CHUNK characters with some overlap."""
    paras = [p.strip() for p in re.split(r"\n(?=#|\- |\S)", text) if p.strip()]
    out, buf = [], ""
    for p in paras:
        if buf and len(buf) + len(p) + 1 > CHUNK:
            out.append(buf)
            buf = buf[-OVERLAP:].split(" ", 1)[-1] + "\n" + p
        else:
            buf = (buf + "\n" + p) if buf else p
        while len(buf) > CHUNK * 1.6:  # very long paragraph
            cut = buf.rfind(". ", 0, CHUNK) + 1 or CHUNK
            out.append(buf[:cut])
            buf = buf[max(0, cut - OVERLAP):]
    if buf.strip():
        out.append(buf)
    return [re.sub(r"[ \t]+", " ", c).strip() for c in out if len(c.strip()) > 40]


PAGES_CACHE = ROOT / ".cache" / "kb" / "pages.json"
ARTICLE = re.compile(r"^https://news\.ullswaterinvestments\.com/\d{4}/\d{2}/[^/]+/$")


def news_archive(have):
    """Every English news article in the news sitemap that is not already in llms-full.txt (that file only carries the
    latest 50), so the chat can still find older articles. Page texts are cached by URL + lastmod: only new or edited
    articles are downloaded on each build."""
    sm = get(C.NEWS + "/sitemap.xml")
    urls = re.findall(r"<url><loc>([^<]+)</loc>(?:<lastmod>([^<]*)</lastmod>)?", sm)
    cache = json.loads(PAGES_CACHE.read_text(encoding="utf-8")) if PAGES_CACHE.exists() else {}
    out, fresh, fetched = [], {}, 0
    for u, lm in urls:
        if not ARTICLE.match(u) or u in have:
            continue
        c = cache.get(u)
        if not c or c.get("lm") != lm:
            h = get(u)
            if not h:
                continue
            t, x = html_text(h)
            m = re.search(r'article:published_time" content="(\d{4}-\d{2}-\d{2})', h)
            c = {"lm": lm, "t": re.sub(r"\s*[|·]\s*EU Funding News.*$", "", t).strip(), "d": m.group(1) if m else "", "x": x}
            fetched += 1
        fresh[u] = c
        if len(c["x"]) > 80:
            out.append({"t": c["t"], "u": u, "s": "news", "d": c["d"], "x": c["x"]})
    PAGES_CACHE.parent.mkdir(parents=True, exist_ok=True)
    PAGES_CACHE.write_text(json.dumps(fresh, ensure_ascii=False), encoding="utf-8")
    print(f"kb: {len(out)} older news articles added from the sitemap ({fetched} downloaded)")
    return out


def local_page(path, title):
    """A page of this build that llms-full.txt leaves out (privacy, legal notice)."""
    f = SITE / path.strip("/") / "index.html"
    if not f.exists():
        return None
    _, x = html_text(f.read_text(encoding="utf-8"))
    return {"t": title, "u": "https://www.ullswaterinvestments.com" + path, "s": "www", "d": "", "x": x}


def main():
    docs = []
    www = (SITE / "llms-full.txt").read_text(encoding="utf-8") if (SITE / "llms-full.txt").exists() else get(C.__dict__.get("BASE", "https://www.ullswaterinvestments.com") + "/llms-full.txt")
    docs += parse_llms(www, "www")
    for p, t in (("/privacy/", "Privacy policy of Ullswater Investments (website, chat assistant, alerts, forms)"),
                 ("/legal/", "Legal notice of Ullswater Investments S.L.")):
        d = local_page(p, t)
        if d:
            docs.append(d)
    docs += parse_llms(get(C.NEWS + "/llms-full.txt"), "news")
    docs += news_archive({d["u"] for d in docs})
    docs += parse_llms(get(C.EVENTS + "/llms-full.txt"), "events")
    wb = get(C.EVENTS + "/webinars/")
    if wb:
        t, x = html_text(wb)
        docs.append({"t": t or "EU funding webinars library", "u": C.EVENTS + "/webinars/", "s": "events", "d": "", "x": x})
    for p in C.PROJECTS:
        if not p.get("live"):
            continue
        url = p.get("url") or f"https://{p['slug']}.ullswaterinvestments.com/"
        h = get(url)
        if h:
            t, x = html_text(h)
            docs.append({"t": f"{p['acronym']}: {p['title']}", "u": url, "s": "project", "d": "", "x": x})
    # Curated description of the compliance benchmark (its own site is invitation-only, so it cannot be crawled).
    docs.insert(0, {"t": "Regulatory Compliance Solutions Benchmark · Spain 2027 (Ullswater Investments)", "u": C.BENCHMARK_URL,
                    "s": "www", "d": "", "x": C.BENCHMARK_KB})
    seen, uniq = set(), []
    for d in docs:  # the same URL can appear twice (e.g. www home); keep the first
        if d["u"] not in seen:
            seen.add(d["u"]); uniq.append(d)
    docs = uniq

    rows, texts = [], []
    for i, d in enumerate(docs):
        for c in chunks(d["x"]):
            rows.append([i, c])
            texts.append(f"{d['t']}. {c}")
    kb = {"updated": datetime.now(timezone.utc).isoformat(timespec="seconds"), "model": MODEL, "dim": DIM,
          "docs": [{"u": d["u"], "t": d["t"], "s": d["s"], "d": d["d"]} for d in docs], "chunks": rows}
    (SITE / "data").mkdir(parents=True, exist_ok=True)
    (SITE / "data" / "kb.json").write_text(json.dumps(kb, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    try:
        import numpy as np
        from sentence_transformers import SentenceTransformer  # noqa: F401
    except ImportError:
        print(f"kb: {len(docs)} pages, {len(rows)} chunks (no embeddings: sentence-transformers not installed)")
        return
    keys = [hashlib.sha1(t.encode("utf-8")).hexdigest()[:16] for t in texts]
    cache = {}
    if CACHE.exists():
        z = np.load(CACHE)
        cache = dict(zip(z["keys"].tolist(), z["vecs"]))
    todo = [j for j, k in enumerate(keys) if k not in cache]
    if todo:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer(MODEL, device="cpu")
        vecs = model.encode([texts[j] for j in todo], batch_size=64, normalize_embeddings=True, show_progress_bar=False)
        for j, v in zip(todo, np.clip(np.round(vecs * 127), -127, 127).astype(np.int8)):
            cache[keys[j]] = v
    mat = np.stack([cache[k] for k in keys]).astype(np.int8) if keys else np.zeros((0, DIM), np.int8)
    (SITE / "data" / "kb-vec.bin").write_bytes(mat.tobytes())
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    np.savez_compressed(CACHE, keys=np.array(keys), vecs=mat)
    print(f"kb: {len(docs)} pages, {len(rows)} chunks, {len(todo)} newly embedded, kb-vec.bin {mat.nbytes // 1024} KB")


if __name__ == "__main__":
    main()
