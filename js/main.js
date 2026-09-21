/* ==========================================================================
   TECNOVA — js/main.js
   Configuración global + componentes comunes (header, carruseles, reveal,
   contadores, acordeón, formulario) + lógica de index.html
   ========================================================================== */
(function () {
  "use strict";

  /* ======================================================================
     1. CONFIGURACIÓN — editá solo este bloque para personalizar el sitio
     ====================================================================== */
  const CONFIG = {
    empresa: "Tecnova",
    eslogan: "Tecnología que resuelve",
    /* Número de WhatsApp en formato internacional, SIN + ni espacios */
    whatsapp: "5493624216834",
    telefonoVisible: "+54 9 362 421-6834",
    email: "tecnovachaco@gmail.com",
    direccion: "Av. Soberanía Nacional 2555, Resistencia, Chaco, Argentina",
    horarios: [
      { dia: "Lunes a viernes", horas: "9:00 a 19:00" },
      { dia: "Sábados", horas: "10:00 a 14:00" },
      { dia: "Domingos y feriados", horas: "Cerrado" }
    ],
    redes: {
      instagram: "https://www.instagram.com/tecnovachaco/",
      facebook: "https://www.facebook.com/profile.php?id=61594460734940",
      tiktok: "https://www.tiktok.com/@tecnovachaco"
    },
    /* Reemplazá el src del iframe del mapa en index.html por el de tu negocio */
    /* Mensajes prellenados de WhatsApp por contexto */
    mensajes: {
      general: "¡Hola Tecnova! Quisiera hacer una consulta sobre sus servicios.",
      presupuesto: "¡Hola Tecnova! Quisiera pedir un presupuesto, ¿me ayudan?",
      mobile: "¡Hola Tecnova! Necesito consultar por una reparación o un celular (Tecnova Mobile).",
      pc: "¡Hola Tecnova! Necesito consultar por soporte o reparación de PC (Tecnova PC).",
      store: "¡Hola Tecnova! Quisiera consultar por productos de la tienda (Tecnova Store).",
      web: "¡Hola Tecnova! Quiero una landing page para mi negocio (Tecnova Web)."
    }
  };

  /* ======================================================================
     2. UTILIDADES
     ====================================================================== */
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Devuelve el enlace de WhatsApp con mensaje prellenado */
  function waLink(mensaje) {
    const texto = mensaje || CONFIG.mensajes.general;
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  /** Formatea un precio en pesos argentinos */
  function formatPrice(valor) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }).format(valor);
  }

  /** Calcula el porcentaje de descuento de un producto */
  function descuento(p) {
    if (!p.precioAnterior || p.precioAnterior <= p.precio) return 0;
    return Math.round((1 - p.precio / p.precioAnterior) * 100);
  }

  /**
   * HTML de una tarjeta de producto (compartido por el carrusel de index
   * y por la grilla de store.html para no duplicar código).
   */
  function productCardHTML(p, opciones) {
    const opt = opciones || {};
    const off = descuento(p);
    const mensaje = "¡Hola Tecnova! Quiero consultar por: " + p.nombre + " (" + p.categoria + ").";
    return (
      '<article class="product">' +
        '<div class="product__media">' +
          '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy" width="640" height="480">' +
          '<div class="product__badges">' +
            (off > 0 ? '<span class="badge badge--offer">-' + off + '% OFF</span>' : "") +
            (opt.badge ? '<span class="badge badge--soft">' + opt.badge + "</span>" : "") +
          "</div>" +
        "</div>" +
        '<div class="product__body">' +
          '<span class="product__category">' + p.categoria + "</span>" +
          '<h3 class="product__name">' + p.nombre + "</h3>" +
          '<p class="product__desc">' + p.descripcion + "</p>" +
          '<div class="product__prices">' +
            '<span class="product__price">' + formatPrice(p.precio) + "</span>" +
            (p.precioAnterior ? '<span class="product__price--old">' + formatPrice(p.precioAnterior) + "</span>" : "") +
          "</div>" +
          '<div class="product__actions">' +
            '<a class="btn btn--primary btn--sm btn--block" href="' + waLink(mensaje) + '" target="_blank" rel="noopener">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ' + (opt.buttonLabel || "Consultar") +
            "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* Exponemos utilidades para store.js */
  window.Tecnova = { CONFIG: CONFIG, qs: qs, qsa: qsa, waLink: waLink, formatPrice: formatPrice, productCardHTML: productCardHTML, prefersReduced: prefersReduced };

  /* ======================================================================
     3. ENLACES DE WHATSAPP Y DATOS DE CONFIGURACIÓN EN EL DOM
     ====================================================================== */
  function initWhatsappLinks() {
    qsa("[data-wa]").forEach(function (el) {
      const clave = el.getAttribute("data-wa");
      const msg = el.getAttribute("data-wa-msg") || CONFIG.mensajes[clave] || CONFIG.mensajes.general;
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /** Rellena [data-config="email|direccion|telefono"] con los datos del CONFIG */
  function initConfigBindings() {
    qsa("[data-config]").forEach(function (el) {
      const campo = el.getAttribute("data-config");
      if (campo === "email") { el.textContent = CONFIG.email; el.href = "mailto:" + CONFIG.email; }
      if (campo === "direccion") { el.textContent = CONFIG.direccion; }
      if (campo === "telefono") { el.textContent = CONFIG.telefonoVisible; el.href = waLink(CONFIG.mensajes.general); }
    });
    /* Horarios */
    const cont = qs("[data-horarios]");
    if (cont) {
      cont.innerHTML = CONFIG.horarios.map(function (h) {
        return "<li><strong>" + h.dia + "</strong><span>" + h.horas + "</span></li>";
      }).join("");
    }
    /* Redes sociales */
    qsa("[data-social]").forEach(function (el) {
      const red = el.getAttribute("data-social");
      if (red === "whatsapp") { el.href = waLink(CONFIG.mensajes.general); return; }
      if (CONFIG.redes[red]) el.href = CONFIG.redes[red];
    });
  }

  /* ======================================================================
     4. LOGO — fallback con el isotipo TN si falta el archivo de marca
     ====================================================================== */
  function initLogoFallback() {
    qsa("img[data-logo]").forEach(function (img) {
      const mostrarFallback = function () {
        const hermano = img.nextElementSibling;
        img.hidden = true;
        if (hermano && hermano.classList.contains("brand__fallback")) hermano.hidden = false;
      };
      img.addEventListener("error", mostrarFallback);
      if (img.complete && img.naturalWidth === 0) mostrarFallback();
    });
  }

  /* ======================================================================
     5. HEADER: fondo sólido al hacer scroll + menú móvil + scrollspy
     ====================================================================== */
  function initHeader() {
    const header = qs("#header");
    if (!header) return;

    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Menú hamburguesa */
    const toggle = qs("#navToggle");
    const nav = qs("#nav");
    if (!toggle || !nav) return;

    const cerrar = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };

    toggle.addEventListener("click", function () {
      const abierto = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    /* Cierra al hacer clic en un enlace y con la tecla Escape */
    qsa(".nav__link", nav).forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });

    /* Scrollspy: marca el enlace de la sección visible */
    const enlaces = qsa(".nav__link");
    const secciones = enlaces
      .map(function (a) { return qs(a.getAttribute("href")); })
      .filter(Boolean);

    if (secciones.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          enlaces.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secciones.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ======================================================================
     6. CARRUSEL GENÉRICO (hero y ofertas lo reutilizan)
     ====================================================================== */
  function crearCarrusel(opciones) {
    const track = opciones.track;
    if (!track) return null;

    let indice = 0;
    let porVista = opciones.slidesPerView || 1;
    let total = 0;
    let timer = null;
    let dotsWrap = opciones.dots;
    let maxIndex = 0;

    function calcularPorVista() {
      if (typeof opciones.slidesPerView === "function") return opciones.slidesPerView();
      return opciones.slidesPerView || 1;
    }

    function pintarDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIndex; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "carousel-dot" + (i === indice ? " is-active" : "");
        b.setAttribute("aria-label", "Ir al grupo " + (i + 1) + " de " + (maxIndex + 1));
        b.addEventListener("click", function () { ir(i); });
        dotsWrap.appendChild(b);
      }
    }

    function actualizar() {
      track.style.transform = "translateX(-" + (indice * (100 / porVista)) + "%)";
      track.style.setProperty("--slides-per-view", porVista);
      if (dotsWrap) qsa(".carousel-dot", dotsWrap).forEach(function (d, i) {
        d.classList.toggle("is-active", i === indice);
      });
      if (opciones.onChange) opciones.onChange(indice);
    }

    function ir(i) {
      indice = Math.max(0, Math.min(i, maxIndex));
      actualizar();
    }

    function siguiente() { ir(indice >= maxIndex ? 0 : indice + 1); }
    function anterior() { ir(indice <= 0 ? maxIndex : indice - 1); }

    function refrescar() {
      total = track.children.length;
      porVista = calcularPorVista();
      maxIndex = Math.max(0, total - porVista);
      indice = Math.min(indice, maxIndex);
      pintarDots();
      actualizar();
    }

    /* Autoplay con pausa al pasar el mouse o al enfocar */
    function iniciarAutoplay() {
      if (!opciones.autoplay || prefersReduced) return;
      detenerAutoplay();
      timer = window.setInterval(siguiente, opciones.autoplay);
    }
    function detenerAutoplay() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    const zona = opciones.pauseZone || track;
    zona.addEventListener("mouseenter", detenerAutoplay);
    zona.addEventListener("mouseleave", iniciarAutoplay);
    zona.addEventListener("focusin", detenerAutoplay);
    zona.addEventListener("focusout", iniciarAutoplay);

    /* Flechas */
    if (opciones.prev) opciones.prev.addEventListener("click", function () { anterior(); iniciarAutoplay(); });
    if (opciones.next) opciones.next.addEventListener("click", function () { siguiente(); iniciarAutoplay(); });

    /* Swipe táctil */
    let x0 = null;
    zona.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    zona.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { dx < 0 ? siguiente() : anterior(); }
      x0 = null;
    }, { passive: true });

    /* Teclado */
    if (opciones.keyboardTarget) {
      opciones.keyboardTarget.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { siguiente(); }
        if (e.key === "ArrowLeft") { anterior(); }
      });
    }

    window.addEventListener("resize", refrescar);

    refrescar();
    iniciarAutoplay();

    return { refrescar: refrescar, ir: ir, siguiente: siguiente, anterior: anterior, detenerAutoplay: detenerAutoplay };
  }

  /* ======================================================================
     7. HERO CARRUSEL (4 slides, autoplay 5 s, flechas, dots, swipe)
     ====================================================================== */
  function initHero() {
    const hero = qs("[data-hero]");
    if (!hero) return;

    const slides = qsa(".hero__slide", hero);
    const dots = qs("[data-hero-dots]", hero);
    let indice = 0;
    let timer = null;

    function irA(i) {
      indice = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        const activo = k === indice;
        s.classList.toggle("is-active", activo);
        s.setAttribute("aria-hidden", String(!activo));
        /* Los enlaces del slide inactivo no deben ser tabulables */
        qsa("a, button", s).forEach(function (el) { el.tabIndex = activo ? 0 : -1; });
      });
      if (dots) qsa(".carousel-dot", dots).forEach(function (d, k) { d.classList.toggle("is-active", k === indice); });
    }

    /* Dots */
    if (dots) {
      dots.innerHTML = "";
      slides.forEach(function (_, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "carousel-dot";
        b.setAttribute("aria-label", "Ir al slide " + (i + 1));
        b.addEventListener("click", function () { irA(i); reiniciar(); });
        dots.appendChild(b);
      });
    }

    const siguiente = function () { irA(indice + 1); };
    const anterior = function () { irA(indice - 1); };

    function iniciar() {
      if (prefersReduced) return;
      detener();
      timer = window.setInterval(siguiente, 5000);
    }
    function detener() { if (timer) { window.clearInterval(timer); timer = null; } }
    function reiniciar() { detener(); iniciar(); }

    const btnPrev = qs("[data-hero-prev]", hero);
    const btnNext = qs("[data-hero-next]", hero);
    if (btnPrev) btnPrev.addEventListener("click", function () { anterior(); reiniciar(); });
    if (btnNext) btnNext.addEventListener("click", function () { siguiente(); reiniciar(); });

    /* Pausa al pasar el mouse */
    hero.addEventListener("mouseenter", detener);
    hero.addEventListener("mouseleave", iniciar);

    /* Swipe táctil */
    let x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) { dx < 0 ? siguiente() : anterior(); reiniciar(); }
      x0 = null;
    }, { passive: true });

    /* Teclado (el hero es focusable con tabindex="0") */
    hero.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { siguiente(); reiniciar(); }
      if (e.key === "ArrowLeft") { anterior(); reiniciar(); }
    });

    /* Pausa cuando la pestaña no está visible */
    document.addEventListener("visibilitychange", function () {
      document.hidden ? detener() : iniciar();
    });

    irA(0);
    iniciar();
  }

  /* ======================================================================
     8. CARRUSEL DE OFERTAS (index) — 6 productos en oferta desde products.js
     ====================================================================== */
  function initOfertas() {
    const track = qs("#offersTrack");
    if (!track || !window.TECNOVA_PRODUCTS) return;

    const ofertas = window.TECNOVA_PRODUCTS.filter(function (p) { return p.enOferta; }).slice(0, 6);

    /* Cada grupo de tarjetas es un "slide" según las tarjetas por vista */
    function tarjetasPorVista() {
      /* Dos cards en escritorio dejan más aire y mejor lectura del contenido. */
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    let carrusel = null;

    function construir() {
      const spv = tarjetasPorVista();
      track.innerHTML = "";
      /* Agrupamos de a `spv` tarjetas en cada item del track */
      for (let i = 0; i < ofertas.length; i += spv) {
        const li = document.createElement("li");
        li.className = "carousel__item";
        /* Cada grupo ocupa una vista completa; adentro se distribuyen las cards. */
        li.style.flexBasis = "100%";
        const fila = document.createElement("div");
        fila.className = "grid";
        fila.style.gridTemplateColumns = "repeat(" + spv + ", 1fr)";
        ofertas.slice(i, i + spv).forEach(function (p) {
          fila.insertAdjacentHTML("beforeend", productCardHTML(p, { buttonLabel: "Consultar", badge: p.categoria }));
        });
        li.appendChild(fila);
        track.appendChild(li);
      }
      if (carrusel) carrusel.refrescar();
    }

    construir();

    carrusel = crearCarrusel({
      track: track,
      slidesPerView: 1, /* cada item ya agrupa las tarjetas */
      dots: qs("[data-offers-dots]"),
      prev: qs("[data-offers-prev]"),
      next: qs("[data-offers-next]"),
      autoplay: 6000,
      pauseZone: qs("[data-offers]", document) || track
    });

    /* Reconstruimos al cambiar de breakpoint */
    let ultimoAncho = window.innerWidth;
    window.addEventListener("resize", function () {
      const spv = tarjetasPorVista();
      const cambióBreakpoint = (ultimoAncho >= 640) !== (window.innerWidth >= 640);
      if (cambióBreakpoint) { ultimoAncho = window.innerWidth; construir(); }
      else { ultimoAncho = window.innerWidth; }
      void spv;
    });
  }

  /* ======================================================================
     9. REVEAL AL SCROLL (IntersectionObserver)
     ====================================================================== */
  function initReveal() {
    const elementos = qsa(".reveal");
    if (!elementos.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      elementos.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elementos.forEach(function (el, i) {
      el.style.setProperty("--delay", (i % 4) * 90 + "ms");
      obs.observe(el);
    });
  }

  /* ======================================================================
     10. CONTADORES ANIMADOS
     ====================================================================== */
  function initCounters() {
    const contadores = qsa("[data-counter]");
    if (!contadores.length) return;

    function animar(el) {
      const objetivo = parseFloat(el.getAttribute("data-counter"));
      const sufijo = el.getAttribute("data-suffix") || "";
      const duracion = 1600;
      const inicio = performance.now();

      if (prefersReduced) { el.textContent = objetivo + sufijo; return; }

      function frame(ahora) {
        const t = Math.min((ahora - inicio) / duracion, 1);
        const suavizado = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
        const valor = Math.round(objetivo * suavizado);
        el.textContent = valor.toLocaleString("es-AR") + sufijo;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) { contadores.forEach(animar); return; }

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animar(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });

    contadores.forEach(function (c) { obs.observe(c); });
  }

  /* ======================================================================
     11. ACORDEÓN FAQ (un ítem abierto a la vez)
     ====================================================================== */
  function initAccordion() {
    const botones = qsa(".faq__question");
    if (!botones.length) return;

    botones.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".faq__item");
        const panel = qs(".faq__answer", item);
        const abierto = item.classList.contains("is-open");

        /* Cerramos todos */
        qsa(".faq__item").forEach(function (otro) {
          otro.classList.remove("is-open");
          qs(".faq__question", otro).setAttribute("aria-expanded", "false");
          qs(".faq__answer", otro).style.maxHeight = null;
        });

        /* Abrimos el clickeado si estaba cerrado */
        if (!abierto) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    /* Recalcula la altura si cambia el tamaño de la ventana */
    window.addEventListener("resize", function () {
      const abierto = qs(".faq__item.is-open");
      if (abierto) {
        const panel = qs(".faq__answer", abierto);
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  /* ======================================================================
     12. FORMULARIO DE CONTACTO (validación + envío por WhatsApp)
     ====================================================================== */
  function initFormulario() {
    const form = qs("#contactForm");
    if (!form) return;

    const status = qs("#formStatus");

    function setError(input, mensaje) {
      const field = input.closest(".field");
      const errorEl = qs(".field__error", field);
      field.classList.toggle("has-error", Boolean(mensaje));
      if (errorEl) errorEl.textContent = mensaje || "";
      return !mensaje;
    }

    function validar() {
      const nombre = qs("#nombre", form);
      const telefono = qs("#telefono", form);
      const servicio = qs("#servicio", form);
      let ok = true;

      ok = setError(nombre, nombre.value.trim().length < 3 ? "Ingresá tu nombre completo." : "") && ok;
      const soloDigitos = telefono.value.replace(/\D/g, "");
      ok = setError(telefono, soloDigitos.length < 8 ? "Ingresá un teléfono válido (mínimo 8 dígitos)." : "") && ok;
      ok = setError(servicio, servicio.value === "" ? "Elegí un servicio de interés." : "") && ok;

      return ok;
    }

    /* Validación en vivo: limpia el error al escribir */
    qsa("input, select, textarea", form).forEach(function (el) {
      el.addEventListener("input", function () {
        const field = el.closest(".field");
        if (field.classList.contains("has-error")) setError(el, "");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validar()) {
        if (status) { status.textContent = "Revisá los campos marcados en rojo."; status.style.color = "#ff8f9c"; }
        const primero = qs(".field.has-error input, .field.has-error select", form);
        if (primero) primero.focus();
        return;
      }

      const nombre = qs("#nombre", form).value.trim();
      const telefono = qs("#telefono", form).value.trim();
      const servicio = qs("#servicio", form).value;
      const mensaje = qs("#mensaje", form).value.trim();

      const texto =
        "¡Hola Tecnova! Quiero hacer una consulta.\n" +
        "• Nombre: " + nombre + "\n" +
        "• Teléfono: " + telefono + "\n" +
        "• Servicio: " + servicio +
        (mensaje ? "\n• Mensaje: " + mensaje : "");

      if (status) {
        status.style.color = "";
        status.textContent = "¡Gracias " + nombre + "! Abrimos WhatsApp para completar el envío…";
      }

      window.open(waLink(texto), "_blank", "noopener");
      form.reset();
    });
  }

  /* ======================================================================
     13. DETALLES VARIOS
     ====================================================================== */
  function initVarios() {
    /* Año del copyright */
    qsa("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    /* Suavizado de anclas internas con offset del header */
    qsa('a[href^="#"]:not([href="#"])').forEach(function (a) {
      a.addEventListener("click", function (e) {
        const destino = qs(a.getAttribute("href"));
        if (!destino) return;
        e.preventDefault();
        destino.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", a.getAttribute("href"));
      });
    });
  }

  /* ======================================================================
     14. ARRANQUE
     ====================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    initLogoFallback();
    initWhatsappLinks();
    initConfigBindings();
    initHeader();
    initHero();
    initOfertas();
    initReveal();
    initCounters();
    initAccordion();
    initFormulario();
    initVarios();
  });
})();
