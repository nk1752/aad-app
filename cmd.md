az role assignment list --scope /subscriptions/df2f960a-8e92-40ec-a2b8-0a2923d3c074/resourceGroups/alb-cluster-rg/providers/Microsoft.ContainerRegistry/registries/vhacr1 -o table

SP_ID=$(az aks show --resource-group alb-cluster-rg --name alb-cluster --query servicePrincipalProfile.clientId -o tsv)

az ad sp credential list --id "$SP_ID" --query "[].endDate" -o tsv

az aks show --resource-group alb-cluster-rg \
    --name alb-cluster \
    --query servicePrincipalProfile.clientId \
    --output tsv

az role assignment list --scope /subscriptions/<subscriptionID>/resourceGroups/<resourcegroupname>/providers/Microsoft.ContainerRegistry/registries/<acrname> -o table

<service-name>.<namespace>.svc.cluster.local:<service-port>
<service-name>.<namespace>:<service-port>
k exec -it pod-name -n pod-namespace sh