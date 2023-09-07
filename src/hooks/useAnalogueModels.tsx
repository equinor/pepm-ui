import { useQuery } from '@tanstack/react-query'
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch'
import { useApiClient } from '../context/ApiClientProvider'
import { paths } from '../models/schema'
import { useAccessToken } from './useAccessToken'

type UseQueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // add your custom options here
    // token: string
  }

const ANALOGUEMODELS_KEY = '/api/analoguemodels'

export function useAnalogueModels() {
  const apiClient = useApiClient()
  const token = useAccessToken()
  const headers = new Headers({ Authorization: `Bearer ${token}` })

  async function fetchModels() {
    const { data } = await apiClient.GET(ANALOGUEMODELS_KEY, {
      headers: headers,
    })
    return data
  }

  async function createModel({
    body,
  }: UseQueryOptions<paths[typeof ANALOGUEMODELS_KEY]['post']>) {
    const { data } = await apiClient.POST(ANALOGUEMODELS_KEY, {
      body,
      headers: headers,
    })
    return data
  }

  // PathsWithMethod<paths, 'get'>
  // async function get(url: string) {
  //   const { data } = await apiClient.GET(url, {
  //     headers: headers,
  //   })
  //   return data
  // }

  // async function get({ signal }: { signal: AbortSignal | undefined }) {
  //   const { data } = await apiClient.GET(ANALOGUEMODELS_KEY, {
  //     signal, // allows React Query to cancel request
  //     headers: new Headers({ Authorization: `Bearer ${token}` }),
  //   })
  //   return data
  // }

  const models = useQuery(
    [ANALOGUEMODELS_KEY, token],
    async () => await fetchModels()
  )

  return { fetchModels, createModel, models }

  // return useQuery(
  //   [ANALOGUEMODELS_KEY, token],
  //   async ({ signal }) =>
  //     await apiClient
  //       .GET(ANALOGUEMODELS_KEY, {
  //         signal, // allows React Query to cancel request
  //         headers: new Headers({ Authorization: `Bearer ${token}` }),
  //       })
  //       .then((response) => response.data?.data)
  // )
}
