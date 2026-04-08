# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Kubernetes

Este repo contiene sus propios manifests en `k8s/`.

Despliegue:

```sh
kubectl --context personal-k3s apply -k k8s
```

## Imagen

El manifest de `k8s/deployment.yaml` usa una imagen pinneada por digest para que el despliegue sea reproducible.

Cuando actualices el portfolio:

1. construye y publica la nueva imagen,
2. actualiza el digest en `k8s/deployment.yaml`,
3. aplica de nuevo:

```sh
kubectl --context personal-k3s apply -k k8s
```

Hosts esperados:

- `https://ketaloca.dev`
- `https://jesuspb-portfolio.ketaloca.dev`
