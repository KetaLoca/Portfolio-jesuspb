# Portfolio - Jesús Pérez Bañobre

Portfolio personal construido con React y Vite.

## Desarrollo

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Despliegue

El repositorio incluye manifests en `k8s/` y un script de redeploy para reconstruir la imagen,
publicar `latest` y reiniciar el deployment en el cluster personal.

```sh
./redeploy.sh
```

El despliegue usa:

- contexto de Kubernetes `personal-k3s`
- namespace `portfolio`
- deployment `portfolio`
- imagen `xesuspb/portfolio:latest`

Hosts esperados:

- `https://ketaloca.dev`
- `https://jesuspb-portfolio.ketaloca.dev`
