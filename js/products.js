/* ==========================================================================
   TECNOVA — js/products.js
   Array compartido de productos. Editable sin tocar el resto del código.
   --------------------------------------------------------------------------
   Campos de cada producto:
     id            → identificador único (número)
     nombre        → nombre comercial
     categoria     → debe coincidir con TECNOVA_CATEGORIAS
     precio        → precio actual (número, en pesos)
     precioAnterior→ precio anterior tachado (null si no hay descuento)
     enOferta      → true / false (define qué aparece en el carrusel de ofertas)
     imagen        → URL o ruta local (assets/...)
     descripcion   → texto corto para la tarjeta
   ========================================================================== */

/* Categorías disponibles en la tienda (también alimenta los filtros) */
const TECNOVA_CATEGORIAS = [
  "Fundas",
  "Cargadores y cables",
  "Auriculares",
  "Vidrios templados",
  "Almacenamiento",
  "Periféricos"
];

const TECNOVA_PRODUCTS = [
  /* ------------------------------- FUNDAS ------------------------------- */
  {
    id: 1,
    nombre: "Funda Silicona Premium iPhone 15",
    categoria: "Fundas",
    precio: 14900,
    precioAnterior: 19900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Funda+iPhone+15",
    descripcion: "Silicona líquida antideslizante con interior de microfibra."
  },
  {
    id: 2,
    nombre: "Funda Antishock Galaxy S24 Ultra",
    categoria: "Fundas",
    precio: 16900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Funda+Galaxy+S24",
    descripcion: "Esquineros reforzados y protección contra caídas de 1,5 m."
  },
  {
    id: 3,
    nombre: "Funda Transparente Redmi Note 13",
    categoria: "Fundas",
    precio: 9900,
    precioAnterior: 12900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Funda+Redmi+Note+13",
    descripcion: "TPU flexible anti-amarilleo, deja ver el diseño del equipo."
  },
  {
    id: 4,
    nombre: "Funda con Tapa Motorola Edge 50",
    categoria: "Fundas",
    precio: 18500,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Funda+Motorola+Edge",
    descripcion: "Formato libro con soporte, cierre magnético y porta tarjetas."
  },

  /* --------------------------- CARGADORES Y CABLES ---------------------- */
  {
    id: 5,
    nombre: "Cargador Turbo 65W USB-C GaN",
    categoria: "Cargadores y cables",
    precio: 32900,
    precioAnterior: 41900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Cargador+65W+GaN",
    descripcion: "Carga notebook y celular al mismo tiempo con tecnología GaN."
  },
  {
    id: 6,
    nombre: "Cable USB-C Nylon Reforzado 2 m",
    categoria: "Cargadores y cables",
    precio: 8900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Cable+USB-C+2m",
    descripcion: "Trenzado de nylon, soporta 100 W y transferencia de 480 Mbps."
  },
  {
    id: 7,
    nombre: "Cable Lightning Certificado 1 m",
    categoria: "Cargadores y cables",
    precio: 11500,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Cable+Lightning",
    descripcion: "Chip original MFi, compatible con iPhone y iPad."
  },
  {
    id: 8,
    nombre: "Cargador Inalámbrico 15W",
    categoria: "Cargadores y cables",
    precio: 29900,
    precioAnterior: 36900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Carga+Inalambrica",
    descripcion: "Base antideslizante con detección de objetos metálicos."
  },

  /* ----------------------------- AURICULARES ---------------------------- */
  {
    id: 9,
    nombre: "Auriculares Bluetooth Pro ANC",
    categoria: "Auriculares",
    precio: 58900,
    precioAnterior: 74900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Auriculares+ANC",
    descripcion: "Cancelación activa de ruido, 32 h de batería y estuche de carga."
  },
  {
    id: 10,
    nombre: "Auriculares In-Ear con Micrófono",
    categoria: "Auriculares",
    precio: 19900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=In-Ear+Mic",
    descripcion: "Jack 3,5 mm o USB-C, control en línea y graves potenciados."
  },
  {
    id: 11,
    nombre: "Auriculares Gamer RGB 7.1",
    categoria: "Auriculares",
    precio: 64900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Gamer+RGB+7.1",
    descripcion: "Sonido envolvente virtual, micrófono desmontable y vincha acolchada."
  },

  /* -------------------------- VIDRIOS TEMPLADOS ------------------------- */
  {
    id: 12,
    nombre: "Vidrio Templado 9H iPhone 15",
    categoria: "Vidrios templados",
    precio: 6900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Vidrio+9H",
    descripcion: "Dureza 9H, borde redondeado y kit de instalación incluido."
  },
  {
    id: 13,
    nombre: "Vidrio Cerámico Galaxy S24 (x2)",
    categoria: "Vidrios templados",
    precio: 9900,
    precioAnterior: 13900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Vidrio+Ceramico",
    descripcion: "Pack doble con tratamiento oleofóbico y full cover."
  },
  {
    id: 14,
    nombre: "Vidrio Privacidad Anti-Espía",
    categoria: "Vidrios templados",
    precio: 10900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Vidrio+Privacidad",
    descripcion: "Protege tu pantalla de miradas laterales sin perder luminosidad."
  },

  /* ---------------------------- ALMACENAMIENTO -------------------------- */
  {
    id: 15,
    nombre: "Memoria MicroSD 128 GB Clase 10",
    categoria: "Almacenamiento",
    precio: 21900,
    precioAnterior: 26900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=MicroSD+128GB",
    descripcion: "Apta para Full HD, resistente al agua y a las temperaturas."
  },
  {
    id: 16,
    nombre: "Pendrive USB 3.0 64 GB",
    categoria: "Almacenamiento",
    precio: 14900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Pendrive+64GB",
    descripcion: "Cuerpo metálico retráctil y anilla para llavero."
  },
  {
    id: 17,
    nombre: "Disco SSD Externo 512 GB",
    categoria: "Almacenamiento",
    precio: 119900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=SSD+Externo+512GB",
    descripcion: "USB-C 3.2, lectura de hasta 1050 MB/s y respaldo incluido."
  },

  /* ----------------------------- PERIFÉRICOS ---------------------------- */
  {
    id: 18,
    nombre: "Mouse Inalámbrico Ergonómico",
    categoria: "Periféricos",
    precio: 24900,
    precioAnterior: 29900,
    enOferta: true,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Mouse+Ergonomico",
    descripcion: "Silencioso, 1600 DPI ajustables y receptor USB nano."
  },
  {
    id: 19,
    nombre: "Teclado Mecánico RGB 60%",
    categoria: "Periféricos",
    precio: 89900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Teclado+Mecanico",
    descripcion: "Switches hot-swap, cable USB-C desmontable y perfil compacto."
  },
  {
    id: 20,
    nombre: "Soporte Notebook Aluminio Ajustable",
    categoria: "Periféricos",
    precio: 34900,
    precioAnterior: null,
    enOferta: false,
    imagen: "https://placehold.co/640x480/0F1B3D/22D8F0?text=Soporte+Notebook",
    descripcion: "Altura regulable en 6 posiciones, mejora la postura y la ventilación."
  }
];

/* Exponemos los datos para que main.js y store.js los consuman */
window.TECNOVA_CATEGORIAS = TECNOVA_CATEGORIAS;
window.TECNOVA_PRODUCTS = TECNOVA_PRODUCTS;