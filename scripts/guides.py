"""Data-driven guides (/guides/<slug>/): rebuilt every day from the live calls feed.
Every figure is computed from the European Commission data; the editorial text is fixed and factual,
so the pages can be published automatically without review."""
from datetime import date
from html import escape
import re

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def _pre(c, *p):
    i = (c.get("id") or "").upper()
    return any(i.startswith(x) for x in p)


GUIDES = [
    ("horizon-europe-cluster-1-health", "Horizon Europe Cluster 1 (Health) calls",
     "Cluster 1 of Horizon Europe funds research and innovation for health: disease prevention, health care systems, digital health, tools and technologies. This guide also covers the Innovative Health Initiative (IHI) and EU4Health calls.",
     lambda c: _pre(c, "HORIZON-HLTH", "HORIZON-JU-IHI") or c.get("programme") == "EU4H"),
    ("horizon-europe-cluster-2-culture-society", "Horizon Europe Cluster 2 (Culture, Creativity and Inclusive Society) calls",
     "Cluster 2 funds research on democracy and governance, cultural heritage and the creative industries, and social and economic transformations.",
     lambda c: _pre(c, "HORIZON-CL2")),
    ("horizon-europe-cluster-3-civil-security", "Horizon Europe Cluster 3 (Civil Security for Society) calls",
     "Cluster 3 funds disaster-resilient societies, border management, the fight against crime and terrorism, infrastructure protection and cybersecurity, with strong dual-use potential.",
     lambda c: _pre(c, "HORIZON-CL3")),
    ("horizon-europe-cluster-4-digital-industry-space", "Horizon Europe Cluster 4 (Digital, Industry and Space) calls",
     "Cluster 4 funds artificial intelligence, data, chips, quantum, advanced materials, manufacturing and space. This guide also covers the EuroHPC, Chips and Smart Networks joint undertakings.",
     lambda c: _pre(c, "HORIZON-CL4", "HORIZON-JU-EUROHPC", "HORIZON-JU-CHIPS", "HORIZON-JU-SNS")),
    ("horizon-europe-cluster-5-climate-energy-mobility", "Horizon Europe Cluster 5 (Climate, Energy and Mobility) calls",
     "Cluster 5 funds climate science, clean energy, batteries, energy-efficient buildings, and clean, smart transport, together with the related partnerships.",
     lambda c: _pre(c, "HORIZON-CL5", "HORIZON-JU-CLEAN", "HORIZON-JU-CCAM", "HORIZON-JU-ER", "HORIZON-JU-SESAR")),
    ("horizon-europe-cluster-6-food-environment", "Horizon Europe Cluster 6 (Food, Bioeconomy, Natural Resources, Agriculture and Environment) calls",
     "Cluster 6 funds biodiversity, sustainable farming and food systems, oceans and water, the circular and bio-based economy, plus the biodiversity (NATURE) calls and LIFE.",
     lambda c: _pre(c, "HORIZON-CL6", "HORIZON-NATURE", "HORIZON-JU-CBE") or c.get("programme") == "LIFE"),
    ("eu-missions", "EU Missions and New European Bauhaus calls",
     "The EU Missions tackle five goals (climate adaptation, cancer, oceans and waters, climate-neutral cities and soil health) with cross-sector projects; the New European Bauhaus links sustainability, inclusion and design.",
     lambda c: _pre(c, "HORIZON-MISS", "HORIZON-NEB")),
    ("european-innovation-council-eic", "European Innovation Council (EIC) calls",
     "The EIC supports breakthrough technologies from early research (Pathfinder) to scale-up (Accelerator, STEP). Accelerator funding combines grants and equity for start-ups and SMEs.",
     lambda c: "EIC" in (c.get("id") or "").upper()),
    ("msca-erc-research-infrastructures", "MSCA, ERC, research infrastructures and Widening calls",
     "Excellent science and widening participation: Marie Skłodowska-Curie Actions, European Research Council grants, research infrastructures, Widening, EIT and European innovation ecosystems.",
     lambda c: _pre(c, "HORIZON-MSCA", "ERC", "HORIZON-ERC", "HORIZON-INFRA", "HORIZON-WIDERA", "HORIZON-EIT", "HORIZON-EIE")),
    ("digital-europe-programme", "Digital Europe Programme calls",
     "Digital Europe funds the deployment of digital capacity: AI, cybersecurity, high-performance computing, data spaces, advanced digital skills and European Digital Innovation Hubs.",
     lambda c: c.get("programme") == "DIGITAL"),
    ("european-defence-fund", "European Defence Fund (EDF) and EDIP calls",
     "The European Defence Fund co-finances collaborative defence research and capability development; EDIP and related instruments reinforce Europe's defence industrial base.",
     lambda c: c.get("programme") == "EDF"),
    ("cascade-funding-open-calls", "Cascade funding (financial support to third parties) open calls",
     "Cascade funding calls are run by EU-funded projects that re-grant part of their budget to SMEs, start-ups and other organisations, usually with lighter applications and faster decisions.",
     lambda c: c.get("kind") == "cascade"),
]


def _fmt(iso):
    d = date.fromisoformat(iso[:10])
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def _money(v):
    if not v:
        return "—"
    return f"€{v / 1e6:.1f} million".replace(".0 million", " million") if v >= 1e6 else f"€{round(v / 1000):,}k"


def _slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build(calls, calls_base, today=None):
    """Return {path: (title, description, body_html, jsonld)} plus the index entry."""
    today = today or date.today()
    out = {}
    tiles = []
    for slug, title, intro, pred in GUIDES:
        cs = [c for c in calls if pred(c) and (not c.get("deadline") or c["deadline"] >= today.isoformat())]
        op = [c for c in cs if c["status"] == "open"]
        fc = [c for c in cs if c["status"] != "open"]
        upcoming = sorted([c for c in cs if c.get("deadline")], key=lambda c: c["deadline"])
        budget = sum(c.get("budget") or 0 for c in cs)
        nxt = upcoming[0] if upcoming else None
        h1 = f"{title} {today.year}–{today.year + 1}: deadlines and budgets"
        rows = "".join(
            f'<tr><td><a href="{calls_base}/call/{_slug(c["id"])}/">{escape(c["title"])}</a><small>{escape(c["id"])}</small></td>'
            f'<td>{"Open" if c["status"] == "open" else "Forthcoming"}</td><td>{_fmt(c["deadline"])}</td><td>{_money(c.get("budget"))}</td></tr>'
            for c in upcoming[:20])
        faq = [
            (f"How many {title} are open now?",
             f"As of {_fmt(today.isoformat())}, {len(op)} are open for submission and {len(fc)} are forthcoming, according to the European Commission's Funding & Tenders Portal."),
            (f"When is the next deadline?",
             f"The next deadline is {_fmt(nxt['deadline'])}, for “{nxt['title']}” ({nxt['id']})." if nxt else "There is no open or forthcoming deadline in this group right now. New calls are added as the Commission publishes them; check back or subscribe to alerts."),
            ("What is the total indicative budget?",
             f"The indicative budget of the open and forthcoming topics listed here adds up to {_money(budget)}." if budget else "The Commission has not published topic budgets for the calls currently listed."),
            ("Where do I apply?",
             "Proposals are submitted through the EU Funding & Tenders Portal before 17:00 Brussels time on the deadline day. Always read the official call documents before applying."),
            ("Can Ullswater Investments help me apply?",
             "Yes. Ullswater Investments, EU funding advisors based in Madrid, matches projects with the right call, builds consortia and writes and reviews proposals."),
        ]
        faq_html = "".join(f"<details class=\"mod\"><summary>{escape(q)}</summary><p style=\"padding:0 22px 16px;margin:0;color:var(--muted)\">{escape(a)}</p></details>" for q, a in faq)
        stats = (f'<ul class="stats"><li><strong>{len(op)}</strong>open now</li><li><strong>{len(fc)}</strong>forthcoming</li>'
                 f'<li><strong>{_fmt(nxt["deadline"]) if nxt else "—"}</strong>next deadline</li><li><strong>{_money(budget)}</strong>indicative budget</li></ul>')
        table = (f'<div style="overflow-x:auto"><table class="gt"><thead><tr><th>Call topic</th><th>Status</th><th>Deadline</th><th>Budget</th></tr></thead><tbody>{rows}</tbody></table></div>'
                 if rows else '<div class="panel"><p style="margin:0">No open or forthcoming calls in this group today. The list updates automatically every day.</p></div>')
        body = f"""<section class="hero sm"><div class="wrap"><div class="crumbs"><a href="/">Home</a> › <a href="/guides/">Guides</a> › {escape(title)}</div>
<p class="kicker">Guide · updated {_fmt(today.isoformat())}</p><h1>{escape(h1)}</h1><p class="lead">{escape(intro)}</p>{stats}
<div class="actions"><a class="btn" href="{calls_base}/">Search all EU calls</a><a class="btn ghost" href="/eu-fund-matching/">Get help to apply</a></div></div></section>
<section class="band"><div class="wrap"><h2>Upcoming deadlines</h2><p class="sub">Open and forthcoming topics, sorted by next deadline. Source: European Commission, EU Funding &amp; Tenders Portal. Data refreshed daily.</p>{table}
<h2 style="margin-top:48px">Frequently asked questions</h2>{faq_html}</div></section>"""
        jsonld = [{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
                      {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]},
                  {"@context": "https://schema.org", "@type": "ItemList", "name": h1, "numberOfItems": len(upcoming),
                   "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": c["title"], "url": c["url"]} for i, c in enumerate(upcoming[:20])]}]
        desc = (f"{len(op)} open and {len(fc)} forthcoming {title}, next deadline "
                f"{_fmt(nxt['deadline']) if nxt else 'to be announced'}. Deadlines and budgets from the EU Funding & Tenders Portal, updated daily.")
        out[f"/guides/{slug}/"] = (f"{h1} | Ullswater Investments", desc, body, jsonld)
        tiles.append((slug, title, len(op), len(fc), nxt))
    cards = "".join(f'<a class="card" href="/guides/{s}/"><h3>{escape(t)}</h3><p>{o} open · {f} forthcoming'
                    f'{" · next deadline " + _fmt(n["deadline"]) if n else ""}</p><span class="go">Read the guide →</span></a>' for s, t, o, f, n in tiles)
    body = f"""<section class="hero sm"><div class="wrap"><div class="crumbs"><a href="/">Home</a> › Guides</div><p class="kicker">Guides · updated {_fmt(today.isoformat())}</p>
<h1>EU funding guides {today.year}–{today.year + 1}</h1><p class="lead">Practical, data-driven guides to the main EU funding programmes: what each one funds, how many calls are open, the next deadlines and budgets. Updated every day from the European Commission.</p></div></section>
<section class="band"><div class="wrap"><div class="grid g3">{cards}</div></div></section>"""
    out["/guides/"] = (f"EU funding guides {today.year}–{today.year + 1}: Horizon Europe, EIC, Digital Europe, EDF | Ullswater Investments",
                       "Data-driven guides to Horizon Europe clusters, EU Missions, EIC, MSCA and ERC, Digital Europe, the European Defence Fund and cascade funding, updated daily.",
                       body, {"@context": "https://schema.org", "@type": "CollectionPage", "name": "EU funding guides", "url": "https://www.ullswaterinvestments.com/guides/"})
    return out
