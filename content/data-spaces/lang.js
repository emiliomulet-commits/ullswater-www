(function () {
  var KEY = "dataspaces-lang";
  function get() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "es") return q;
    if (/^\/es\//.test(location.pathname)) return "es";
    try { var v = localStorage.getItem(KEY); if (v === "en" || v === "es") return v; } catch (e) {}
    return (navigator.language || "").slice(0, 2) === "es" ? "es" : "en"; /* English by default; Spanish only when the visitor selects it */
  }
  function set(l) {
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l);
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.l === l ? "true" : "false");
    });
    var t = document.querySelector("meta[name='title-" + l + "']");
    if (t) document.title = t.content;
    try { localStorage.setItem(KEY, l); } catch (e) {}
  }
  set(get());
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button");
    if (b) set(b.dataset.l);
  });
})();
