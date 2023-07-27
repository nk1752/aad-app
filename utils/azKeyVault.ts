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

    const client_id = process.env.CLIENT_ID;  // Managed Identity Client ID
    const credential = new DefaultAzureCredential({
        managedIdentityClientId: client_id
    });
    const vaultName = "mi-rsc-vault";
    const vaultUrl = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(vaultUrl, credential, {
        serviceVersion: "7.1",
    });

    const secret = await client.getSecret(name);
    return secret.value;

}