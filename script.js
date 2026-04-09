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

  document.querySelectorAll('.to-top, a.logo[href="#"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("href") === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
})();
