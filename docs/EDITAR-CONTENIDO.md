# Qué tocar para cada cambio — El de las Fresas Locas

| Quiero cambiar… | Archivo | Dónde |
|---|---|---|
| **Número de WhatsApp** | `site/js/config.js` | `whatsapp: "573001234567"` (con 57, sin + ni espacios) |
| Precio del domicilio o el mínimo para gratis | `site/js/config.js` | `domicilio` |
| Extras (tarjeta, lazo…) | `site/js/config.js` | `extras` |
| Barrios del pedido | `site/js/config.js` | `zonas` |
| Formas de pago | `site/js/config.js` | `pagos` |
| **Precio, nombre o texto de un producto** | `site/js/productos.js` | el bloque `{ ... }` de ese producto |
| Agregar un producto | `site/js/productos.js` | copia un bloque `{ ... },` completo, pégalo y cámbialo |
| Orden del menú | `site/js/productos.js` | mueve los bloques. La Loca Mayor va siempre primero |
| Combos de temporada | `site/index.html` | sección `id="temporada"`, cada uno es un `<article class="mo" data-m="mes">` |
| Barrios que se ven en "¿Llegamos a tu casa?" | `site/index.html` | sección `id="zonas"`, los `<span>` |
| Textos de portada, historia, pie | `site/index.html` | busca el texto y cámbialo |
| Colores y letras | `site/css/styles.css` | `:root` al principio |

> Si cambias el domicilio en `config.js`, cambia también los textos que lo mencionan en `index.html`:
> busca `$5.000` y `$50.000` (portada, "Cómo pedir" y "Zonas").

## Poner fotos reales en el menú

1. Guarda la foto en `site/img/fotos/` con un nombre corto, sin espacios ni tildes: `loca-mayor.jpg`.
2. En `site/js/productos.js`, dentro del producto, agrega: `foto: "img/fotos/loca-mayor.jpg",`
3. La foto reemplaza el dibujo de esa carta. Corre `npm run check` para confirmar que la encuentra.

Tamaño recomendado: cuadrada, 800 × 800 px, menos de 200 KB (puedes comprimir en https://squoosh.app).

## Cambiar la imagen que sale al compartir el link

Reemplaza `site/img/og-image.png` (1200 × 630 px). Si la página cambia de dirección (por ejemplo, a un dominio propio), cambia también la línea `og:image` en `site/index.html`.
