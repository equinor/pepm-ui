import { Configuration, PopupRequest } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AAD_TENANT_ID}`,
    redirectUri: process.env.REACT_APP_AAD_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_AAD_REDIRECT_URI,
  },
}

// Scopes for id token to be used at MS Identity Platform endpoints
export const loginRequest: PopupRequest = {
  scopes: ['User.Read'],
}

// Endpoints for MS Graph API services
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft-ppe.com/v1.0/me',
}
