# www.ullswaterinvestments.com

Static site of Ullswater Investments · EU Funding Advisors, migrated from Google Sites (November 2026). Review copy: https://new.ullswaterinvestments.com.

- `scripts/content.py` – all editorial texts (edit here).
- `scripts/build.py` – generator. Pulls live data at build time from calls.ullswaterinvestments.com
  (calls, themes), news.ullswaterinvestments.com (RSS) and events.ullswaterinvestments.com (events.json);
  falls back to `content/live_cache.json`.
- `content/news_archive.json` – October and November 2025 briefings migrated from Google Sites.
- `redirects.csv` – old Google Sites URLs → new destinations (301), for Cloudflare Bulk Redirects.
  The site also contains redirect stubs at each old path as a fallback.
- GitHub Actions rebuilds on every push and daily at 06:40 UTC.
- Live on www.ullswaterinvestments.com since 7 Nov 2026. Re-create an empty `STAGING` file to build a noindex review copy.

Local build: `pip install beautifulsoup4 && python3 scripts/build.py` → `site/`.

## Spanish version (/es/)
- Every page is generated in English and then translated into its Spanish twin under `/es/` by `scripts/i18n.py`
  (EN | ES switcher in the header, hreflang tags, both languages in the sitemap).
- EU terminology glossary for new translations: `content/glosario-es.json` (246 terms and style rules, from the former Spanish pilot `ullswater-web-es`, archived Nov 2026). Its 222 translated call titles were merged into the dictionary.
- Translations live in `content/i18n_es.json` (English segment → Spanish). Numbers are masked as `{0}`, `{1}`… so changing figures do not need new entries.
  To change a Spanish text, edit its entry there.
- New texts (new calls, news, events, or edited English copy) are translated automatically during the build with Claude
  when the `ANTHROPIC_API_KEY` secret is set, and saved back to the dictionary. Without the key they stay in English;
  the list is written to `content/i18n_es_missing.json` (not committed).

## Default language (all Ullswater sites)
- `scripts/ulang.js` is inlined in the `<head>` of every page of www, news, events and the project landings (same file, copied there).
- Order: `?lang=en|es` → the visitor's own EN/ES click (cookie `ulang` on `.ullswaterinvestments.com`, shared by all subdomains, 1 year)
  → country from Cloudflare `/cdn-cgi/trace` (cookie `ucc`, 7 days): Spain, Spanish-speaking Latin America, Puerto Rico and
  Equatorial Guinea → Spanish; everywhere else → English → browser language if the country is unknown.
- Pages with an `/es/` twin jump to the `hreflang` twin; one-page EN/ES sites (`<html data-lang>`) switch in place.
  Pages without a twin (e.g. `/es/ayudas/`, calls) are left as they are. Crawlers and AI bots are never redirected.
- To change the country list, edit the `ES` line in `scripts/ulang.js` and copy the file to the other repos.

## Ayudas en España (/es/ayudas/, Spanish only)
- `scripts/ayudas.py` builds a Spanish-only section with the open State and regional grants for companies, from the public API of the
  Base de Datos Nacional de Subvenciones (infosubvenciones.es): search page with a three-question assistant and a tile map of the regions,
  one page per region (`/es/ayudas/<region>/`), `/es/ayudas/estatales/`, one page per call (`/es/ayudas/convocatoria/<código BDNS>/`,
  schema.org MonetaryGrant; closed calls stay 90 days marked as closed) and `/es/ayudas/ayudas.json`.
- Filters: State calls of the last 365 days and regional calls of the last 183 days for pymes and large companies; excludes nominative/instrumental
  grants, prizes, cancelled calls and social, cultural and education aims. Near-identical lines are grouped.
- `content/ayudas_cache.json` keeps the reduced records (committed by the workflow), so each build only downloads new calls and still works if the API is down.
- With `ANTHROPIC_API_KEY`, each new call gets a clear title and a two-sentence summary (cached); otherwise the official title is shortened by rules.
- It reuses the Spanish header and footer of `/es/about/`; the EN button points to calls.ullswaterinvestments.com/spain/. URLs go in `sitemap.xml` without hreflang.

## Agents (automatic)
| Agent | Workflow | When | What it does |
|---|---|---|---|
| Site build + IndexNow | `build.yml` | every push and daily 06:40 UTC | Rebuilds the site with live data (calls, news, events), including the data-driven **guides** in `/guides/`, deploys and notifies IndexNow |
| Health check with self-repair | `monitor.yml` | daily 07:15 UTC | Checks www, calls, news and events (200, no noindex, robots.txt open to AI crawlers, sitemaps, llms.txt, apex redirect, fresh calls data). If www is broken it triggers a rebuild; opens a `site-health` issue (email) and closes it when fixed |
| AI visibility meter | `weekly-ai-report.yml` | Mondays 05:30 UTC | Asks 10 questions to ChatGPT, Claude, Gemini and Perplexity with live web search; records mentions/citations of Ullswater in `data/ai_visibility.csv` and `reports/ai-visibility.md` |
| Search Console report | `weekly-ai-report.yml` | Mondays 05:30 UTC | Clicks, impressions, top queries and pages, sitemap status → `reports/search-console.md`; both reports are sent as a `weekly-report` issue (email) |

### Secrets to add (Settings → Secrets and variables → Actions → New repository secret)
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `PERPLEXITY_API_KEY` (any missing key is simply skipped).
- Optional repository variables to change models: `OPENAI_MODEL` (default gpt-5.4), `ANTHROPIC_MODEL` (claude-sonnet-5-5), `GEMINI_MODEL` (gemini-3.5-flash), `PERPLEXITY_MODEL` (sonar).
- `GSC_SERVICE_ACCOUNT_JSON`: in Google Cloud Console create a project → enable "Google Search Console API" → IAM → Service accounts → create one → Keys → Add key (JSON). In Search Console → Settings → Users and permissions → Add user: the service account e-mail, permission "Restricted". Paste the whole JSON as the secret.

## Site structure (Nov 2026)
- `/sitemap-index.xml` lists every sitemap of the network: www, `/sitemap-projects.xml` (project landings on their own subdomains), calls, news (+ Google News) and events. Submit it once in Search Console (domain property).
- Main menu order matches the network menu of calls, news and events: EU opportunities · News · Events · Projects (+ Services, Courses here) · About.
- «EU opportunities» / «Oportunidades UE» (Nov 2026) has two columns: grants (calls.ullswaterinvestments.com) and public contracts (tenders.ullswaterinvestments.com, built from the ullswater-calls repo, `tenders/`). The home shows the number of open tenders from `tenders./data/stats.json` (tile hidden while it is unreachable) and the service page `/tender-readiness/` sells bid support. Links to tenders. are mapped to its Spanish paths by `scripts/i18n.py`.
- Calls pages exist only on calls.ullswaterinvestments.com; shared taxonomy in its `/data/taxonomy.json`.
