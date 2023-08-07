export const msalConfig = {
    auth: {
        clientId: "<application(client)-id>",
        authority: "https://login.microsoftonline.com/<tenant-id> ",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    }
};