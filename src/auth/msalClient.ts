import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser'
import { msalConfig } from './authConfig'

const msalInstance = new PublicClientApplication(msalConfig)

// Account selection logic is app dependent. Adjust as needed for different use cases
// Default to using the first account if no account is active on page load
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

// Set active account
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult
    const account = payload.account
    msalInstance.setActiveAccount(account)
  }
})

export default msalInstance
