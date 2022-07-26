# DevOps with Kubernetes 2022
DevOps with Kubernetes is an introduction to Kubernetes with K3s and GKE.

# Exercise 5.03: Learn from external material

![trafficsplit](trafficsplit.png)

# Exercise 5.04: Platform comparison

## Rancher

- Completely open-source orchestration platform
- Easier to install
- Runs on any system which has docker
- Can manage imported clusters and clusters it creates
- Upgrades are smooth

## OpenShift

- Only community version is open-source
- Installation is more involved
- Runs on RHEL CoreOS for control node RHEL for worker nodes
- Offers a lot of tools for creating container images
- Failed upgrades have been reported
- Provides extra features

### Rancher is best choice for it's simplicity and is more reliable when upgrading and it can also be installed on any system that runs docker

# Exercise 5.06: Landscape

## Database

- PostgresSQL as database for applications in this course
- Redis in part 2 of this course while following the course material
- IBM DB2 outside of the course
- mongoDB outside of the course
- MySQL outside of the course

## Streaming & Messaging

- NATS used in part 4 in the exercise for todo application
- Kafka outside of the course

## Application Definition and Image Build

- HELM used to install Prometheus and NATS in this course
- Gradle outside of the course

## Continuous Integration & Delivery

- GitHub Actions used in part 3 to deploy a pipeline
- Jenkins outside of the course 
- TravisCI outside of the course 

## Schedling & Orchestration

- Kubernetes used in the course
- Amazon ECS outside of the course

## Coordination & Service Discovery

- CoreDNS part of the k8s cluster
- etcd part of the k8s cluster
- ZooKeeper outside of the course

## Service Proxy

- traefik proxy used in k3d cluster
- NGINX outside of the course

## Service Mesh

- LINKERD used in part 5 exercises

## Cloud Native Storage

- Google Persistent Disk used in part 3 
- Amazon EBS outside of the course

## Container Runtime

- containerd is used as runtime in k3d cluster nodes

## Automation & Configuration

- AWS CloudFormation outside of the course

## Container Registry

- Google Container Registry used in part 3
- Amazon ECR outside of the course
- JFrog Artifactory outside of the course

## Kubernetes Training Partner

- The Linux Foundation outside of the course
- KodeKloud

## Certified Kubernetes - Distribution

- Rancher outside of the course

## Certified Kubernetes - Hosted

- Google Kubernetes Engine used in part3 exercises
- Amazon EKS outside of the course

## Monitoring

- Prometheus used in part2 of the course
- Grafana also used in part2 with Prometheus
- Amazon CloudWatch outside of the course

## Logging

- grafana loki used with Prometheus & Grafana
- fluentd outside of the course
- elasticsearch outside of the course
- logstash outside of the course

## Serverless

- Knative used in part 5 exercise
- Amazon Lambda outside of the course

![landscape](landscape.png)