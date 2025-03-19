import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { apiConfig, loginRequest, msalConfig } from './authConfig';
import { client } from '../api/generated/client.gen';

const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases
// Default to using the first account if no account is active on page load
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise();

  const token = await msalInstance.acquireTokenSilent(loginRequest);
  if (token) {
    client.setConfig({
      baseURL: apiConfig.baseUrl,
      auth: token.accessToken,
    });
  }
}

// Set active account
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);

    msalInstance.acquireTokenSilent(loginRequest).then((token) => {
      client.setConfig({
        baseURL: apiConfig.baseUrl,
        auth: token.accessToken,
      });
    });
  }
});

export { msalInstance };
