import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
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

    const secret = await client.getSecret(name);
    return secret.value;

}