# Cómo se publica

Lo que hay en la carpeta `site/` es exactamente lo que se publica, en **GitHub Pages** (gratis).

## Automático desde GitHub

Cada vez que guardas un cambio en la rama `main` que toca `site/`, GitHub:

1. revisa que no falte ningún archivo y que el JavaScript no tenga errores (`scripts/check.mjs`);
2. publica la carpeta `site/`.

En 1–2 minutos está en vivo. Lo ves en la pestaña **Actions**: ✓ verde = publicado, ✗ rojo = algo falló (no se publica nada).

### Activarlo (una sola vez)

1. Sube el repositorio a GitHub (ver `SUBIR-A-GITHUB.md` en la carpeta *Proyectos Web*).
2. En el repositorio: **Settings** → **Pages** → en *Build and deployment*, **Source: GitHub Actions**.
3. Ve a **Actions** → **Publicar en GitHub Pages** → **Run workflow**.
4. La página queda en `https://ruso13miguel.github.io/fresaslocas-web/`.

> **Repositorio público o privado:** con una cuenta gratis de GitHub, Pages solo funciona en repositorios **públicos**.
> Este proyecto no tiene claves ni datos privados, así que puede ser público sin problema.
> Si lo quieres privado, necesitas GitHub Pro, o publicarlo en Netlify o Vercel conectando el repositorio (carpeta a publicar: `site`).

## Dominio propio (opcional, más adelante)

Si compran un dominio (por ejemplo `fresaslocas.co`):

1. **Settings** → **Pages** → **Custom domain** → escribe el dominio → **Save**.
2. En el proveedor del dominio, crea los registros que GitHub indica (un `CNAME` hacia `ruso13miguel.github.io`).
3. Cambia la línea `og:image` en `site/index.html` a la nueva dirección.
