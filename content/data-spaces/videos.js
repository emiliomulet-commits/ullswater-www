/* Data Spaces · reproductor de la serie (YouTube sin cookies hasta pulsar), barra de lectura, aparición al hacer scroll, menú activo */
(function () {
  var modal = document.getElementById("vmodal");
  var frame = modal.querySelector(".vframe"), cap = modal.querySelector(".vcap"), last = null;
  function lang() { return document.documentElement.getAttribute("data-lang") || "en"; }
  function open(btn) {
    last = btn;
    var id = btn.getAttribute("data-yt"), n = btn.getAttribute("data-n");
    var title = btn.getAttribute("data-title-" + lang());
    frame.innerHTML = "";
    if (id) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&hl=" + lang();
      f.title = title; f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
      frame.appendChild(f);
    } else {
      var s = document.createElement("div"); s.className = "vsoon";
      s.style.backgroundImage = "linear-gradient(rgba(7,24,48,.75),rgba(7,24,48,.75)),url(img/v" + n + ".jpg)";
      s.textContent = lang() === "es" ? "Vídeo disponible muy pronto" : "Video available very soon";
      frame.appendChild(s);
    }
    cap.textContent = n + "/10 · " + title;
    modal.hidden = false; document.body.style.overflow = "hidden";
    modal.querySelector(".vclose").focus();
  }
  function close() {
    modal.hidden = true; frame.innerHTML = ""; document.body.style.overflow = "";
    if (last) last.focus();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".vcard,.vchip");
    if (b) { e.preventDefault(); open(b); return; }
    if (e.target === modal || e.target.closest(".vclose")) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) close(); });
  var h = location.hash.match(/^#video-(\d\d)$/);
  if (h) { var b = document.querySelector('.vcard[data-n="' + h[1] + '"]'); if (b) setTimeout(function () { open(b); }, 300); }

  /* barra de lectura */
  var bar = document.createElement("div"); bar.className = "readbar"; document.body.appendChild(bar);
  function onScroll() {
    var d = document.documentElement, p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
    bar.style.width = (p * 100).toFixed(2) + "%";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* aparición y menú activo */
  if ("IntersectionObserver" in window) {
    var sel = "section h2, .card, .vcard, .vchip, .kpi, .fine, .feat, .tl-col, .diagram-fig";
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    els.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
    var links = document.querySelectorAll("nav.main .links a");
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + x.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { so.observe(s); });
  }
  /* sin vídeo de fondo si el usuario ahorra datos */
  var c = navigator.connection; var hv = document.querySelector(".hero-bg");
  if (hv && c && (c.saveData || /2g/.test(c.effectiveType || ""))) hv.removeAttribute("autoplay"), hv.pause && hv.pause();
})();
