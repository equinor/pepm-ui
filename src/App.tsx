import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react'
import { Outlet } from 'react-router-dom'
import * as Styled from './App.styled'
import AppBar from './features/AppBar/AppBar'
import { Footer } from './features/Footer/Footer'
import { NoAccess } from './pages/NoAccess/NoAccess'

export function App() {
  const { instance } = useMsal()

  return (
    <>
      <AuthenticatedTemplate>
        <AppBar title="PEPM" />
        <Styled.OutletWrapper>
          <Outlet />
        </Styled.OutletWrapper>
        <Footer text="All information is proprietary of Equinor © 2023 Equinor ASA" />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Not authenticated</p>
        <button onClick={() => instance.loginRedirect()}>Log in</button>
        <NoAccess />
      </UnauthenticatedTemplate>
    </>
  )
}
