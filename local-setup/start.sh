#!/bin/sh

eval $(minikube docker-env)
docker build . -f Dockerfile --tag kafka-ui:0.0.1
kubectl apply -f deployment.yaml
sleep 60
kubectl port-forward service/kafkauiservice 4001:4001