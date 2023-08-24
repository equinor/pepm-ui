import { createContext, useContext } from 'react'
import { ApiClient } from '../auth/apiClient'

type ApiClientProviderProps = { client: ApiClient; children: React.ReactNode }

const ApiClientContext = createContext<ApiClient | undefined>(undefined)

const ApiClientProvider = ({ client, children }: ApiClientProviderProps) => (
  <ApiClientContext.Provider value={client}>
    {children}
  </ApiClientContext.Provider>
)

function useApiClient(): ApiClient {
  const apiClient = useContext<ApiClient | undefined>(ApiClientContext)
  if (apiClient === undefined) {
    throw new Error('useApiClient must be used within a ApiClientProvider')
  }
  return apiClient
}

export { ApiClientProvider, useApiClient }
