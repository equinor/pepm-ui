import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'

function App() {
  const { instance } = useMsal()

  return (
    <div className="App">
      <AuthenticatedTemplate>
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
