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