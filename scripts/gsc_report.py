#!/usr/bin/env python3
"""Weekly Google Search Console report for sc-domain:ullswaterinvestments.com (read-only).
Needs the GitHub secret GSC_SERVICE_ACCOUNT_JSON: the JSON key of a Google Cloud service account
that has been added as a (restricted) user of the Search Console property.
Writes reports/search-console.md."""
import json, os, sys, urllib.parse, urllib.request
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "sc-domain:ullswaterinvestments.com"
OUT = ROOT / "reports" / "search-console.md"


def token(sa):
    from google.oauth2 import service_account
    from google.auth.transport.requests import Request
    creds = service_account.Credentials.from_service_account_info(sa, scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
    creds.refresh(Request())
    return creds.token


def api(tok, path, body=None):
    url = "https://www.googleapis.com/webmasters/v3/sites/" + urllib.parse.quote(SITE, safe="") + path
    req = urllib.request.Request(url, data=json.dumps(body).encode() if body else None,
                                 headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())


def query(tok, start, end, dims, limit=15):
    return api(tok, "/searchAnalytics/query", {"startDate": start, "endDate": end, "dimensions": dims, "rowLimit": limit}).get("rows", [])


def main():
    OUT.parent.mkdir(exist_ok=True)
    raw = os.environ.get("GSC_SERVICE_ACCOUNT_JSON")
    if not raw:
        OUT.write_text("# Search Console\n\nNot configured yet: add the GitHub secret GSC_SERVICE_ACCOUNT_JSON (see README).\n", encoding="utf-8")
        print("GSC not configured; skipping")
        return
    tok = token(json.loads(raw))
    end = date.today() - timedelta(days=3)  # Search Console data lags ~2-3 days
    start, pstart, pend = end - timedelta(days=6), end - timedelta(days=13), end - timedelta(days=7)

    def totals(s, e):
        rows = query(tok, s.isoformat(), e.isoformat(), [], 1)
        r = rows[0] if rows else {}
        return int(r.get("clicks", 0)), int(r.get("impressions", 0)), r.get("position", 0)
    c, i, p = totals(start, end)
    pc, pi, _ = totals(pstart, pend)
    lines = [f"# Search Console — {start:%d %b} to {end:%d %b %Y}", "",
             f"- Clicks: **{c}** (previous week {pc}) · Impressions: **{i}** (previous week {pi}) · Average position: {p:.1f}" if i else
             f"- Clicks: {c} · Impressions: {i} (previous week {pi}). Little or no data yet: normal in the first weeks after the migration.", ""]
    lines += ["## Top queries", ""] + [f"- {r['keys'][0]} — {int(r['clicks'])} clicks, {int(r['impressions'])} impressions, position {r['position']:.1f}"
                                       for r in query(tok, start.isoformat(), end.isoformat(), ["query"])] or ["- No queries yet."]
    lines += ["", "## Top pages", ""] + [f"- {r['keys'][0]} — {int(r['clicks'])} clicks, {int(r['impressions'])} impressions"
                                         for r in query(tok, start.isoformat(), end.isoformat(), ["page"])] or ["- No pages yet."]
    try:
        sm = api(tok, "/sitemaps").get("sitemap", [])
        lines += ["", "## Sitemaps", ""] + [f"- {s['path']}: {'errors ' + str(s.get('errors')) if int(s.get('errors', 0)) else 'OK'}, last read {s.get('lastDownloaded', '—')[:10]}, "
                                            f"{sum(int(x.get('submitted', 0)) for x in s.get('contents', []))} URLs submitted" for s in sm]
    except Exception as e:
        lines += ["", f"Sitemaps: could not read ({e})"]
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        OUT.write_text(f"# Search Console\n\nError reading Search Console: {e}\n", encoding="utf-8")
        print("GSC error:", e)
        sys.exit(0)
