import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'
import { AppBar } from './features/AppBar/AppBar'

function App() {
  const { instance } = useMsal()

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <AppBar title={'PEPM'} />
        <p>Authenticated</p>
        <button onClick={() => instance.logoutRedirect()}>Log out</button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Not authenticated</p>
        <button onClick={() => instance.loginRedirect()}>Log in</button>
      </UnauthenticatedTemplate>
    </div>
  )
}

export default App
