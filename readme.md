# ThatConference 2016 - Highly Available NodeJS

Using NodeJS, Nginx, Docker, and Kubernetes you can create a highly available microservice environment.  This repository contains a local demostration of how to integrate these technologies.

## Presentation
[http://www.slideshare.net/BradWilliams86/thatconference-2016-highly-available-nodejs]

## Getting Started

1. Clone this repo

2. Install [Minikube](https://github.com/kubernetes/minikube/releases) (a simple utility to run Kubernetes locally)
    ```
    curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.7.1/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    brew install docker-machine-driver-xhyve
    sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
    sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
    ```
  
3. Install [kubectl]() (Kubernetes CLI)
    ```
    curl -O https://storage.googleapis.com/kubernetes-release/release/v1.3.4/bin/darwin/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
    ```
    **OR** 
    ```
    brew install kubernetes-cli
    ```

4. Start Minikube
    ```
    minikube start --vm-driver="xhyve"
    ```

5. Deploy apps to Kubernetes
    ```
    kubectl apply -f kubernetes/
    ```
