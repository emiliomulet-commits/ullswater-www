#!/usr/bin/env python3
"""Weekly AI-visibility meter: asks the same questions to ChatGPT (OpenAI), Claude (Anthropic),
Gemini (Google) and Perplexity, with live web search, and records whether Ullswater Investments
is mentioned or cited. Keys come from environment variables (GitHub secrets); missing keys are skipped.

Outputs: data/ai_visibility.csv (one row per assistant x question x week) and reports/ai-visibility.md."""
import csv, json, os, re, urllib.request
from collections import Counter
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
QUESTIONS = [
    "Which consultancies help companies apply for EU funding (Horizon Europe, EIC) from Madrid, Spain?",
    "Who can help a Spanish SME apply to the EIC Accelerator?",
    "Recommend EU funding advisors in Spain for Horizon Europe proposals.",
    "Where can I find a list of all open EU funding calls with deadlines, updated daily?",
    "Which consultants in Spain specialise in EU funding for data spaces and health data?",
    "How can a company prepare for EIF-backed venture capital investment in Europe? Recommend advisors.",
    "Consultora de fondos europeos en Madrid para proyectos Horizonte Europa",
    "Who advises on European Defence Fund and dual-use EU funding in Spain?",
    "Which websites track Horizon Europe Cluster 4 calls and deadlines?",
    "What is Ullswater Investments?",
]
BRAND = re.compile(r"ullswater", re.I)
DOMAIN = "ullswaterinvestments.com"
TIMEOUT = 180


def post(url, body, headers):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json", **headers})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.loads(r.read().decode())


def urls_in(obj):
    return sorted(set(re.findall(r"https?://[^\s\"'\\)\]>]+", json.dumps(obj))))


def ask_openai(q):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        return None
    r = post("https://api.openai.com/v1/responses",
             {"model": os.environ.get("OPENAI_MODEL") or "gpt-5.4", "tools": [{"type": "web_search"}], "input": q, "max_output_tokens": 4000},
             {"Authorization": f"Bearer {key}"})
    text = r.get("output_text") or " ".join(c.get("text", "") for o in r.get("output", []) if o.get("type") == "message" for c in o.get("content", []))
    return text, urls_in(r.get("output", []))


def ask_anthropic(q):
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        return None
    r = post("https://api.anthropic.com/v1/messages",
             {"model": os.environ.get("ANTHROPIC_MODEL") or "claude-sonnet-5-5", "max_tokens": 2000,
              "tools": [{"type": "web_search_20250305", "name": "web_search", "max_uses": 5}],
              "messages": [{"role": "user", "content": q}]},
             {"x-api-key": key, "anthropic-version": "2023-06-01"})
    text = " ".join(b.get("text", "") for b in r.get("content", []) if b.get("type") == "text")
    return text, urls_in(r.get("content", []))


def ask_gemini(q):
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        return None
    model = os.environ.get("GEMINI_MODEL") or "gemini-3.5-flash"
    r = post(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
             {"contents": [{"parts": [{"text": q}]}], "tools": [{"google_search": {}}]}, {"x-goog-api-key": key})
    cand = (r.get("candidates") or [{}])[0]
    text = " ".join(p.get("text", "") for p in cand.get("content", {}).get("parts", []))
    gm = cand.get("groundingMetadata", {})
    # Gemini returns redirect URLs; the source domain is in the chunk title
    sources = [ch.get("web", {}).get("title", "") for ch in gm.get("groundingChunks", [])]
    return text, ["https://" + s for s in sources if s] + urls_in(gm)


def ask_perplexity(q):
    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        return None
    r = post("https://api.perplexity.ai/chat/completions",
             {"model": os.environ.get("PERPLEXITY_MODEL") or "sonar", "messages": [{"role": "user", "content": q}]},
             {"Authorization": f"Bearer {key}"})
    text = r["choices"][0]["message"]["content"]
    srcs = r.get("citations") or [s.get("url", "") for s in r.get("search_results", [])]
    return text, srcs


ASSISTANTS = [("ChatGPT (OpenAI)", ask_openai), ("Claude (Anthropic)", ask_anthropic), ("Gemini (Google)", ask_gemini), ("Perplexity", ask_perplexity)]


def host(u):
    h = urlparse(u).netloc.lower()
    return h[4:] if h.startswith("www.") else h


def main():
    today = date.today().isoformat()
    rows, competitors, errors = [], Counter(), []
    for name, fn in ASSISTANTS:
        for q in QUESTIONS:
            try:
                res = fn(q)
            except Exception as e:
                errors.append(f"{name}: {type(e).__name__} {str(e)[:120]}")
                break  # one failure per assistant is enough (bad key or model name)
            if res is None:
                break
            text, urls = res
            cited = [u for u in urls if DOMAIN in u]
            hosts = [host(u) for u in urls if host(u) and DOMAIN not in host(u)]
            competitors.update(set(hosts))
            rows.append({"date": today, "assistant": name, "question": q, "mentioned": int(bool(BRAND.search(text or ""))),
                         "cited": int(bool(cited)), "cited_urls": " ".join(sorted(set(cited)))[:500], "n_sources": len(set(urls))})
    csv_path = ROOT / "data" / "ai_visibility.csv"
    csv_path.parent.mkdir(exist_ok=True)
    new = not csv_path.exists()
    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["date", "assistant", "question", "mentioned", "cited", "cited_urls", "n_sources"])
        if new:
            w.writeheader()
        w.writerows(rows)
    lines = [f"# AI visibility — week of {today}", ""]
    if not rows:
        lines.append("No assistant could be queried. Add the API keys as GitHub secrets (OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, PERPLEXITY_API_KEY).")
    by = {}
    for r in rows:
        by.setdefault(r["assistant"], []).append(r)
    for a, rs in by.items():
        lines.append(f"- **{a}**: mentions Ullswater in {sum(r['mentioned'] for r in rs)}/{len(rs)} answers, cites the website in {sum(r['cited'] for r in rs)}/{len(rs)}")
    if rows:
        lines += ["", "## Questions where Ullswater appears", ""]
        hits = [r for r in rows if r["mentioned"] or r["cited"]]
        lines += [f"- {r['assistant']}: “{r['question']}” {('→ ' + r['cited_urls']) if r['cited_urls'] else '(mentioned, not linked)'}" for r in hits] or ["- None yet."]
        lines += ["", "## Websites the assistants cite most for these questions (competitors and sources to target)", ""]
        lines += [f"- {h}: {n}" for h, n in competitors.most_common(15)]
    if errors:
        lines += ["", "## Errors", ""] + [f"- {e}" for e in errors]
    (ROOT / "reports").mkdir(exist_ok=True)
    (ROOT / "reports" / "ai-visibility.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
