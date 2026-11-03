/**
 * CONFIGURACIÓN DEL NEGOCIO
 * Lo que más se cambia está aquí. No hace falta tocar main.js.
 */
window.FL_CONFIG = {
  // Número de WhatsApp con indicativo de país, sin "+", sin espacios ni guiones.
  // Ejemplo: "573001234567". Si queda vacío, WhatsApp le pide al cliente escoger el contacto.
  whatsapp: "",

  instagram: "https://www.instagram.com/eldelasfresaslocas/",

  domicilio: {
    costo: 5000,        // lo que cuesta el domicilio
    gratisDesde: 50000  // desde este total el domicilio es gratis
  },

  // Extras que se pueden agregar al pedido (aparecen en la bolsa de pedido)
  extras: [
    { id: "tarjeta", nombre: "Tarjeta escrita a mano", precio: 3000 },
    { id: "lazo",    nombre: "Empaque con lazo",       precio: 5000 }
  ],

  // Barrios que aparecen al pedir. El primero sale marcado por defecto.
  zonas: ["El Poblado", "Laureles", "Envigado", "Sabaneta", "Belén", "Palermo", "Otro barrio"],

  // Formas de pago que puede escoger el cliente. La primera sale marcada.
  pagos: ["Efectivo", "Transferencia"]
};
