/**
 * MENÚ DE PRODUCTOS
 * Cada bloque { ... } es una carta del menú, en el orden en que aparecen.
 * La Loca Mayor va siempre primero: es la que más se vende.
 *
 *   id        nombre corto sin espacios (no lo cambies si ya hay pedidos guardados)
 *   nombre    como se llama el producto
 *   detalle   tamaño o tipo, sale debajo del nombre
 *   precio    en pesos, sin puntos. Pon null si el precio depende de la temporada
 *   etiqueta  texto pequeño arriba (opcional): "Nuevo", "Combo", "Pide con 1 día"…
 *   texto     la descripción
 *   fondo     color de la carta
 *   letra     color del texto de la carta
 *   dibujo    ilustración de dibujos.js
 *   foto      (opcional) ruta a una foto real, ej. "img/fotos/loca-mayor.jpg". Si la pones, reemplaza el dibujo.
 */
(function () {
  const D = window.FL_DIBUJOS;
  window.FL_PRODUCTOS = [
    {
      id: "mayor", nombre: "La Loca Mayor", detalle: "Caja grande · 1,2 kg", precio: 35000,
      etiqueta: "La favorita",
      texto: "Fresas grandes y brillantes para toda la familia. La que más piden.",
      fondo: "#D7263D", letra: "#FFF8F2", dibujo: D.caja(7)
    },
    {
      id: "loquita", nombre: "La Loquita", detalle: "Caja pequeña · 600 g", precio: 20000,
      texto: "Tu antojo personal o para compartir en el trabajo a media tarde.",
      fondo: "#FCE4E8", letra: "#7A1C2E", dibujo: D.caja(4)
    },
    {
      id: "familia", nombre: "Combo Familia Loca", detalle: "Caja grande + arándanos", precio: 42000,
      etiqueta: "Combo",
      texto: "La Loca Mayor con arándanos frescos. Para la lonchera de la semana.",
      fondo: "#7A1C2E", letra: "#FCE4E8", dibujo: D.caja(6)
    },
    {
      id: "crema", nombre: "Fresas Locas con Crema", detalle: "Vaso", precio: 12000,
      etiqueta: "Nuevo",
      texto: "Fresa picada con crema espesa. El postre que nos pedían tanto.",
      fondo: "#FFD27A", letra: "#5a1020", dibujo: D.vaso("#FFF8F2")
    },
    {
      id: "vaso", nombre: "Vaso Loco", detalle: "Fresas con chocolate", precio: 10000,
      texto: "El clásico de La Estación: fresa entera bañada en chocolate.",
      fondo: "#5A2E1A", letra: "#FCE4E8", dibujo: D.vaso("#5A2E1A")
    },
    {
      id: "regalo", nombre: "Caja Regalo x12", detalle: "12 fresas con chocolate", precio: 45000,
      etiqueta: "Pide con 1 día",
      texto: "Doce fresas grandes decoradas, en caja para regalar. Agrégale tarjeta escrita.",
      fondo: "#2B0F16", letra: "#FFD27A", dibujo: D.choco()
    },
    {
      id: "detalle", nombre: "Detalle Loco", detalle: "Ancheta", precio: 70000,
      etiqueta: "Pide con 1 día",
      texto: "Canasta con fresas, chocolate y algo más para quedar muy bien.",
      fondo: "#3A8D3F", letra: "#FFF8F2", dibujo: D.ancheta()
    },
    {
      id: "exotica", nombre: "Caja Exótica", detalle: "Fresa · mangostino · rambután", precio: null,
      texto: "Frutas que casi nadie conoce. Pregunta qué llegó esta semana.",
      fondo: "#FCE4E8", letra: "#7A1C2E", dibujo: D.exotica()
    },
    {
      id: "mermelada", nombre: "Mermelada Cero Desperdicio", detalle: "Artesanal", precio: null,
      texto: "Hecha con la fresa que no pasó la selección. Nada se bota.",
      fondo: "#FFF8F2", letra: "#7A1C2E", dibujo: D.mermelada(), borde: true
    }
  ];
})();
