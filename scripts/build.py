#!/usr/bin/env python3
"""Static site generator for www.ullswaterinvestments.com.

Pulls live data from the Ullswater subdomains (calls, news, events) at build time,
renders every page into site/, and writes redirect stubs for the old Google Sites URLs.
Set STAGING=1 to build the review copy (noindex)."""
import json
import os
import re
import shutil
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timezone
from email.utils import parsedate_to_datetime
from html import escape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from content import *  # noqa: E402,F401,F403
import content as C  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
CACHE = ROOT / "content" / "live_cache.json"
BASE = "https://www.ullswaterinvestments.com"
STAGING = os.environ.get("STAGING") == "1" or (ROOT / "STAGING").exists()
VER = datetime.now(timezone.utc).strftime("%Y%m%d%H%M")
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Old Google Sites URL -> new destination (also exported as redirects.csv for Cloudflare)
REDIRECTS = {
    "/home": "/",
    "/cursos": "/courses/",
    "/calls": CALLS + "/theme/",
    "/eu-funding-news": NEWS + "/",
    "/eu-funding-news/october-25": "/news/archive/october-2025/",
    "/eu-funding-news/november-25": "/news/archive/november-2025/",
    "/eu-funding-events": EVENTS + "/",
}


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": "ullswater-www-build"})
    with urllib.request.urlopen(req, timeout=60) as r:
        b = r.read()
    return b if binary else b.decode("utf-8")


def fmt(iso):
    d = date.fromisoformat(iso[:10])
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def load_live():
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    live = {}
    try:
        data = json.loads(fetch(CALLS + "/data/calls.json"))
        today = date.today().isoformat()
        soon = sorted([c for c in data["calls"] if c["status"] == "open" and c.get("deadline") and c["deadline"] >= today],
                      key=lambda c: c["deadline"])[:8]
        live["stats"] = data["stats"]
        live["soon"] = [{k: c.get(k) for k in ("id", "title", "deadline", "programme", "budget")} for c in soon]
    except Exception as e:  # keep the last good copy
        print("calls fetch failed:", e)
    try:
        live["themes"] = json.loads(fetch(CALLS + "/data/themes.json"))
    except Exception as e:
        print("themes fetch failed:", e)
    try:
        root = ET.fromstring(fetch(NEWS + "/feed.xml"))
        items = []
        for it in root.iter("item"):
            items.append({"title": it.findtext("title"), "url": it.findtext("link"), "summary": it.findtext("description") or "",
                          "category": it.findtext("category") or "", "date": parsedate_to_datetime(it.findtext("pubDate")).date().isoformat()})
        live["news"] = items[:4]
    except Exception as e:
        print("news fetch failed:", e)
    try:
        ev = json.loads(fetch(EVENTS + "/events.json"))["events"]
        today = date.today().isoformat()
        live["events"] = sorted([e for e in ev if (e.get("end") or e.get("start", "")) >= today], key=lambda e: e["start"])[:3]
    except Exception as e:
        print("events fetch failed:", e)
    for k, v in cache.items():
        live.setdefault(k, v)
    CACHE.write_text(json.dumps(live, ensure_ascii=False, indent=1), encoding="utf-8")
    return live


CSS = """:root{--navy:#233567;--navy2:#1a2850;--gold:#c9a646;--gold2:#8a6a1c;--ink:#1f2937;--muted:#4b5563;--line:#e5e7eb;--bg:#f5f6f8}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:#fff;line-height:1.65;font-size:17px}
a{color:var(--navy)}a:hover{color:var(--navy2)}img{max-width:100%}
.wrap{max-width:1140px;margin:0 auto;padding:0 22px}.narrow{max-width:820px}
.skip{position:absolute;left:-999px}.skip:focus{left:10px;top:10px;background:#fff;padding:8px;z-index:99}
.staging{background:#fff4d6;color:#5c4510;text-align:center;font-size:14px;padding:6px}
header.site{background:var(--navy);color:#fff;position:sticky;top:0;z-index:20}
header.site .wrap{display:flex;align-items:center;gap:18px;min-height:70px}
.brand{color:#fff;text-decoration:none;display:flex;align-items:center;gap:10px;margin-right:auto}
.brand .mk{width:38px;height:38px;border-radius:9px;background:var(--gold);color:var(--navy);font-weight:800;display:grid;place-items:center;font-size:21px}
.brand b{display:block;font-size:17px;line-height:1.1;letter-spacing:.01em}.brand small{display:block;color:var(--gold);font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
nav.main{display:flex;align-items:center;gap:2px}
nav.main>a,nav.main .dd>button{color:#e6ebf7;text-decoration:none;font:inherit;font-size:15px;padding:8px 11px;border-radius:6px;background:none;border:0;cursor:pointer}
nav.main>a:hover,nav.main .dd>button:hover,nav.main [aria-current]{background:rgba(255,255,255,.12);color:#fff}
.dd{position:relative}.dd>button::after{content:" ▾";font-size:11px}
.dd .menu{display:none;position:absolute;right:0;top:100%;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 12px 32px rgba(17,24,39,.16);padding:8px;min-width:280px}
.dd:hover .menu,.dd:focus-within .menu,.dd.open .menu{display:block}
.dd .menu a{display:block;color:var(--ink);text-decoration:none;padding:7px 10px;border-radius:6px;font-size:15px}.dd .menu a:hover{background:var(--bg)}
.dd .menu.wide{min-width:560px;left:0;right:auto;display:none;grid-template-columns:1fr 1fr;gap:4px 12px}.dd:hover .menu.wide,.dd:focus-within .menu.wide,.dd.open .menu.wide{display:grid}.dd .menu.wide a{padding:5px 10px}.dd .menu hr{border:0;border-top:1px solid var(--line);margin:6px 4px}.dd .menu .lbl{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold2);font-weight:700;padding:6px 10px 2px}
.btn{display:inline-block;background:var(--gold);color:var(--navy);font-weight:700;text-decoration:none;padding:11px 20px;border-radius:7px;white-space:nowrap;border:0;font:inherit;font-weight:700;cursor:pointer}
.btn:hover{background:#d8b85a;color:var(--navy)}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.5);color:#fff}.btn.ghost:hover{background:rgba(255,255,255,.1)}
.btn.line{background:#fff;border:1px solid var(--line);color:var(--navy)}
header .btn{padding:9px 15px;font-size:15px}
.burger{display:none;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
.hero{background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 100%);color:#fff;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;right:-120px;top:-120px;width:460px;height:460px;border-radius:50%;border:70px solid rgba(201,166,70,.12)}
.hero .wrap{padding:84px 22px 76px;position:relative;z-index:1}.hero.sm .wrap{padding:56px 22px 48px}
.kicker{font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--gold);margin:0 0 12px}
.hero h1{font-size:50px;line-height:1.1;margin:0 0 18px;max-width:860px;letter-spacing:-.01em}.hero.sm h1{font-size:40px}
.hero .lead{font-size:20px;color:#d5dcef;max-width:760px;margin:0}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.stats{display:flex;flex-wrap:wrap;gap:14px;margin:38px 0 0;padding:0;list-style:none}
.stats li{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:12px 18px;font-size:14px;color:#cbd3ea}
.stats strong{display:block;font-size:26px;color:#fff;line-height:1.15}
.crumbs{font-size:14px;color:#b8c3e0;margin-bottom:14px}.crumbs a{color:#dfe5f5}
section.band{padding:72px 0}section.band.alt{background:var(--bg)}section.band.dark{background:var(--navy);color:#fff}
h2{font-size:34px;line-height:1.2;color:var(--navy);margin:0 0 14px;letter-spacing:-.01em}.dark h2{color:#fff}
h3{font-size:20px;color:var(--navy);margin:0 0 8px;line-height:1.3}
.sub{color:var(--muted);font-size:18px;max-width:760px;margin:0 0 34px}.dark .sub{color:#cbd3ea}
.grid{display:grid;gap:22px}.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}
.card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:26px;display:flex;flex-direction:column}
a.card{text-decoration:none;color:inherit;transition:border-color .15s,box-shadow .15s,transform .15s}a.card:hover{border-color:var(--gold);box-shadow:0 10px 28px rgba(35,53,103,.1);transform:translateY(-2px)}
.card p{margin:0 0 12px;color:var(--muted);font-size:16px}.card .go{margin-top:auto;font-weight:700;color:var(--navy);font-size:15px}
.card .ic{font-size:28px;margin-bottom:10px}.card .num{font-size:13px;font-weight:800;color:var(--gold2);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px}
.card.top{border-top:4px solid var(--gold)}
.tag{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;background:#eef1f8;color:var(--navy);border-radius:999px;padding:3px 10px;margin-bottom:10px;align-self:flex-start}
.quote{border-left:4px solid var(--gold);padding:6px 0 6px 26px;font-size:18.5px;line-height:1.55;color:var(--navy);margin:0;font-weight:500}
.quote cite{display:block;font-size:15px;color:var(--muted);font-style:normal;margin-top:14px;font-weight:600}
.flow{display:grid;grid-template-columns:repeat(3,1fr);gap:0;align-items:stretch;margin:30px 0}
.flow div{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px;position:relative;text-align:center}
.flow div+div{margin-left:38px}.flow div+div::before{content:"→";position:absolute;left:-31px;top:50%;transform:translateY(-50%);color:var(--gold2);font-size:24px;font-weight:700}
.flow b{display:block;font-size:30px;color:var(--gold2)}.flow strong{display:block;color:var(--navy);font-size:18px}.flow span{color:var(--muted);font-size:15px}
.flow.f4{grid-template-columns:repeat(4,1fr)}
.split{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:start}
.prose p{margin:0 0 18px}.prose h2{margin-top:10px}.prose ul{padding-left:22px}.prose li{margin-bottom:8px}
.list{list-style:none;padding:0;margin:0}.list li{border-bottom:1px solid var(--line);padding:14px 0;display:flex;gap:16px;align-items:baseline}
.list li:last-child{border-bottom:0}.list .d{flex:0 0 108px;font-weight:700;color:var(--navy);font-size:15px}.list a{font-weight:600;text-decoration:none}.list a:hover{text-decoration:underline}
.list small{display:block;color:var(--muted);font-size:13px}
.panel{background:#fff;border:1px solid var(--line);border-radius:12px;padding:24px}
.panel h3 a{text-decoration:none}.panel .list li{flex-direction:column;gap:2px}.panel .list .d{flex:none;font-size:13px;color:var(--gold2)}.panel .more{display:inline-block;margin-top:14px;font-weight:700;text-decoration:none}
.facts{display:grid;grid-template-columns:200px 1fr;gap:0;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.facts dt,.facts dd{margin:0;padding:12px 18px;border-bottom:1px solid var(--line)}.facts dt{background:var(--bg);font-weight:700;color:var(--navy);font-size:15px}
.facts dt:last-of-type,.facts dd:last-of-type{border-bottom:0}
.check{list-style:none;padding:0;margin:0}.check li{padding-left:30px;position:relative;margin-bottom:12px}.check li::before{content:"✓";position:absolute;left:0;color:var(--gold2);font-weight:800}
.warn li::before{content:"✕";color:#b42318}
.phase{display:grid;grid-template-columns:150px 1fr;gap:26px;padding:28px 0;border-top:1px solid var(--line)}
.phase .ph{font-weight:800;color:var(--gold2);text-transform:uppercase;letter-spacing:.08em;font-size:14px}
.phase dl{margin:12px 0 0}.phase dt{font-weight:700;color:var(--navy)}.phase dd{margin:0 0 12px;color:var(--muted)}
details.mod{border:1px solid var(--line);border-radius:12px;margin-bottom:12px;background:#fff}
details.mod summary{cursor:pointer;padding:18px 22px;font-weight:700;color:var(--navy);font-size:18px;list-style:none;display:flex;gap:16px;align-items:center}
details.mod summary::-webkit-details-marker{display:none}details.mod summary::after{content:"+";margin-left:auto;font-size:24px;color:var(--gold2)}details.mod[open] summary::after{content:"–"}
details.mod summary span{background:var(--navy);color:var(--gold);border-radius:8px;padding:2px 10px;font-size:14px}
details.mod ol{margin:0;padding:0 22px 18px 60px}details.mod li{margin-bottom:10px}details.mod li b{color:var(--navy)}details.mod li p{margin:2px 0 0;color:var(--muted);font-size:15px}
.cta{background:linear-gradient(135deg,var(--navy),var(--navy2));color:#fff;border-radius:16px;padding:46px;display:flex;gap:28px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.cta h2{color:#fff;margin:0 0 6px}.cta p{margin:0;color:#cbd3ea;font-size:18px}
footer.site{background:#111a33;color:#aab4cf;font-size:15px;padding:52px 0 30px}
footer.site .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:30px}
footer.site h4{color:#fff;font-size:14px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 12px}
footer.site a{color:#dfe5f5;text-decoration:none;display:block;margin-bottom:7px}footer.site a:hover{color:var(--gold)}
footer.site .legal{border-top:1px solid #26314f;margin-top:34px;padding-top:20px;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
footer.site .legal a{display:inline;margin-left:16px}
@media (max-width:960px){.g3,.g4{grid-template-columns:repeat(2,1fr)}.split{grid-template-columns:1fr}footer.site .cols{grid-template-columns:1fr 1fr}.flow.f4{grid-template-columns:1fr 1fr;gap:14px}.flow.f4 div{margin-left:0}.flow.f4 div::before{display:none}
 .burger{display:block}nav.main{display:none;position:absolute;left:0;right:0;top:70px;background:var(--navy2);flex-direction:column;align-items:stretch;padding:10px 16px 18px}
 nav.main.open{display:flex}.dd .menu,.dd .menu.wide{position:static;grid-template-columns:1fr;min-width:0;box-shadow:none;border:0;background:transparent;display:block;padding:0 0 0 12px;min-width:0}.dd .menu a{color:#cfd8ee}.dd .menu .lbl{color:var(--gold)}.dd .menu.wide{min-width:560px;left:0;right:auto;display:none;grid-template-columns:1fr 1fr;gap:4px 12px}.dd:hover .menu.wide,.dd:focus-within .menu.wide,.dd.open .menu.wide{display:grid}.dd .menu.wide a{padding:5px 10px}.dd .menu hr{border-color:#334}.dd>button::after{content:""}
 header .btn.hide-m{display:none}}
@media (max-width:640px){body{font-size:16px}.hero h1{font-size:36px}.hero.sm h1{font-size:31px}.hero .wrap{padding:56px 22px 52px}h2{font-size:28px}.g2,.g3,.g4{grid-template-columns:1fr}
 .flow{grid-template-columns:1fr}.flow div+div{margin-left:0;margin-top:30px}.flow div+div::before{content:"↓";left:50%;top:-27px;transform:translateX(-50%)}
 .phase{grid-template-columns:1fr;gap:6px}footer.site .cols{grid-template-columns:1fr}footer.site a{overflow-wrap:anywhere}.facts{grid-template-columns:1fr}.facts dt{border-bottom:0}.cta{padding:30px}.list li{flex-direction:column;gap:2px}.list .d{flex:none}}
"""

JS = """(function(){var b=document.querySelector('.burger'),n=document.querySelector('nav.main');if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.querySelectorAll('.dd>button').forEach(function(x){x.addEventListener('click',function(){var d=x.parentNode,o=d.classList.toggle('open');x.setAttribute('aria-expanded',o)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.dd.open').forEach(function(d){d.classList.remove('open')});if(document.activeElement)document.activeElement.blur()}});
document.addEventListener('click',function(e){document.querySelectorAll('.dd.open').forEach(function(d){if(!d.contains(e.target))d.classList.remove('open')})});})();"""

ORG = {"@context": "https://schema.org", "@type": "ProfessionalService", "@id": BASE + "/#org", "name": "Ullswater Investments",
       "legalName": "Ullswater Investments S.L.", "url": BASE + "/", "email": C.EMAIL, "taxID": "B10740942",
       "description": "Madrid-based European funding advisory firm: Horizon Europe, EIC, Digital Europe, InvestEU and EIF, CDTI, ENISA and Red.es.",
       "address": {"@type": "PostalAddress", "streetAddress": "Calle Ramírez de Arellano 17", "postalCode": "28043", "addressLocality": "Madrid", "addressCountry": "ES"},
       "founder": {"@type": "Person", "name": "Emilio Mulet", "jobTitle": "Managing Partner"}, "areaServed": "Europe", "knowsLanguage": ["en", "es"],
       "sameAs": [C.CALLS + "/", C.NEWS + "/", C.EVENTS + "/"]}


def header(themes, current):
    def cur(k):
        return ' aria-current="page"' if k == current else ""
    tl = "".join(f'<a href="{C.CALLS}/theme/{t["slug"]}/">{escape(t["short"])}</a>' for t in themes)
    return f"""<header class="site"><div class="wrap">
<a class="brand" href="/" aria-label="Ullswater Investments home"><span class="mk" aria-hidden="true">U</span><span><b>Ullswater Investments</b><small>EU Funding Advisors</small></span></a>
<nav class="main" aria-label="Main">
<div class="dd"><button type="button" aria-haspopup="true" aria-expanded="false"{cur('calls')}>Calls</button><div class="menu wide"><div>
<div class="lbl">Live EU calls</div><a href="{C.CALLS}/"><b>All open EU calls</b></a><a href="{C.CALLS}/closing-soon/">Closing soon</a><a href="{C.CALLS}/finder/">Fund Finder</a><a href="{C.CALLS}/review/">AI pre-check of your idea</a><a href="{C.CALLS}/partners/">Partner board</a><a href="{C.CALLS}/alerts/">Email alerts</a><a href="{C.CALLS}/spain/">Spain: national and regional calls</a>
</div><div><div class="lbl">By theme</div>{tl}<a href="{C.CALLS}/theme/"><b>All themes →</b></a></div></div></div>
<div class="dd"><button type="button" aria-haspopup="true" aria-expanded="false"{cur('services')}>Services</button><div class="menu">
<a href="/investment-readiness/">Investment Readiness</a><a href="/eu-fund-matching/">EU Fund Matching</a><a href="/strategic-positioning/">Strategic Positioning</a><a href="/courses/">Executive courses</a></div></div>
<a href="{C.NEWS}/">News</a><a href="{C.EVENTS}/">Events</a><a href="/courses/"{cur('courses')}>Courses</a><a href="/about/"{cur('about')}>About</a>
</nav><a class="btn hide-m" href="{C.BOOK}" target="_blank" rel="noopener">Book a meeting</a>
<button class="burger" type="button" aria-label="Menu" aria-expanded="false">☰</button></div></header>"""


FOOTER = f"""<footer class="site"><div class="wrap"><div class="cols">
<div><h4>Ullswater Investments</h4><p style="margin:0 0 10px">European funding advisors. Grants, loans and equity for innovation, from Madrid to Brussels.</p>
<p style="margin:0">Calle Ramírez de Arellano 17<br>28043 Madrid, Spain<br><a href="mailto:{C.EMAIL}" style="display:inline">{C.EMAIL}</a></p></div>
<div><h4>Services</h4><a href="/investment-readiness/">Investment Readiness</a><a href="/eu-fund-matching/">EU Fund Matching</a><a href="/strategic-positioning/">Strategic Positioning</a><a href="/courses/">Executive courses</a></div>
<div><h4>Free tools</h4><a href="{C.CALLS}/">Open EU calls</a><a href="{C.CALLS}/finder/">Fund Finder</a><a href="{C.CALLS}/review/">AI pre-check</a><a href="{C.CALLS}/partners/">Partner board</a><a href="{C.CALLS}/alerts/">Email alerts</a></div>
<div><h4>Insights</h4><a href="{C.NEWS}/">EU Funding News</a><a href="{C.EVENTS}/">EU Funding Events</a><a href="/news/archive/">News archive</a><a href="/about/">About us</a></div>
</div><div class="legal"><span>© {date.today().year} Ullswater Investments S.L. · CIF B10740942</span><span><a href="/privacy/">Privacy</a><a href="/legal/">Legal notice</a><a href="/sitemap.xml">Sitemap</a></span></div></div></footer>"""


def page(path, title, desc, body, themes, current="", jsonld=None):
    canon = BASE + path
    lds = [ORG] + ([jsonld] if jsonld else [])
    robots = '<meta name="robots" content="noindex,nofollow">' if STAGING else '<meta name="robots" content="index,follow,max-image-preview:large">'
    banner = '<div class="staging">Review copy of the new www.ullswaterinvestments.com, not yet live.</div>' if STAGING else ""
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)}</title><meta name="description" content="{escape(desc)}">{'' if path == '/404.html' else f'<link rel="canonical" href="{canon}">'}{robots}
<meta property="og:type" content="website"><meta property="og:site_name" content="Ullswater Investments · EU Funding Advisors"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{canon}"><meta property="og:locale" content="en_GB"><meta name="twitter:card" content="summary">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="alternate" type="application/rss+xml" title="EU Funding News" href="{C.NEWS}/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css?v={VER}"><script type="application/ld+json">{json.dumps(lds if len(lds) > 1 else ORG, ensure_ascii=False)}</script></head><body>
<a class="skip" href="#main">Skip to content</a>{banner}{header(themes, current)}<main id="main">{body}</main>{FOOTER}<script src="/assets/site.js?v={VER}" defer></script></body></html>"""


def hero(kicker, h1, lead, crumbs="", small=True, actions="", extra=""):
    return f"""<section class="hero{' sm' if small else ''}"><div class="wrap">{crumbs}<p class="kicker">{kicker}</p><h1>{h1}</h1><p class="lead">{lead}</p>{f'<div class="actions">{actions}</div>' if actions else ''}{extra}</div></section>"""


def crumbs(name):
    return f'<div class="crumbs"><a href="/">Home</a> › {escape(name)}</div>'


def cta(title="Ready to discuss your European strategy?", text="Let's find the right funding opportunity for your project.", label="Book a meeting"):
    return f"""<section class="band"><div class="wrap"><div class="cta"><div><h2>{title}</h2><p>{text}</p></div>
<div class="actions" style="margin:0"><a class="btn" href="{C.BOOK}" target="_blank" rel="noopener">{label}</a><a class="btn ghost" href="mailto:{C.EMAIL}">Email us</a></div></div></div></section>"""


def tools_band():
    cards = "".join(f'<a class="card" href="{u}"><h3>{escape(t)}</h3><p>{escape(d)}</p><span class="go">Open →</span></a>' for t, d, u in C.TOOLS)
    return f"""<section class="band alt"><div class="wrap"><p class="kicker" style="color:var(--gold2)">Free tools</p><h2>Find, test and team up for EU calls</h2>
<p class="sub">Our public tools are built on live data from the European Commission's Funding &amp; Tenders Portal, CORDIS and the Spanish BDNS.</p><div class="grid g3">{cards}</div></div></section>"""


def home(live, themes):
    st = live.get("stats", {})
    stats = ""
    if st:
        stats = (f'<ul class="stats"><li><strong>{st["open"]}</strong>EU calls open now</li><li><strong>{st["forthcoming"]}</strong>forthcoming calls</li>'
                 f'<li><strong>{st["closingIn30Days"]}</strong>closing in 30 days</li><li><strong>{st["programmes"]}</strong>EU programmes tracked</li></ul>')
    h = hero("European funding advisors · Madrid", "Unlock European funding for your innovation", escape(C.MISSION), small=False,
             actions=f'<a class="btn" href="{C.BOOK}" target="_blank" rel="noopener">Book a meeting</a><a class="btn ghost" href="{C.CALLS}/">Explore {st.get("total", "all")} EU calls →</a>',
             extra=stats)
    svc = "".join(f'<a class="card top" href="/{s}/"><div class="num">0{i + 1}</div><h3>{escape(t)}</h3><p>{escape(d)}</p><span class="go">Learn more →</span></a>'
                  for i, (s, t, d) in enumerate(C.SERVICES))
    explore = "".join(f'<a class="card" href="{u}" target="_blank" rel="noopener"><div class="ic" aria-hidden="true">{ic}</div><h3>{escape(t)}</h3><p>{escape(d)}</p><span class="go">Explore ↗</span></a>'
                      for t, d, u, ic in C.EXPLORE)
    soon = "".join(f'<li><span class="d">{fmt(c["deadline"])}</span><span><a href="{C.CALLS}/call/{re.sub(r"[^a-z0-9]+", "-", c["id"].lower()).strip("-")}/">{escape(c["title"])}</a><small>{escape(c["id"])}</small></span></li>'
                   for c in live.get("soon", []))
    news = "".join(f'<li><span class="d">{fmt(n["date"])}</span><span><a href="{escape(n["url"])}">{escape(n["title"])}</a><small>{escape(n["category"])}</small></span></li>'
                   for n in live.get("news", []))
    evs = "".join(f'<li><span class="d">{fmt(e["start"])}</span><span><a href="{C.EVENTS}/">{escape(e["title"])}</a><small>{escape(e.get("location") or e.get("mode") or "")}</small></span></li>'
                  for e in live.get("events", []))
    upd = fmt(st["updated"]) if st.get("updated") else ""
    live_band = f"""<section class="band alt"><div class="wrap"><p class="kicker" style="color:var(--gold2)">Live from our platforms{f' · updated {upd}' if upd else ''}</p><h2>What's happening in EU funding</h2>
<p class="sub">Deadlines, news and events, refreshed automatically from the European Commission and our editorial team.</p>
<div class="grid g3"><div class="panel"><h3><a href="{C.CALLS}/closing-soon/">Closing soon</a></h3><ul class="list">{soon}</ul><a class="more" href="{C.CALLS}/">All open calls →</a></div>
<div class="panel"><h3><a href="{C.NEWS}/">Latest news</a></h3><ul class="list">{news}</ul><a class="more" href="{C.NEWS}/">EU Funding News →</a></div>
<div class="panel"><h3><a href="{C.EVENTS}/">Upcoming events</a></h3><ul class="list">{evs}</ul><a class="more" href="{C.EVENTS}/">All events →</a></div></div></div></section>"""
    vc = "".join(f'<div class="card"><div class="ic" aria-hidden="true">{i}</div><h3>{escape(t)}</h3><p>{escape(d)}</p></div>' for i, t, d in C.VC_DOMAINS)
    body = h + f"""
<section class="band"><div class="wrap split"><div><p class="kicker" style="color:var(--gold2)">Who we are</p><h2>Senior advisors for EU grants, loans and equity</h2>
<p class="sub" style="margin-bottom:0">{escape(C.TEAM)}</p></div><blockquote class="quote">{escape(C.PARTNER_QUOTE)}<cite>Emilio Mulet, Managing Partner</cite></blockquote></div></section>
<section class="band alt"><div class="wrap"><p class="kicker" style="color:var(--gold2)">Our services</p><h2>From the right call to a funded project</h2><p class="sub">Three complementary services that take you from strategy to signed grant agreement or investment.</p><div class="grid g3">{svc}</div></div></section>
<section class="band"><div class="wrap"><p class="kicker" style="color:var(--gold2)">An insider's guide</p><h2>How European funding works</h2><p class="sub">{escape(C.HOW_FUNDING)}</p><div class="grid g3">{explore}</div></div></section>
{live_band}
<section class="band"><div class="wrap"><p class="kicker" style="color:var(--gold2)">The gateway to European venture capital</p><h2>How EIF capital reaches your company</h2>
<div class="split"><div class="prose"><p>{escape(C.EIF_TEXT[0])}</p><p>{escape(C.EIF_TEXT[1])}</p></div><div class="prose"><h3>InvestEU</h3><p>{escape(C.INVESTEU_TEXT)}</p></div></div>
<div class="flow"><div><b>1</b><strong>European Investment Fund</strong><span>Acts as cornerstone investor</span></div><div><b>2</b><strong>Private VC funds</strong><span>Receive EIF capital</span></div><div><b>3</b><strong>High-growth companies</strong><span>Raise from EIF-backed VCs</span></div></div>
<h3 style="margin-top:40px">Are you investment ready?</h3><p class="sub" style="margin-bottom:20px">Professional VC investors run rigorous due diligence. Investment readiness means preparing your company to meet their standards in four domains.</p>
<div class="grid g4">{vc}</div><div class="actions"><a class="btn" href="/investment-readiness/">Become fundable →</a></div></div></section>
{tools_band()}{cta()}"""
    return page("/", "Ullswater Investments · EU Funding Advisors | Horizon Europe, EIC, EIF and InvestEU",
                "Madrid-based European funding advisors: we match projects with EU grants, EIB loans and EIF-backed capital, build consortia and write winning Horizon Europe, EIC and Digital Europe proposals.",
                body, themes, "home")


def investment_readiness(themes):
    pillars = "".join(f'<div class="card top"><div class="num">Pillar {i + 1}</div><h3>{escape(t)}</h3><p>{escape(d)}</p></div>' for i, (t, d) in enumerate(C.PILLARS))
    phases = ""
    for ph, t, intro, items in C.PHASES:
        inner = "".join(f"<dt>{escape(a)}</dt><dd>{escape(b)}</dd>" for a, b in items) if items else ""
        phases += f'<div class="phase"><div class="ph">{ph}</div><div><h3>{escape(t)}</h3><p style="margin:0;color:var(--muted)">{escape(intro)}</p>{("<dl>" + inner + "</dl>") if inner else ('<div class="grid g3" style="margin-top:16px">' + pillars + "</div>")}</div></div>'
    links = "".join(f'<li><a href="{u}" target="_blank" rel="noopener">{escape(t)} ↗</a></li>' for t, u in C.IR_LINKS)
    body = hero("Service", "Investment Readiness", "Prepare your company and your proposal to meet the standards of EU evaluators, the EIB and EIF-backed investors.", crumbs("Investment Readiness"),
                actions=f'<a class="btn" href="{C.BOOK}" target="_blank" rel="noopener">Book a readiness review</a><a class="btn ghost" href="{C.CALLS}/review/">Try the free AI pre-check</a>') + f"""
<section class="band"><div class="wrap split"><div class="prose">{''.join(f'<p>{escape(p)}</p>' for p in C.IR_INTRO)}</div>
<div><div class="panel"><h3>What funders need to see</h3><p style="color:var(--muted);margin-top:0">{escape(C.IR_NEED)}</p><h3 style="margin-top:22px">Common stumbling blocks we help you avoid</h3><ul class="check warn">{''.join(f'<li>{escape(x)}</li>' for x in C.IR_PITFALLS)}</ul></div></div></div></section>
<section class="band alt"><div class="wrap narrow"><blockquote class="quote">{escape(C.IR_QUOTE)}<cite>Emilio Mulet, Managing Partner, Ullswater Investments</cite></blockquote></div></section>
<section class="band"><div class="wrap"><p class="kicker" style="color:var(--gold2)">A visual guide</p><h2>Keys to an excellent proposal</h2><p class="sub">EU evaluators and investment managers review many applications against tight deadlines. They look for proposals that are clear, coherent and easy to assess.</p>
{phases}<div class="panel" style="margin-top:20px"><h3>Useful official resources</h3><ul class="check">{links}</ul></div></div></section>
{cta("Ready to submit your proposal?", "Book an Investment Readiness review: we check strategic alignment, viability and presentation before you submit.", "Book a review")}"""
    return page("/investment-readiness/", "Investment Readiness for EU grants, EIB loans and EIF-backed VC | Ullswater Investments",
                "Prepare your company and proposal for EU evaluators, the EIB and EIF-backed investors: strategic alignment, viability and professional execution.", body, themes, "services",
                {"@context": "https://schema.org", "@type": "Service", "name": "Investment Readiness", "provider": {"@id": BASE + "/#org"}, "areaServed": "Europe"})


def fund_matching(themes):
    pil = ""
    for t, d, rows in C.FM_PILLARS:
        pil += f'<div class="card top"><h3>Matching with {escape(t.lower())}</h3><p>{escape(d)}</p>' + "".join(f'<p><b style="color:var(--navy)">{escape(a)}.</b> {escape(b)}</p>' for a, b in rows) + "</div>"

    def progs(items):
        return "".join(f'<a class="card" href="{u}" target="_blank" rel="noopener"><span class="tag">{escape(w)}</span><h3>{escape(t)}</h3><p>{escape(d)}</p><span class="go">Official site ↗</span></a>' for t, d, w, u in items)
    gw = "".join(f'<a class="card" href="{u}" target="_blank" rel="noopener"><h3>{escape(t)}</h3><p>{escape(d)}</p><span class="go">Visit ↗</span></a>' for t, d, u in C.FM_GATEWAYS)
    body = hero("Service", "EU Fund Matching", "Expert advice on EU grants, loans and capital. We navigate European funding to secure the right financing for your project and your business.", crumbs("EU Fund Matching"),
                actions=f'<a class="btn" href="{C.BOOK}" target="_blank" rel="noopener">Schedule a consultation</a><a class="btn ghost" href="{C.CALLS}/finder/">Try the Fund Finder</a>') + f"""
<section class="band"><div class="wrap"><p class="kicker" style="color:var(--gold2)">Our matching expertise</p><h2>Grants, loans and capital</h2><p class="sub">{escape(C.FM_INTRO)}</p><div class="grid g3">{pil}</div></div></section>
<section class="band alt"><div class="wrap"><p class="kicker" style="color:var(--gold2)">The European funding ecosystem</p><h2>Direct management: funds managed by the European Commission</h2>
<p class="sub">Competitive calls at European level, ideal for innovation, research and technology development.</p><div class="grid g3">{progs(C.FM_DIRECT)}</div>
<h2 style="margin-top:56px">Shared management: funds managed nationally and regionally</h2><p class="sub">Funds allocated to Member States and managed by their own agencies, key for regional and sectoral development.</p><div class="grid g3">{progs(C.FM_SHARED)}</div></div></section>
<section class="band"><div class="wrap"><h2>Where to start</h2><p class="sub">Three gateways to EU grants, EIB loans and the InvestEU guarantee.</p><div class="grid g3">{gw}</div></div></section>
{tools_band()}{cta("Unlock European funding for your growth", "Tell us about your project and we will map the instruments and calls that fit.", "Schedule a consultation")}"""
    return page("/eu-fund-matching/", "EU Fund Matching: the right EU grant, loan or equity for your project | Ullswater Investments",
                "We match your project with the right EU programme and call: Horizon Europe, Digital Europe, LIFE, EIB loans, InvestEU and EIF-backed venture capital.", body, themes, "services",
                {"@context": "https://schema.org", "@type": "Service", "name": "EU Fund Matching", "provider": {"@id": BASE + "/#org"}, "areaServed": "Europe"})


def strategic_positioning(themes):
    proc = "".join(f'<div><b aria-hidden="true">{i}</b><strong>{escape(t)}</strong><span>{escape(d)}</span></div>' for i, t, d in C.SP_PROCESS)

    def cards(items, cls=""):
        return "".join(f'<div class="card {cls}"><h3>{escape(t)}</h3><p>{escape(d)}</p></div>' for t, d in items)
    body = hero("Service", "Strategic Positioning", escape(C.SP_INTRO), crumbs("Strategic Positioning"),
                actions=f'<a class="btn" href="{C.BOOK}" target="_blank" rel="noopener">Contact us</a>') + f"""
<section class="band"><div class="wrap"><p class="kicker" style="color:var(--gold2)">A vast landscape of opportunity</p><h2>Your path to success: a proven process</h2><p class="sub">{escape(C.SP_BUDGET)} We guide clients through each phase, turning an idea into a fundable project aligned with the logic and priorities of the EU ecosystem.</p>
<div class="flow f4">{proc}</div></div></section>
<section class="band alt"><div class="wrap"><h2>Why expert advice matters</h2><p class="sub">Navigating the EU ecosystem demands focus and expertise most companies cannot spare.</p><div class="grid g3">{cards(C.SP_WHY, 'top')}</div></div></section>
<section class="band"><div class="wrap"><h2>The strategic value of visibility</h2><p class="sub">Being known and respected by the European Commission or the EIB is not marketing: it is a competitive advantage.</p><div class="grid g3">{cards(C.SP_VALUE)}</div></div></section>
<section class="band alt"><div class="wrap"><h2>How we elevate your European positioning</h2><p class="sub">We act as your strategic partner in Brussels and beyond, building long-term influence and reputation at European level.</p><div class="grid g2">{cards(C.SP_HOW, 'top')}</div></div></section>
{cta("Ready to elevate your European strategy?", "Partner with Ullswater Investments to navigate the EU landscape and secure your position.", "Contact us")}"""
    return page("/strategic-positioning/", "Strategic Positioning in the EU funding ecosystem | Ullswater Investments",
                "How Ullswater Investments helps companies and research organisations become visible, credible partners for the European Commission, the EIB and EU consortia.", body, themes, "services",
                {"@context": "https://schema.org", "@type": "Service", "name": "Strategic Positioning", "provider": {"@id": BASE + "/#org"}, "areaServed": "Europe"})


def about(themes):
    secs = "".join(f"<h2>{escape(t)}</h2><p>{escape(d)}</p>" for t, d in C.ABOUT_SECTIONS)
    facts = "".join(f"<dt>{escape(a)}</dt><dd>{escape(b)}</dd>" for a, b in C.FACTS) + f'<dt>Contact</dt><dd><a href="mailto:{C.EMAIL}">{C.EMAIL}</a></dd>'
    body = hero("About", "About Ullswater Investments", escape(C.ABOUT_INTRO), crumbs("About")) + f"""
<section class="band"><div class="wrap split"><div class="prose">{secs}</div><div><h2>Company facts</h2><dl class="facts">{facts}</dl>
<p style="color:var(--muted);font-size:14px;margin-top:12px">Last reviewed: {fmt(date.today().isoformat())}</p></div></div></section>
{tools_band()}{cta()}"""
    return page("/about/", "About Ullswater Investments: EU funding advisors in Madrid", "Ullswater Investments S.L. is a Madrid-based European funding advisory and venture-building firm for SMEs, start-ups, technology centres and consortia.",
                body, themes, "about", {"@context": "https://schema.org", "@type": "AboutPage", "url": BASE + "/about/", "mainEntity": {"@id": BASE + "/#org"}})


def courses(themes):
    mods = "".join(f'<details class="mod"{" open" if i == 0 else ""}><summary><span>Module {i + 1}</span>{escape(t)}</summary><ol>'
                   + "".join(f"<li><b>{escape(a)}</b><p>{escape(b)}</p></li>" for a, b in items) + "</ol></details>" for i, (t, items) in enumerate(C.MODULES))
    mail = f"mailto:{C.EMAIL}?subject=Executive%20Programme%20-%20Defence%20and%20Dual-Use"
    body = hero("Executive training", escape(C.COURSE_TITLE), escape(C.COURSE_SUB) + ". " + escape(C.COURSE_FOR), crumbs("Courses"),
                actions=f'<a class="btn" href="{mail}">Request programme information</a>') + f"""
<section class="band"><div class="wrap narrow"><h2>Programme</h2><p class="sub">Six modules covering the strategic framework, the European Defence Fund, synergies with other EU instruments, proposal writing, project management and technology trends.</p>{mods}</div></section>
{cta("Bring the programme to your organisation", "In-company and open editions, in English or Spanish.", "Book a meeting")}"""
    return page("/courses/", "Executive Programme in EU Funding for Defence and Dual-Use | Ullswater Investments",
                "Six-module executive programme on financing defence, security and dual-use technology projects with EU funds: EDF, EDIP, Horizon Europe Cluster 3 and more.", body, themes, "courses",
                {"@context": "https://schema.org", "@type": "Course", "name": C.COURSE_TITLE, "description": C.COURSE_FOR, "provider": {"@id": BASE + "/#org"}, "inLanguage": ["en", "es"]})


def archive_pages(themes):
    arch = json.loads((ROOT / "content" / "news_archive.json").read_text(encoding="utf-8"))
    out = {}
    tiles = ""
    for key, a in arch.items():
        items = "".join(f'<article class="card"><span class="tag">{escape(i["category"])}</span><h3>{escape(i["title"])}</h3><p>{escape(i["summary"])}</p>'
                        + (f'<a class="go" href="{escape(i["url"])}" target="_blank" rel="noopener">Source ↗</a>' if i["url"] else "") + "</article>" for i in a["items"])
        body = hero("EU funding news archive", escape(a["title"]), f'{len(a["items"])} key developments for innovators, researchers and SMEs ({escape(a["period"])}). For current news, see EU Funding News.',
                    '<div class="crumbs"><a href="/">Home</a> › <a href="/news/archive/">News archive</a> › ' + escape(a["period"]) + "</div>",
                    actions=f'<a class="btn" href="{C.NEWS}/">Latest EU funding news →</a>') + f'<section class="band"><div class="wrap"><div class="grid g3">{items}</div></div></section>'
        path = f"/news/archive/{key}/"
        out[path] = page(path, f"{a['title']} | Ullswater Investments", f"Archive briefing: {len(a['items'])} EU funding and policy developments, {a['period']}.", body, themes)
        tiles += f'<a class="card" href="{path}"><h3>{escape(a["period"])}</h3><p>{len(a["items"])} news items</p><span class="go">Read →</span></a>'
    body = hero("News archive", "EU funding news archive", "Earlier monthly briefings, kept for reference. Current news is published daily on EU Funding News.", crumbs("News archive"),
                actions=f'<a class="btn" href="{C.NEWS}/">EU Funding News →</a>') + f'<section class="band"><div class="wrap"><div class="grid g3">{tiles}</div></div></section>'
    out["/news/archive/"] = page("/news/archive/", "EU funding news archive | Ullswater Investments", "Archive of earlier EU funding news briefings by Ullswater Investments.", body, themes)
    return out


def privacy(themes):
    body = hero("Legal", "Privacy policy", "How Ullswater Investments S.L. handles personal data on this website and on its subdomains.", crumbs("Privacy")) + f"""
<section class="band"><div class="wrap narrow prose">
<h2>Data controller</h2><p>Ullswater Investments S.L. (CIF B10740942), Calle Ramírez de Arellano 17, 28043 Madrid, Spain. Contact: <a href="mailto:{C.EMAIL}">{C.EMAIL}</a>.</p>
<h2>What we collect and why</h2><ul>
<li><b>Contact and meetings.</b> When you email us or book a meeting we use your name, email and message to reply and to provide our services (legal basis: your request and our legitimate interest in answering it).</li>
<li><b>Email alerts.</b> If you subscribe on calls.ullswaterinvestments.com we store your email and keywords to send the weekly digest. Subscriptions are confirmed by double opt-in and you can unsubscribe at any time from any email (legal basis: consent).</li>
<li><b>Partner board and directory.</b> Requests and profiles you submit are reviewed by us before publication. Only the organisation details you agree to publish are shown; your email is never published and contact goes through us (legal basis: consent).</li>
<li><b>AI pre-check and assistant.</b> Text you type is sent to an AI model run on Cloudflare Workers AI to generate the answer. Do not include confidential or personal data. We use the text only to produce the response.</li>
</ul>
<h2>Processors</h2><p>Google (Workspace: Forms, Sheets, Gmail), Cloudflare (DNS, security and AI inference) and GitHub (website hosting) process data on our behalf under their data processing terms.</p>
<h2>Retention</h2><p>We keep data for as long as needed for the purpose for which it was collected, or until you withdraw consent or ask us to delete it.</p>
<h2>Your rights</h2><p>You can request access, rectification, erasure, restriction, portability or object to processing by writing to <a href="mailto:{C.EMAIL}">{C.EMAIL}</a>. You may also lodge a complaint with the Spanish Data Protection Agency (<a href="https://www.aepd.es/" rel="noopener">AEPD</a>).</p>
<h2>Cookies</h2><p>This website does not use advertising or tracking cookies. Fonts are loaded from Google Fonts.</p>
<p style="color:var(--muted);font-size:14px">Last updated: {fmt(date.today().isoformat())}</p></div></section>"""
    return page("/privacy/", "Privacy policy | Ullswater Investments", "Privacy policy of Ullswater Investments S.L.", body, themes)


def legal(themes):
    body = hero("Legal", "Legal notice", "Information required by Spanish Law 34/2002 on information society services (LSSI).", crumbs("Legal notice")) + f"""
<section class="band"><div class="wrap narrow"><dl class="facts"><dt>Owner</dt><dd>Ullswater Investments S.L.</dd><dt>CIF</dt><dd>B10740942</dd><dt>Address</dt><dd>Calle Ramírez de Arellano 17, 28043 Madrid, Spain</dd>
<dt>Email</dt><dd><a href="mailto:{C.EMAIL}">{C.EMAIL}</a></dd></dl>
<div class="prose" style="margin-top:28px"><p>Information on EU calls, news and events is compiled from official sources and is provided for guidance only. Always check the official call documents before applying.
Links to third-party websites are provided for convenience; we are not responsible for their content.</p></div></div></section>"""
    return page("/legal/", "Legal notice | Ullswater Investments", "Legal notice of Ullswater Investments S.L.", body, themes)


def redirect_stub(target):
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="{escape(target if target.startswith('http') else BASE + target)}">
<meta http-equiv="refresh" content="0;url={escape(target)}"><script>location.replace({json.dumps(target)}+location.search+location.hash)</script></head>
<body><p>This page has moved to <a href="{escape(target)}">{escape(target)}</a>.</p></body></html>"""


def main():
    live = load_live()
    themes = live.get("themes", [])
    redirects = dict(REDIRECTS)
    for t in themes:
        if t.get("old"):
            redirects[t["old"]] = f"{C.CALLS}/theme/{t['slug']}/"
    if SITE.exists():
        shutil.rmtree(SITE)
    (SITE / "assets").mkdir(parents=True)
    (SITE / "assets" / "site.css").write_text(CSS, encoding="utf-8")
    (SITE / "assets" / "site.js").write_text(JS, encoding="utf-8")
    (SITE / "favicon.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#233567"/><text x="32" y="45" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="36" text-anchor="middle" fill="#c9a646">U</text></svg>', encoding="utf-8")
    pages = {"/": home(live, themes), "/investment-readiness/": investment_readiness(themes), "/eu-fund-matching/": fund_matching(themes),
             "/strategic-positioning/": strategic_positioning(themes), "/about/": about(themes), "/courses/": courses(themes),
             "/privacy/": privacy(themes), "/legal/": legal(themes)}
    pages.update(archive_pages(themes))
    for path, html_ in pages.items():
        d = SITE / path.strip("/")
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(html_, encoding="utf-8")
    for old, new in redirects.items():
        d = SITE / old.strip("/")
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(redirect_stub(new), encoding="utf-8")
    (SITE / "404.html").write_text(page("/404.html", "Page not found | Ullswater Investments", "Page not found.",
        hero("404", "Page not found", "The page you are looking for has moved or no longer exists.", actions=f'<a class="btn" href="/">Home</a><a class="btn ghost" href="{C.CALLS}/">Open EU calls</a>'), themes), encoding="utf-8")
    today = date.today().isoformat()
    urls = [p for p in pages]
    (SITE / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + "".join(f"<url><loc>{BASE}{u}</loc><lastmod>{today}</lastmod></url>" for u in urls) + "</urlset>\n", encoding="utf-8")
    (SITE / "robots.txt").write_text("User-agent: *\nDisallow: /\n" if STAGING else
        f"User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\nSitemap: {C.CALLS}/sitemap.xml\n", encoding="utf-8")
    (SITE / "llms.txt").write_text(f"""# Ullswater Investments · EU Funding Advisors

> Madrid-based European funding advisory firm (Ullswater Investments S.L.). We match projects with EU grants, EIB loans and EIF-backed venture capital, build consortia and write Horizon Europe, EIC and Digital Europe proposals.

## Services
- [Investment Readiness]({BASE}/investment-readiness/)
- [EU Fund Matching]({BASE}/eu-fund-matching/)
- [Strategic Positioning]({BASE}/strategic-positioning/)
- [Executive Programme in EU Funding for Defence and Dual-Use]({BASE}/courses/)
- [About and company facts]({BASE}/about/)

## Live data
- [Open EU funding calls, updated daily]({C.CALLS}/) · [JSON]({C.CALLS}/data/calls.json)
- [EU Funding News]({C.NEWS}/) · [RSS]({C.NEWS}/feed.xml)
- [EU Funding Events]({C.EVENTS}/)
""", encoding="utf-8")
    (SITE / "CNAME").write_text("new.ullswaterinvestments.com\n" if STAGING else "www.ullswaterinvestments.com\n", encoding="utf-8")
    (SITE / ".nojekyll").write_text("", encoding="utf-8")
    with open(ROOT / "redirects.csv", "w", encoding="utf-8") as f:
        f.write("source,target,status\n")
        for old, new in sorted(redirects.items()):
            f.write(f"www.ullswaterinvestments.com{old},{new if new.startswith('http') else BASE + new},301\n")
    print(f"Built {len(pages)} pages and {len(redirects)} redirects (staging={STAGING})")


if __name__ == "__main__":
    main()
