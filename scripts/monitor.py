#!/usr/bin/env python3
"""Daily health check of the Ullswater sites for search engines and AI assistants.
Exit code 0 = all good. Writes reports/monitor.md and prints the problems.
--repair-hint prints 'REBUILD' when a www rebuild should fix the problem."""
import json, sys, urllib.request
from datetime import datetime, timezone, timedelta

BOTS = ["Googlebot", "Google-Extended", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User",
        "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot"]
UA = "Mozilla/5.0 (compatible; UllswaterMonitor/1.0; +https://www.ullswaterinvestments.com/)"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, r.read().decode("utf-8", "replace"), r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, "", url
    except Exception as e:
        return 0, str(e), url


def robots_blocks(txt):
    """Return the bots that robots.txt disallows at the root (standard group parsing)."""
    groups, cur, had_rules = {}, [], False
    for line in txt.splitlines():
        line = line.split("#")[0].strip()
        if ":" not in line:
            continue
        k, v = [x.strip() for x in line.split(":", 1)]
        k = k.lower()
        if k == "user-agent":
            if had_rules:
                cur, had_rules = [], False
            cur.append(v.lower())
            groups.setdefault(v.lower(), [])
        elif k in ("allow", "disallow") and cur:
            had_rules = True
            for ua in cur:
                groups[ua].append((k, v))
    blocked = set()
    for b in BOTS:
        rules = groups.get(b.lower(), groups.get("*", []))
        if ("disallow", "/") in rules and ("allow", "/") not in rules:
            blocked.add(b)
    return blocked


def main():
    problems, rebuild = [], False
    for host in ["https://www.ullswaterinvestments.com", "https://calls.ullswaterinvestments.com",
                 "https://news.ullswaterinvestments.com", "https://events.ullswaterinvestments.com"]:
        st, body, _ = get(host + "/")
        if st != 200:
            problems.append(f"{host}/ responds {st}")
            continue
        if 'name="robots" content="noindex' in body or "content=\"noindex" in body:
            problems.append(f"{host}/ has noindex"); rebuild |= "www." in host
        st, rb, _ = get(host + "/robots.txt")
        if st != 200:
            problems.append(f"{host}/robots.txt responds {st}"); rebuild |= "www." in host
        else:
            bl = robots_blocks(rb)
            if bl:
                problems.append(f"{host}/robots.txt blocks {', '.join(sorted(bl))}"); rebuild |= "www." in host
        st, _, _ = get(host + "/sitemap.xml")
        if st != 200:
            problems.append(f"{host}/sitemap.xml responds {st}"); rebuild |= "www." in host
    for host in ["https://www.ullswaterinvestments.com", "https://calls.ullswaterinvestments.com"]:
        st, _, _ = get(host + "/llms.txt")
        if st != 200:
            problems.append(f"{host}/llms.txt responds {st}"); rebuild |= "www." in host
    for p in ["/about/", "/eu-fund-matching/", "/investment-readiness/", "/guides/"]:
        st, _, _ = get("https://www.ullswaterinvestments.com" + p)
        if st != 200:
            problems.append(f"www{p} responds {st}"); rebuild = True
    st, _, final = get("https://ullswaterinvestments.com/about/")
    if st != 200 or not final.startswith("https://www.ullswaterinvestments.com/"):
        problems.append(f"apex redirect to www not working ({st} {final})")
    st, body, _ = get("https://calls.ullswaterinvestments.com/data/stats.json")
    try:
        upd = datetime.fromisoformat(json.loads(body)["updated"])
        if datetime.now(timezone.utc) - upd > timedelta(hours=36):
            problems.append(f"calls data is stale (updated {upd:%Y-%m-%d %H:%M} UTC): check the ullswater-calls workflow")
    except Exception:
        problems.append("calls stats.json unreadable")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    with open("reports/monitor.md", "w", encoding="utf-8") as f:
        f.write(f"# Site health check — {now}\n\n" + ("All checks passed ✅\n" if not problems else "\n".join(f"- ⚠️ {p}" for p in problems) + "\n"))
    print("\n".join(problems) or "All checks passed")
    if rebuild:
        print("REBUILD")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
