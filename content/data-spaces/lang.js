(function () {
  /* EN/ES in one page. The default language is decided by the shared rule in the <head> (window.ULANG:
     the visitor's own EN/ES choice across all Ullswater sites first, then country: Spain and Spanish-speaking
     Latin America -> Spanish, anywhere else -> English). This file only paints the buttons and the title. */
  var html = document.documentElement;
  function get() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "es") return q;
    if (window.ULANG && window.ULANG.lang) return window.ULANG.lang;
    return html.getAttribute("data-lang") === "es" ? "es" : "en";
  }
  function set(l) {
    html.setAttribute("data-lang", l);
    html.setAttribute("lang", l);
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.l === l ? "true" : "false");
    });
    var t = document.querySelector("meta[name='title-" + l + "']");
    if (t) document.title = t.content;
  }
  set(get());
  document.addEventListener("ulang:change", function (e) { set(e.detail); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button");
    if (b) { set(b.dataset.l); if (window.ULANG) window.ULANG.save(b.dataset.l); }
  });
})();
