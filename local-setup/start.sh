#!/usr/bin/env bash

. ./bash-libs/Setup-Docker-Minikube-Lib.sh
pods=('app=kafkarestservice' 'name=kafkaservice' 'name=zookeeper')

#Sets some vars based on environment running script
get_env
#Will start minikube and docker if not started and set kubectl and minikube configs
start_minikube
for i in "${pods[@]}"; do
    if ! wait_prompt "kubectl get pods -l $i" "pod with label : $i is running"; then
        echo "pod with label : $i not running...kafka, zookeeper, and kafkarestservice must be running."
        exit 1
    fi
done


docker build . -f Dockerfile --tag kafka-ui:0.0.1
wait_prompt "kubectl apply -f deployment.yaml" "app is deployed."
wait_prompt "kubectl get pods -l app=kafkaui" "app is running."
kubectl port-forward service/kafkauiservice 4001:4001