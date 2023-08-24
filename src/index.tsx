import { MsalProvider } from '@azure/msal-react'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { apiClient } from './auth/apiClient'
import { msalInstance } from './auth/msalClient'
import { queryClient } from './auth/queryClient'
import { ApiClientProvider } from './context/ApiClientProvider'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { router } from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ApiClientProvider client={apiClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApiClientProvider>
    </MsalProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
