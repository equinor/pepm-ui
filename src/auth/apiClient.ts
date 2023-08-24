import createClient from 'openapi-fetch'
import { paths } from '../models/schema'
import { apiConfig } from './authConfig'

export const apiClient = createClient<paths>({
  baseUrl: apiConfig.baseUrl,
})

export type ApiClient = typeof apiClient
