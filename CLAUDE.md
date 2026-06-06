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

**Estilos.** Tailwind v4 vía el plugin `@tailwindcss/vite` (en `vite.config.js`) — **no hay `tailwind.config.js`**; se importa con `@import "tailwindcss"` en `src/index.css`. Convención de diseño: fondo oscuro `slate-950`, acento `cyan`. El fondo es una **atmósfera global continua**: una capa `fixed inset-0 -z-10` en `App.jsx` con la rejilla tenue `.app-grid` (definida en `index.css`) más varios resplandores cyan/azul; las secciones van **translúcidas** (sin fondo propio) y dejan ver ese lienzo. Por eso, al añadir una sección **no** le pongas un `bg-gradient` opaco — déjala transparente para no tapar el fondo global. El hero (`About.jsx`) conserva resplandores propios más marcados como énfasis. `overflow-x-clip` se repite en varios niveles para evitar scroll horizontal.

## Despliegue

Imagen Docker **multi-stage**: `node:22-slim` compila el build → `nginx:1.28-alpine` sirve `dist/`. `nginx.conf` hace fallback de SPA (`try_files $uri /index.html`), necesario aunque ahora no haya router (rutas profundas y recargas).

`redeploy.sh` orquesta build (`--platform linux/amd64`) + push + `kubectl apply -k k8s` + `rollout restart`. Manifests en `k8s/` aplicados con **kustomize**.

- Contexto k8s: `personal-k3s` · namespace `portfolio` · deployment `portfolio`
- **Imagen: `xesuspb/portfolio:latest` en Docker Hub** (ojo: este repo NO usa `ghcr.io/ketaloca`; es la excepción al patrón personal habitual)
- Ingress: traefik + cert-manager (`letsencrypt-prod`), hosts `ketaloca.dev` y `jesuspb-portfolio.ketaloca.dev`
- Todos los parámetros de `redeploy.sh` son overrideables por variable de entorno (`IMAGE_NAME`, `KUBE_CONTEXT`, etc.)
