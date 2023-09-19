import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch'
import { useApiClient } from '../context/ApiClientProvider'
import { paths } from '../models/schema'
import { useAccessToken } from './useAccessToken'

type UseQueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // custom options
    params?: {
      path: {
        id: string
      }
    }
  }

const ANALOGUEMODELS_KEY = '/api/analogue-models'
const ANALOGUEMODEL_KEY = '/api/analogue-models/{id}'
const NC_FILE_KEY = '/api/analogue-models/{id}/input-models'

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

  async function fetchModel({
    params,
  }: UseQueryOptions<paths[typeof ANALOGUEMODEL_KEY]['get']>) {
    const { data } = await apiClient.GET(ANALOGUEMODEL_KEY, {
      params,
      headers: new Headers({ Authorization: `Bearer ${token}` }),
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

  async function uploadNCFile(modelId: string, file: File) {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENV
    const form = new FormData()
    form.append('file', file)
    const { data } = await axios.post(
      NC_FILE_KEY.replace('{id}', modelId),
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  }

  const models = useQuery([ANALOGUEMODELS_KEY, token], fetchModels)

  return { fetchModels, fetchModel, createModel, models, uploadNCFile }
}
