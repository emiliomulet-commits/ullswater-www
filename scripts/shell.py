"""Shared site shell for the subdomains (tenders.ullswaterinvestments.com, built in the ullswater-calls repo).

After the build, write site/assets/shell.json with the header and footer of www (EN and ES, links made absolute),
the www CSS scoped under the wrapper class .uw (so it cannot clash with the subdomain's own CSS) and the menu JS.
A subdomain wraps the header in <div class="uw">…</div> (same for the footer) and puts its own EN/ES switch where
the header has <!--LANG-->. Header and footer then look and behave exactly like www, and change when www changes.
"""
import json
import re

SCOPE = ".uw"


def _split_rules(css):
    """Top-level CSS blocks as (prelude, body) pairs; body of @media is returned unparsed."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == "{":
                depth += 1
            elif css[k] == "}":
                depth -= 1
            k += 1
        out.append((prelude, css[j + 1:k - 1]))
        i = k
    return out


def _scope_selector(sel):
    sel = sel.strip()
    if not sel:
        return sel
    if sel in (":root", "html", "body", "*"):
        return SCOPE if sel != "*" else f"{SCOPE},{SCOPE} *"
    sel = re.sub(r"^(html|body)\b\s*", "", sel)
    if sel.startswith("html.") or sel.startswith("html["):  # html.uaa-hero … : state classes of the www home only
        return None
    return f"{SCOPE} {sel}" if sel else SCOPE


def scope_css(css):
    out = []
    for prelude, body in _split_rules(css):
        if prelude.startswith("@font-face") or prelude.startswith("@keyframes"):
            continue
        if prelude.startswith("@media") or prelude.startswith("@supports"):
            inner = scope_css(body)
            if inner:
                out.append(f"{prelude}{{{inner}}}")
            continue
        sels = [s for s in (_scope_selector(x) for x in prelude.split(",")) if s]
        if sels:
            out.append(f"{','.join(sels)}{{{body}}}")
    return "".join(out)


def _absolute(html, base):
    html = re.sub(r'(href|src|data-es-href)="/(?!/)', lambda m: f'{m.group(1)}="{base}/', html)
    return re.sub(r'<nav [^>]*class="lang"[^>]*>.*?</nav>', "<!--LANG-->", html, flags=re.S)


def _part(page_html, tag):
    m = re.search(rf'<{tag} class="site">.*?</{tag}>', page_html, re.S)
    return m.group(0) if m else ""


def write_shell(site_dir, base, css, js):
    en = (site_dir / "index.html").read_text(encoding="utf-8")
    es = (site_dir / "es" / "index.html").read_text(encoding="utf-8")
    menu_js = js.split("\n(function(){var es=")[0]  # burger, dropdowns, Escape and click-outside; not the home-page AI hero code
    shell = {
        "css": scope_css(css),
        "js": menu_js,
        "en": {"header": _absolute(_part(en, "header"), base), "footer": _absolute(_part(en, "footer"), base)},
        "es": {"header": _absolute(_part(es, "header"), base), "footer": _absolute(_part(es, "footer"), base)},
    }
    for lang in ("en", "es"):
        assert "<!--LANG-->" in shell[lang]["header"] and shell[lang]["footer"], f"shell: header or footer missing ({lang})"
    (site_dir / "assets" / "shell.json").write_text(json.dumps(shell, ensure_ascii=False), encoding="utf-8")
    return len(json.dumps(shell))
