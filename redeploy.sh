#!/usr/bin/env bash

set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-xesuspb/portfolio}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
KUBE_CONTEXT="${KUBE_CONTEXT:-personal-k3s}"
NAMESPACE="${NAMESPACE:-portfolio}"
DEPLOYMENT_NAME="${DEPLOYMENT_NAME:-portfolio}"

docker build --platform linux/amd64 -t "${IMAGE_NAME}:${IMAGE_TAG}" .
docker push "${IMAGE_NAME}:${IMAGE_TAG}"

kubectl --context "${KUBE_CONTEXT}" -n "${NAMESPACE}" rollout restart "deployment/${DEPLOYMENT_NAME}"
kubectl --context "${KUBE_CONTEXT}" -n "${NAMESPACE}" rollout status "deployment/${DEPLOYMENT_NAME}"
