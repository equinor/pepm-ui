import { useMsal } from '@azure/msal-react'
import { Outlet } from 'react-router-dom'
import AppBar from '../features/AppBar/AppBar'

export function PEPM() {
  const { instance } = useMsal()

  return (
    <>
      <AppBar title="PEPM" />
      <p>Authenticated</p>
      <button onClick={() => instance.logoutRedirect()}>Log out</button>
      <Outlet />
    </>
  )
}
