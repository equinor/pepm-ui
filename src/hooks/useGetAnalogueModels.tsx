import { useQuery } from '@tanstack/react-query'
import { useApiClient } from '../context/ApiClientProvider'
import { useAccessToken } from './useToken'

// type UseQueryOptions<T> = Params<T> &
//   RequestBody<T> & {
//     options?: T
//     reactQuery?: {
//       enabled: boolean
//     }
//   }

const ANALOGUEMODELS_KEY = '/api/analoguemodels'

export function useGetAnalogueModels() {
  const apiClient = useApiClient()
  const token = useAccessToken()

  return useQuery(
    [ANALOGUEMODELS_KEY, token],
    async ({ signal }) =>
      await apiClient
        .GET(ANALOGUEMODELS_KEY, {
          signal, // allows React Query to cancel request
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        })
        .then((response) => response.data?.data)
    // React Query expects errors to be thrown to show a message
    // throw new Error(error.message)
  )
}
