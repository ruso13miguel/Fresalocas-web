# Arquitectura — El de las Fresas Locas

## Cómo funciona

```
GitHub (Fresalocas-web)             GitHub Pages
┌───────────────────┐   deploy   ┌────────────────────────────────┐
│ site/             │ ─────────► │ ruso13miguel.github.io/        │
│  index.html       │  (GitHub   │   Fresalocas-web/              │
│  css/ js/ img/    │   Actions) └────────────────────────────────┘
└───────────────────┘                      │ botón "Enviar pedido"
                                           ▼
                              WhatsApp de Cristhian (wa.me)
```

- No hay base de datos ni servidor: es HTML + CSS + JavaScript.
- **El pedido no se guarda en ningún lado.** La página arma el mensaje y abre WhatsApp con el texto listo. Cristhian lo recibe como un chat normal.
- La bolsa de pedido se recuerda en el navegador del cliente (`localStorage`), así no la pierde si cierra la página.
- Las letras (Bricolage Grotesque, Fraunces, Figtree) vienen de Google Fonts.
- Los dibujos son SVG hechos en código, no imágenes. Las piezas que se repiten (`#fresa`, `#loca`, `#cuadros`) están al inicio de `index.html` y se reutilizan con `<use href="#fresa">`.

## Orden de carga de los scripts

```
config.js  →  dibujos.js  →  productos.js  →  main.js
(datos)       (ilustraciones)  (menú)          (todo lo que se mueve)
```

`main.js` no tiene precios ni números: los lee de `window.FL_CONFIG` y `window.FL_PRODUCTOS`.

## Secciones (de arriba a abajo)

| Sección | En index.html | Qué hace el JavaScript |
|---|---|---|
| Encabezado | `header.top` | se marca al bajar; botones de Instagram y WhatsApp |
| Menú del celular | `#sheetNav` | se abre como un círculo desde la esquina |
| Portada | `.hero` | título que entra letra por letra, fresas en capas que siguen el mouse, manchas líquidas de fondo |
| Cintas | `.mq` | corren solas; van más lento al pasar el mouse |
| Menú de productos | `#menu`, `#stack` | arma las cartas desde `productos.js`; se apilan al bajar |
| Cómo pedir | `#pedir` | abre la bolsa de pedido |
| Temporada | `#temporada`, `#months` | resalta el mes actual o el próximo |
| Historia | `#historia` | — |
| Zonas y La Estación | `#zonas` | botón que cotiza eventos por WhatsApp |
| Lluvia de fresas | `#rain` | caen fresas al tocar |
| Pie | `footer` | la fresa sube como un sol al llegar |
| Bolsa de pedido | `#cartbar`, `#sheet` | total, domicilio gratis, mensaje y botón de WhatsApp |

Todo el movimiento se apaga si el celular tiene activado "reducir movimiento".

## Referencias de diseño

- Movimiento inspirado en **Driscoll's Berries** (Awwwards): menú que se abre como círculo, temporadas que aparecen, sol en el pie.
- Efectos del catálogo de motion escogidos para Fresas: 01, 02, 05, 09, 11, 14.
- Colores, tono y nombres de producto: *Dossier estratégico* y *Plan para El de las Fresas Locas*.
