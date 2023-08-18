import { useMsal } from '@azure/msal-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { queryClient } from '../auth/queryClient'
import AppBar from '../features/AppBar/AppBar'

export function PEPM() {
  const { instance } = useMsal()

  return (
    <QueryClientProvider client={queryClient}>
      <AppBar title="PEPM" />
      <p>Authenticated</p>
      <button onClick={() => instance.logoutRedirect()}>Log out</button>
      <Outlet />
    </QueryClientProvider>
  )
}
