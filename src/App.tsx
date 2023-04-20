import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'
import { Outlet } from 'react-router-dom'
import AppBar from './features/AppBar/AppBar'

function App() {
  const { instance } = useMsal()

  return (
    <>
      <AuthenticatedTemplate>
        <AppBar title="PEPM" />
        <p>Authenticated</p>
        <button onClick={() => instance.logoutRedirect()}>Log out</button>
        <Outlet />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Not authenticated</p>
        <button onClick={() => instance.loginRedirect()}>Log in</button>
      </UnauthenticatedTemplate>
    </>
  )
}

export default App
