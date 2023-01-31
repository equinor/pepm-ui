import { Configuration, PopupRequest } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: '3fba556e-5d4a-48e3-8e1a-fd57c12cb82e',
    authority: 'https://login.windows-ppe.net/common',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
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
