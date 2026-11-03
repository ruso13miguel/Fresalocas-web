# El de las Fresas Locas — página web

Página de **El de las Fresas Locas** (@eldelasfresaslocas), fresas a domicilio en Medellín de Cristhian Oquendo.
Es una sola página hecha con HTML, CSS y JavaScript, sin librerías. El cliente arma su pedido en el menú y lo envía por **WhatsApp** con un toque. Se publica gratis en **GitHub Pages**.

| | |
|---|---|
| Repositorio | `ruso13miguel/fresaslocas-web` |
| Link (cuando se active Pages) | https://ruso13miguel.github.io/fresaslocas-web/ |
| Instagram | https://www.instagram.com/eldelasfresaslocas/ |
| WhatsApp | **pendiente**: poner el número en `site/js/config.js` |

## Carpetas

```
fresaslocas-web/
├── site/                  ← LO QUE SE PUBLICA (exactamente esto va a la web)
│   ├── index.html         estructura y textos de todas las secciones
│   ├── css/
│   │   └── styles.css     todo el diseño: colores, letras, secciones, animaciones
│   ├── js/
│   │   ├── config.js      número de WhatsApp, domicilio, extras, barrios, pagos
│   │   ├── productos.js   el menú: nombres, precios, descripciones, colores
│   │   ├── dibujos.js     ilustraciones de cada producto
│   │   └── main.js        carrito, mensaje de WhatsApp, menú del celular y animaciones
│   └── img/
│       ├── favicon.svg          ícono de la pestaña
│       ├── apple-touch-icon.png ícono al guardar la página en el celular
│       ├── og-image.png         imagen que sale al compartir el link por WhatsApp
│       ├── mascota.svg          la fresa con gafas
│       ├── fresa.svg            fresa sola
│       └── fotos/               aquí van las fotos reales (ver fotos/LEEME.md)
├── docs/
│   ├── ARQUITECTURA.md     cómo está armada la página y qué hace cada parte
│   ├── EDITAR-CONTENIDO.md qué tocar para cada cambio
│   └── PUBLICAR.md         cómo se sube a internet
├── scripts/
│   └── check.mjs           revisa que no falten archivos ni haya errores
├── .github/workflows/deploy.yml  publicación automática al guardar en main
└── package.json            comandos: dev, check
```

## Comandos

Necesitas [Node.js](https://nodejs.org) 20 o más nuevo.

```bash
npm run dev      # abre la página en http://localhost:3000
npm run check    # revisa antes de publicar
```

También puedes abrir `site/index.html` con doble clic: funciona sin servidor.

## Pendientes

- [ ] Número de WhatsApp del negocio en `site/js/config.js`
- [ ] Fotos reales de Instagram en `site/img/fotos/` (lista en `site/img/fotos/LEEME.md`)
- [ ] Cristhian confirma precios: Caja Exótica, Mermelada y los productos nuevos
- [ ] Confirmar medios de pago y hora límite para pedidos del mismo día
- [ ] Activar GitHub Pages (pasos en `docs/PUBLICAR.md`)
