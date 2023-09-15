import { useQuery } from '@tanstack/react-query'
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch'
import { useApiClient } from '../context/ApiClientProvider'
import { paths } from '../models/schema'
import { useAccessToken } from './useAccessToken'

type UseQueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // add your custom options here
    params?: {
      path: {
        id: string
      }
    }
  }

const ANALOGUEMODELS_KEY = '/api/analogue-models'
const NC_FILE_KEY = '/api/analogue-models/{id}/netcdf-models'

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

  async function uploadNCFile({
    params,
    body,
  }: UseQueryOptions<paths[typeof NC_FILE_KEY]['post']>) {
    const { data } = await apiClient.POST(NC_FILE_KEY, {
      params,
      body,
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    })
    return data
  }

  // async function NC({
  //   params,
  //   body,
  // }: UseQueryOptions<paths[typeof NC_FILE_KEY]['post']>) {
  //   return useQuery(
  //     [NC_FILE_KEY, token, params.path.id],
  //     async () => await uploadNCFile(params, body)
  //   )
  // }

  const models = useQuery(
    [ANALOGUEMODELS_KEY, token],
    async () => await fetchModels()
  )

  return { fetchModels, createModel, models, uploadNCFile }
}
