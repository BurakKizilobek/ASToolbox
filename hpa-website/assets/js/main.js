/* HPA Teknoloji — etkileşimler (bağımlılık yok) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Header: kaydırınca katı zemin, aşağı kaydırınca gizlen --- */
  var header = document.querySelector(".site-header");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (!header) return;
    header.classList.toggle("is-scrolled", y > 24);
    var hide = y > 400 && y > lastY && !doc.classList.contains("menu-open") && !header.contains(document.activeElement);
    header.classList.toggle("is-hidden", hide);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobil menü --- */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = doc.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.classList.contains("menu-open")) toggle.click();
    });
    document.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () { if (doc.classList.contains("menu-open")) toggle.click(); });
    });
  }

  /* --- Açılır menüler: klavye ile Escape kapatma --- */
  document.querySelectorAll(".nav__item").forEach(function (item) {
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { var l = item.querySelector(".nav__link"); if (l) l.focus(); item.blur(); document.activeElement.blur(); }
    });
  });

  /* --- Hero ürün sahnesi --- */
  var stage = document.querySelector("[data-stage]");
  if (stage) {
    var slides = stage.querySelectorAll(".stage__slide");
    var dots = stage.querySelectorAll(".stage__dot");
    var brandEl = stage.querySelector(".stage__brand");
    var catEl = stage.querySelector(".stage__cat");
    var countEl = stage.querySelector(".stage__count b");
    var i = 0, timer = null;
    function go(n) {
      slides[i].classList.remove("is-active");
      dots[i].removeAttribute("aria-current");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      dots[i].setAttribute("aria-current", "true");
      brandEl.textContent = slides[i].dataset.brand;
      catEl.textContent = slides[i].dataset.cat;
      countEl.textContent = String(i + 1).padStart(2, "0");
    }
    function play() { if (!reduceMotion) { stop(); timer = setInterval(function () { go(i + 1); }, 4800); } }
    function stop() { clearInterval(timer); }
    dots.forEach(function (d, n) { d.addEventListener("click", function () { go(n); play(); }); });
    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : play(); });
    play();
  }

  /* --- Sayaçlar --- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (reduceMotion) { el.firstChild.nodeValue = target; return; }
    var start = null, dur = 1400;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.firstChild.nodeValue = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* --- Görünme animasyonları --- */
  var revealEls = document.querySelectorAll(".reveal, [data-count]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.dataset.count) countUp(el); else el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --- İletişim formu: e-posta istemcisi ile gönderim (statik site) --- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var params = new URLSearchParams(location.search);
    var konu = params.get("konu");
    if (konu && form.konu) form.konu.value = konu;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var body = [
        "Ad Soyad: " + f.ad.value,
        "Firma: " + (f.firma.value || "-"),
        "E-posta: " + f.eposta.value,
        "Telefon: " + (f.telefon.value || "-"),
        "",
        f.mesaj.value
      ].join("\n");
      var subject = "Web sitesi talebi — " + f.konu.value;
      location.href = "mailto:info@hpa.com.tr?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      form.querySelector(".form__status").textContent = "E-posta uygulamanız açılıyor…";
    });
  }

  /* --- Yıl --- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
