# www.ullswaterinvestments.com

Static site of Ullswater Investments · EU Funding Advisors, migrated from Google Sites (November 2026).

- `scripts/content.py` – all editorial texts (edit here).
- `scripts/build.py` – generator. Pulls live data at build time from calls.ullswaterinvestments.com
  (calls, themes), news.ullswaterinvestments.com (RSS) and events.ullswaterinvestments.com (events.json);
  falls back to `content/live_cache.json`.
- `content/news_archive.json` – October and November 2025 briefings migrated from Google Sites.
- `redirects.csv` – old Google Sites URLs → new destinations (301), for Cloudflare Bulk Redirects.
  The site also contains redirect stubs at each old path as a fallback.
- GitHub Actions rebuilds on every push and daily at 06:40 UTC.
- The `STAGING` file builds the noindex review copy for new.ullswaterinvestments.com. Delete it when www goes live.

Local build: `python3 scripts/build.py` → `site/`.
