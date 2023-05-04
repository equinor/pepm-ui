import { Configuration, PopupRequest } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AAD_TENANT_ID}`,
    redirectUri: process.env.REACT_APP_AAD_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_AAD_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
}

const protectedResources = {
  endpoint: process.env.REACT_APP_BACKEND_URL,
  scopes: {
    read: [process.env.REACT_APP_BACKEND_API_SCOPE as string],
  },
}

// Scopes for id token to be used at MS Identity Platform endpoints
export const loginRequest: PopupRequest = {
  scopes: [...protectedResources.scopes.read],
}

export const apiConfig = {
  baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
}

// Endpoints for MS Graph API services
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft-ppe.com/v1.0/me',
}
