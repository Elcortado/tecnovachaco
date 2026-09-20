/* ==========================================================================
   TECNOVA — js/store.js
   Lógica de store.html: búsqueda, filtros por categoría, orden por precio
   y render de la grilla desde el array compartido js/products.js
   Requiere: js/products.js y js/main.js (utilidades en window.Tecnova)
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("storeGrid");
    const vacio = document.getElementById("storeEmpty");
    const contador = document.getElementById("storeResults");
    if (!grid) return;

    const T = window.Tecnova || {};
    const productos = window.TECNOVA_PRODUCTS || [];
    const categorias = window.TECNOVA_CATEGORIAS || [];

    /* Estado de los filtros */
    const estado = {
      busqueda: "",
      categoria: "todos",
      orden: "relevancia"
    };

    /* ---------------------------------------------------------------------
       1. Filtros de categoría (se generan desde products.js para que
          siempre coincidan con los datos)
       --------------------------------------------------------------------- */
    function initFiltros() {
      const contenedor = document.getElementById("storeFilters");
      if (!contenedor) return;

      const opciones = ["todos"].concat(categorias).concat(["ofertas"]);
      const etiquetas = { todos: "Todos", ofertas: "Ofertas" };

      contenedor.innerHTML = opciones.map(function (cat) {
        const texto = etiquetas[cat] || cat;
        const activo = cat === estado.categoria ? " is-active" : "";
        return '<button type="button" class="chip' + activo + '" data-filter="' + cat + '">' + texto + "</button>";
      }).join("");

      contenedor.addEventListener("click", function (e) {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        estado.categoria = chip.getAttribute("data-filter");
        Array.prototype.forEach.call(contenedor.querySelectorAll(".chip"), function (c) {
          c.classList.toggle("is-active", c === chip);
        });
        render();
      });
    }

    /* ---------------------------------------------------------------------
       2. Búsqueda y orden
       --------------------------------------------------------------------- */
    function initControles() {
      const buscador = document.getElementById("buscador");
      if (buscador) {
        let debounce;
        buscador.addEventListener("input", function () {
          window.clearTimeout(debounce);
          debounce = window.setTimeout(function () {
            estado.busqueda = buscador.value.trim().toLowerCase();
            render();
          }, 180);
        });
      }

      const orden = document.getElementById("orden");
      if (orden) {
        orden.addEventListener("change", function () {
          estado.orden = orden.value;
          render();
        });
      }

      /* Botón "limpiar filtros" del estado vacío */
      const limpiar = document.getElementById("limpiarFiltros");
      if (limpiar) {
        limpiar.addEventListener("click", function () {
          estado.busqueda = "";
          estado.categoria = "todos";
          estado.orden = "relevancia";
          if (buscador) buscador.value = "";
          if (orden) orden.value = "relevancia";
          Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (c) {
            c.classList.toggle("is-active", c.getAttribute("data-filter") === "todos");
          });
          render();
        });
      }
    }

    /* ---------------------------------------------------------------------
       3. Filtrado + ordenamiento
       --------------------------------------------------------------------- */
    function aplicarFiltros() {
      let lista = productos.slice();

      if (estado.categoria === "ofertas") {
        lista = lista.filter(function (p) { return p.enOferta; });
      } else if (estado.categoria !== "todos") {
        lista = lista.filter(function (p) { return p.categoria === estado.categoria; });
      }

      if (estado.busqueda) {
        const q = estado.busqueda;
        lista = lista.filter(function (p) {
          return (
            p.nombre.toLowerCase().indexOf(q) !== -1 ||
            p.categoria.toLowerCase().indexOf(q) !== -1 ||
            p.descripcion.toLowerCase().indexOf(q) !== -1
          );
        });
      }

      if (estado.orden === "precio-asc") {
        lista.sort(function (a, b) { return a.precio - b.precio; });
      } else if (estado.orden === "precio-desc") {
        lista.sort(function (a, b) { return b.precio - a.precio; });
      } else {
        /* Relevancia: primero las ofertas, luego el orden original */
        lista.sort(function (a, b) { return (b.enOferta ? 1 : 0) - (a.enOferta ? 1 : 0); });
      }

      return lista;
    }

    /* ---------------------------------------------------------------------
       4. Render de la grilla
       --------------------------------------------------------------------- */
    function render() {
      const lista = aplicarFiltros();

      grid.innerHTML = lista.map(function (p) {
        return T.productCardHTML
          ? T.productCardHTML(p, { buttonLabel: "Consultar por WhatsApp", badge: p.enOferta ? "Oferta" : null })
          : "";
      }).join("");

      if (vacio) vacio.hidden = lista.length > 0;

      if (contador) {
        contador.textContent = lista.length === 0
          ? "Sin resultados"
          : "Mostrando " + lista.length + " de " + productos.length + " productos" +
            (estado.categoria === "ofertas" ? " en oferta" : "") + ".";
      }
    }

    initFiltros();
    initControles();
    render();
  });
})();