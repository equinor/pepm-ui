import { useMsal } from '@azure/msal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import AppBar from '../features/AppBar/AppBar'

export function PEPM() {
  const { instance } = useMsal()
  const queryClient = new QueryClient()

  return (
    <>
      <AppBar title="PEPM" />
      <p>Authenticated</p>
      <button onClick={() => instance.logoutRedirect()}>Log out</button>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  )
}
