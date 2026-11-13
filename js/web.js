/* ==========================================================================
   TECNOVA WEB — carruseles de vistas dentro del portfolio
   Las rutas de cada proyecto se editan en el atributo data-images de cada card.
   ========================================================================== */
(function () {
  "use strict";

  const FALLBACK_IMAGE = "assets/tecnovaWeb.png";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initTestimonials() {
    const root = document.querySelector("[data-testimonials]");
    if (!root) return;

    const track = root.querySelector("[data-testimonials-track]");
    const dots = root.querySelector("[data-testimonials-dots]");
    const prev = root.querySelector("[data-testimonials-prev]");
    const next = root.querySelector("[data-testimonials-next]");
    const slides = Array.from(root.querySelectorAll(".testimonial-card"));
    let active = 0;
    let timer = null;
    let isPaused = false;
    let isVisible = true;

    root.querySelectorAll("[data-testimonial-photo]").forEach(function (image) {
      image.addEventListener("load", function () { image.parentElement.classList.add("is-loaded"); });
      if (image.complete && image.naturalWidth > 0) image.parentElement.classList.add("is-loaded");
    });

    slides.forEach(function (slide, index) {
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

      const dot = document.createElement("button");
      dot.className = "testimonials__dot" + (index === 0 ? " is-active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", "Ver testimonio " + (index + 1));
      dot.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      dot.addEventListener("click", function () {
        goTo(index);
        restart();
      });
      dots.appendChild(dot);
    });

    const dotButtons = Array.from(dots.querySelectorAll(".testimonials__dot"));

    function goTo(index) {
      active = (index + slides.length) % slides.length;
      track.style.transform = "translate3d(-" + (active * 100) + "%, 0, 0)";
      slides.forEach(function (slide, slideIndex) {
        slide.setAttribute("aria-hidden", slideIndex === active ? "false" : "true");
      });
      dotButtons.forEach(function (dot, dotIndex) {
        const selected = dotIndex === active;
        dot.classList.toggle("is-active", selected);
        dot.setAttribute("aria-pressed", selected ? "true" : "false");
      });
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (prefersReduced || slides.length < 2 || isPaused || !isVisible) return;
      timer = window.setInterval(function () { goTo(active + 1); }, 6000);
    }

    function restart() { start(); }

    prev.addEventListener("click", function () {
      goTo(active - 1);
      restart();
    });
    next.addEventListener("click", function () {
      goTo(active + 1);
      restart();
    });
    root.addEventListener("mouseenter", function () { isPaused = true; stop(); });
    root.addEventListener("mouseleave", function () { isPaused = false; start(); });
    root.addEventListener("focusin", function () { isPaused = true; stop(); });
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) {
        isPaused = false;
        start();
      }
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible) start(); else stop();
      }, { threshold: 0.15 });
      observer.observe(root);
    } else {
      start();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-web-carousel]").forEach(function (carousel) {
      const track = carousel.querySelector("[data-web-track]");
      const dots = carousel.querySelector("[data-web-dots]");
      const counter = carousel.querySelector("[data-web-counter]");
      const title = carousel.closest(".web-card").querySelector(".web-card__title").textContent.trim();
      const images = (carousel.getAttribute("data-images") || "")
        .split("|")
        .map(function (path) { return path.trim(); })
        .filter(Boolean);
      const paths = images.length ? images : [FALLBACK_IMAGE];
      let active = 0;
      let timer = null;
      let isPaused = false;
      let isVisible = true;

      track.innerHTML = "";
      dots.innerHTML = "";

      paths.forEach(function (path, index) {
        const slide = document.createElement("figure");
        slide.className = "web-carousel__slide" + (index === 0 ? " is-active" : "");
        slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

        const image = document.createElement("img");
        image.src = path;
        image.alt = title + " — vista " + (index + 1);
        image.width = 1200;
        image.height = 750;
        image.loading = index === 0 ? "eager" : "lazy";
        image.addEventListener("error", function () {
          if (image.dataset.fallbackApplied) return;
          image.dataset.fallbackApplied = "true";
          image.src = FALLBACK_IMAGE;
        });
        slide.appendChild(image);
        track.appendChild(slide);

        const dot = document.createElement("button");
        dot.className = "web-carousel__dot" + (index === 0 ? " is-active" : "");
        dot.type = "button";
        dot.setAttribute("aria-label", "Ver vista " + (index + 1) + " de " + title);
        dot.setAttribute("aria-pressed", index === 0 ? "true" : "false");
        dot.addEventListener("click", function () {
          show(index);
          restart();
        });
        dots.appendChild(dot);
      });

      const slides = Array.from(track.querySelectorAll(".web-carousel__slide"));
      const dotButtons = Array.from(dots.querySelectorAll(".web-carousel__dot"));

      function show(index) {
        active = (index + paths.length) % paths.length;
        slides.forEach(function (slide, slideIndex) {
          const selected = slideIndex === active;
          slide.classList.toggle("is-active", selected);
          slide.setAttribute("aria-hidden", selected ? "false" : "true");
        });
        dotButtons.forEach(function (dot, dotIndex) {
          const selected = dotIndex === active;
          dot.classList.toggle("is-active", selected);
          dot.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        if (counter) counter.textContent = String(active + 1).padStart(2, "0") + " / " + String(paths.length).padStart(2, "0");
      }

      function stop() {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
      }

      function start() {
        stop();
        if (prefersReduced || paths.length < 2 || isPaused || !isVisible) return;
        timer = window.setInterval(function () { show(active + 1); }, 4200);
      }

      function restart() { start(); }

      carousel.addEventListener("mouseenter", function () { isPaused = true; stop(); });
      carousel.addEventListener("mouseleave", function () { isPaused = false; start(); });
      carousel.addEventListener("focusin", function () { isPaused = true; stop(); });
      carousel.addEventListener("focusout", function (event) {
        if (!carousel.contains(event.relatedTarget)) {
          isPaused = false;
          start();
        }
      });

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
          isVisible = entries[0].isIntersecting;
          if (isVisible) start(); else stop();
        }, { threshold: 0.15 });
        observer.observe(carousel);
      } else {
        start();
      }

      show(0);
    });

    initTestimonials();
  });
})();
