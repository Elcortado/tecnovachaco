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
  "Celulares",
  "Cargadores y cables",
  "Auriculares y parlantes",
  "Vidrios templados",
  "Almacenamiento",
  "Periféricos",
  "Fundas",
  "Relojes"
];

const TECNOVA_PRODUCTS = [
  /* ------------------------------- FUNDAS ------------------------------- */
  {
    id: 1,
    nombre: "TECNO SPARK GO 1s",
    categoria: "Celulares",
    precio: 200000,
    precioAnterior: 241000,
    enOferta: true,
    imagen: "assets/ofertas/celularesSparkGo1.png",
    descripcion: "3GB RAM, 64GB Almacenamiento, Display 6.67, Cámara 13 MP/ Frontal 8MP"
  },
  {
    id: 2,
    nombre: "MOTOROLA G05",
    categoria: "Celulares",
    precio: 240000,
    precioAnterior: 304000,
    enOferta: true,
    imagen: "assets/ofertas/celularesMotoG05.png",
    descripcion: "4GB RAM, 128GB Almacenamiento, Display 6.67, Cámara 50 MP/ Frontal 8MP"
  },
  {
    id: 3,
    nombre: "SAMSUNG GALAXY A16",
    categoria: "Celulares",
    precio: 290000,
    precioAnterior: 330000,
    enOferta: true,
    imagen: "assets/ofertas/celularesA16.png",
    descripcion: "4GB RAM, 128GB Almacenamiento, Display 6.7, Cámara 50 + 5 + 2 MP/ Frontal 13MP"
  },
  {
    id: 4,
    nombre: "SAMSUNG GALAXY A17",
    categoria: "Celulares",
    precio: 450000,
    precioAnterior: 495000,
    enOferta: true,
    imagen: "assets/ofertas/celularesA17.png",
    descripcion: "8GB RAM, 256GB Almacenamiento, Display 6.7, Cámara 50 MP/ Frontal 13MP"
  },

  
  {
    id: 5,
    nombre: "XIAOMI NOTE 15",
    categoria: "Celulares",
    precio: 450000,
    precioAnterior: 499000,
    enOferta: true,
    imagen: "assets/ofertas/celularesXiaomiNote15.png",
    descripcion: "8GB RAM, 256GB Almacenamiento, Display 6.77, Cámara 108 MP/ Frontal 20MP"
  },
  {
    id: 6,
    nombre: "Cargador XAEA OPTIMUM 45W Carga rápida",
    categoria: "Cargadores y cables",
    precio: 8960,
    precioAnterior: 9960,
    enOferta: true,
    imagen: "assets/ofertas/cargadorOptimum.jpg",
    descripcion: "5Amp, 45W, 1USb +  1TC, Cable C-C"
  },

   
  {
    id: 7,
    nombre: "Parlante Gamer MAGSAFE",
    categoria: "Auriculares y parlantes",
    precio: 9800,
    precioAnterior: null,
    enOferta: false,
    imagen: "assets/productos/auricularesParlantes/parlateGamerMagsafe.png",
    descripcion: "Tipo C - Potencia: 3W - Negro/Naranja"
  },
  
  {
    id: 8,
    nombre: "Cargador YEXA",
    categoria: "Cargadores y cables",
    precio: 4500,
    precioAnterior: null,
    enOferta: false,
    imagen: "assets/productos/cargadoresCables/cargadorUno.jpeg",
    descripcion: "220V - 4.8 Amp - 1Usb + Cable V8"
  },

 
  {
    id: 9,
    nombre: "Cargador XAEA HYPERX 55W Carga rápida",
    categoria: "Cargadores y cables",
    precio: 14400,
    precioAnterior: null,
    enOferta: false,
    imagen: "assets/productos/cargadoresCables/cargadorTres.jpeg",
    descripcion: "220V - 5.4 Amp - 1 USB-C + 1 USB-A"
  },
  {
    id: 10,
    nombre: "Cargador XAEA EXTREME 65W Carga rápida",
    categoria: "Cargadores y cables",
    precio: 19400,
    precioAnterior: null,
    enOferta: false,
    imagen: "assets/productos/cargadoresCables/cargadorCuatro.jpg",
    descripcion: "220V - 6.2 Amp - 1 USB-C + 1 USB-A"
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