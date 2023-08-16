
import { Configuration } from '@azure/msal-browser';

// MSAL configuration for AuthNZ App 
export const msalConfig: Configuration = {
    auth: {
      clientId: 'ddec4f98-52aa-40b2-801e-31531e319288',
      authority: 'https://login.microsoftonline.com/7cb752a7-6dfd-429e-adc9-129f0ea3fcec',
      redirectUri: '/',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    
  };