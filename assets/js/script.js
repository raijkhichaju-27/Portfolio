(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  function clearHashFromUrl() {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (el) {
    el.addEventListener("click", function (e) {
      var href = el.getAttribute("href");
      if (!href) return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      clearHashFromUrl();
    });
  });

  if (window.location.hash) {
    var initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      requestAnimationFrame(function () {
        initialTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        clearHashFromUrl();
      });
    }
  }

  document.querySelectorAll('.to-top, a.logo[href="#"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("href") === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  /** Minimal cursor dot + soft lagging ring — disabled on touch & reduced motion */
  (function cursorFollower() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (reduce || !finePointer) return;

    var wrap = document.createElement("div");
    wrap.className = "cursor-followers is-hidden";
    wrap.setAttribute("aria-hidden", "true");
    var ring = document.createElement("div");
    ring.className = "cursor-follow__ring";
    var dot = document.createElement("div");
    dot.className = "cursor-follow__dot";
    wrap.appendChild(ring);
    wrap.appendChild(dot);
    document.body.appendChild(wrap);

    var dotX = -100;
    var dotY = -100;
    var ringX = -100;
    var ringY = -100;
    var targetX = -100;
    var targetY = -100;
    var overInteractive = false;

    function isInteractiveTarget(el) {
      if (!el || el === document.body) return false;
      return !!el.closest(
        "a, button, input, textarea, select, label, [role='button'], .btn, .nav-toggle, .project-link, .contact-big"
      );
    }

    window.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        dotX = targetX;
        dotY = targetY;
        overInteractive = isInteractiveTarget(
          document.elementFromPoint(e.clientX, e.clientY)
        );
        wrap.classList.remove("is-hidden");
      },
      { passive: true }
    );

    document.documentElement.addEventListener("mouseleave", function () {
      wrap.classList.add("is-hidden");
    });

    function tick() {
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;

      var ringScale = overInteractive ? 1.22 : 1;
      var dotScale = overInteractive ? 1.35 : 1;

      dot.style.opacity = "";
      dot.style.transform =
        "translate3d(" +
        dotX +
        "px," +
        dotY +
        "px,0) scale(" +
        dotScale +
        ")";
      ring.style.borderColor = overInteractive
        ? "rgba(238, 155, 0, 0.55)"
        : "rgba(148, 210, 189, 0.45)";
      ring.style.transform =
        "translate3d(" +
        ringX +
        "px," +
        ringY +
        "px,0) scale(" +
        ringScale +
        ")";

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  })();
})();
