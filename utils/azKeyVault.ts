import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { KeyClient } from "@azure/keyvault-keys";
import { AzureCliCredential } from "@azure/identity";
import { ClientSecretCredential } from "@azure/identity";
import { ClientCertificateCredential } from "@azure/identity";
import { UsernamePasswordCredential } from "@azure/identity";
import { InteractiveBrowserCredential } from "@azure/identity";
import { DeviceCodeCredential } from "@azure/identity";
import { AuthorizationCodeCredential } from "@azure/identity";

import { log } from "console";

export async function getSecret(name: string) {

    const client_id = process.env.UMI_CLIENT_ID;  // Managed Identity Client ID
    
    // environment variables
    const credential = new DefaultAzureCredential({
        managedIdentityClientId: client_id,
    });

    // system-assigned managed identity
    //const credential = new ManagedIdentityCredential();

    // user-assigned managed identity
    //const credential = new ManagedIdentityCredential(client_id);

    const vaultName = process.env.SECRET_VAULT_NAME;
    const vaultUrl = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(vaultUrl, credential, {
        serviceVersion: "7.1",
    });

    console.log("Getting secret...");
    console.log("process.env.UMI_CLIENT_ID: ", process.env.UMI_CLIENT_ID);
    console.log("process.env.SECRET_VAULT_NAME: ", process.env.SECRET_VAULT_NAME);
    console.log("process.env.SECRET_NAME: ", process.env.SECRET_NAME);
    console.log("process.env.AZURE_TENANT_ID: ", process.env.AZURE_TENANT_ID);
    console.log("process.env.AZURE_CLIENT_ID: ", process.env.AZURE_CLIENT_ID);
    console.log("process.env.AZURE_CLIENT_SECRET: ", process.env.AZURE_CLIENT_SECRET);


    const secret = await client.getSecret(name);
    return secret.value;

}

export async function getKey(name: string) {

    const client_id = process.env.UMI_CLIENT_ID;  // Managed Identity Client ID

    // enveronment variables
    const credential = new DefaultAzureCredential({
        managedIdentityClientId: client_id,
    });

    const vaultName = process.env.SECRET_VAULT_NAME;
    const vaultUrl = `https://${vaultName}.vault.azure.net`;

    const client = new KeyClient(vaultUrl, credential, {
        serviceVersion: "7.1",
    });

    const key = await client.getKey(name);
    return key.key;
}