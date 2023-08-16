import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'
import { PEPM } from './pages/PEPM'

export function App() {
  const { instance } = useMsal()

  return (
    <>
      <AuthenticatedTemplate>
        <PEPM />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Not authenticated</p>
        <button onClick={() => instance.loginRedirect()}>Log in</button>
      </UnauthenticatedTemplate>
    </>
  )
}
