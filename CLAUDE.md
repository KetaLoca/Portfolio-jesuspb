# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portfolio personal de Jesús Pérez Bañobre: SPA estática (React + Vite + Tailwind v4) servida por nginx y desplegada en un cluster Kubernetes personal. Todo el contenido visible está en español.

## Comandos

```sh
npm install        # instalar dependencias (el repo usa npm; respétalo, no migres a pnpm)
npm run dev        # servidor de desarrollo Vite con HMR
npm run build      # build de producción a dist/
npm run preview    # previsualizar el build
npm run lint       # ESLint sobre todo el repo
./redeploy.sh      # build de imagen + push + apply -k k8s + rollout restart (ver Despliegue)
```

No hay tests ni framework de testing configurado.

## Arquitectura

SPA de **una sola página** (no hay router). `src/main.jsx` monta `App.jsx`, que apila seis componentes de sección en orden vertical. La navegación es scroll dentro de la misma página, no cambio de ruta.

**Acoplamiento clave — el scroll-spy del Header.** Para añadir, quitar o reordenar una sección hay que tocar **tres** sitios coordinadamente, o la navegación se rompe en silencio:
1. `src/components/Header.jsx` → array `sections` (`{ id, name }`). Define los botones de nav y, vía `offsetTop`, qué sección se marca activa al hacer scroll.
2. El componente de la sección → su `<section id="...">` **debe** coincidir exacto con el `id` del paso 1 (ids actuales: `sobre-mi`, `experiencia`, `tecnologias`, `proyectos`, `formacion`).
3. `src/App.jsx` → incluir el componente en el orden visual deseado.

El scroll-spy de `Header.jsx` recorre las secciones y marca activa la última cuyo `offsetTop` ya pasó el scroll (con offset por la altura del header fijo). El header es `fixed`; el scroll suave lo gestiona `handleScroll`, que además del alto del header descuenta el `padding-top` real de la sección (leído con `getComputedStyle`) para que el salto aterrice sobre el contenido y no sobre la banda vacía del padding superior.

**Contenido hardcodeado.** No hay CMS, API ni fuente de datos externa. El contenido (proyectos, experiencia, tecnologías…) vive en arrays/JSX dentro de cada componente. Para editar el portfolio se edita directamente el componente correspondiente (p. ej. el array `projects` en `Projects.jsx`).

**Imágenes** en `public/`, referenciadas por ruta absoluta (`/portfolio.png`). El carrusel de `Projects.jsx` usa **Swiper** (módulos `Navigation`/`Pagination`); las animaciones usan **framer-motion**; los iconos, **react-icons**.

**Estilos.** Tailwind v4 vía el plugin `@tailwindcss/vite` (en `vite.config.js`) — **no hay `tailwind.config.js`**; se importa con `@import "tailwindcss"` en `src/index.css`. Convención de diseño: fondo oscuro `slate-950`, acento `cyan`. El fondo es una **atmósfera global continua y reactiva**, encapsulada en `src/components/Atmosphere.jsx`: una capa `fixed inset-0 -z-10` que combina rejilla blueprint estática (`.app-grid`), una **aurora** animada cuyo color cambia por sección vía `IntersectionObserver` (acentos en `SECTION_ACCENTS`, transición sobre `--aura-a/--aura-b`), una **constelación de partículas en canvas** —la única capa que reacciona al cursor: los nodos se apartan, crecen y se conectan con él— y *parallax* sutil (el `pointermove` solo alimenta `--px/--py`). No hay foco de luz siguiendo el cursor: se quitó a propósito porque estorbaba la lectura. Todo se mueve con **un solo `pointermove` con throttle de `requestAnimationFrame`** y **un único bucle de canvas** que se pausa con `visibilitychange`; respeta `prefers-reduced-motion`.

**Gotcha de apilamiento (importante):** el div raíz de `App.jsx` lleva `isolate`. Sin él, su `bg-slate-950` opaco **tapa** la capa `-z-10` de la atmósfera (un `position: relative` sin `z-index` no crea stacking context, así que el `-z-10` cae al fondo del contexto raíz, detrás del fondo de App). Con `isolate`, App crea stacking context y el `-z-10` se pinta **sobre** su fondo y **bajo** el contenido. Si tocas el contenedor raíz, no quites `isolate`. Las secciones van **translúcidas** (sin fondo propio) para dejar ver ese lienzo: al añadir una, **no** le pongas un `bg-gradient` opaco. El hero (`About.jsx`, también `isolate`) conserva resplandores propios más marcados como énfasis. La intensidad de todos los efectos vive en un puñado de constantes (opacidades en `index.css`, `LINK_DIST`/`CURSOR_DIST`/densidad en `Atmosphere.jsx`). `overflow-x-clip` se repite en varios niveles para evitar scroll horizontal.

## Despliegue

Imagen Docker **multi-stage**: `node:22-slim` compila el build → `nginx:1.28-alpine` sirve `dist/`. `nginx.conf` hace fallback de SPA (`try_files $uri /index.html`), necesario aunque ahora no haya router (rutas profundas y recargas).

`redeploy.sh` orquesta build (`--platform linux/amd64`) + push + `kubectl apply -k k8s` + `rollout restart`. Manifests en `k8s/` aplicados con **kustomize**.

- Contexto k8s: `personal-k3s` · namespace `portfolio` · deployment `portfolio`
- **Imagen: `xesuspb/portfolio:latest` en Docker Hub** (ojo: este repo NO usa `ghcr.io/ketaloca`; es la excepción al patrón personal habitual)
- Ingress: traefik + cert-manager (`letsencrypt-prod`), hosts `ketaloca.dev` y `jesuspb-portfolio.ketaloca.dev`
- Todos los parámetros de `redeploy.sh` son overrideables por variable de entorno (`IMAGE_NAME`, `KUBE_CONTEXT`, etc.)
