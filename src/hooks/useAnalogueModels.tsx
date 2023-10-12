/* eslint-disable max-lines-per-function */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import { useApiClient } from '../context/ApiClientProvider';
import { paths } from '../models/schema';
import { useAccessToken } from './useAccessToken';

type UseQueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // custom options
    params?: { path: { id: string } };
  };

const ANALOGUEMODELS_KEY = '/api/analogue-models';
const ANALOGUEMODEL_KEY = '/api/analogue-models/{id}';
const NC_FILE_KEY = '/api/analogue-models/{id}/input-models';

export function useAnalogueModels(id: string) {
  const apiClient = useApiClient();
  const token = useAccessToken();
  const headers = new Headers({ Authorization: `Bearer ${token}` });

  async function fetchModels(): AnalogueModelResponse {
    const { data } = await apiClient.GET(ANALOGUEMODELS_KEY, {
      headers: headers,
    });
    return data;
  }

  async function fetchModel(id: string): AnalogueModelResponse {
    const params = { path: { id } };

    const { data } = await apiClient.GET(ANALOGUEMODEL_KEY, {
      params,
      headers: headers,
    });

    return data;
  }

  async function createModel({
    body,
  }: UseQueryOptions<paths[typeof ANALOGUEMODELS_KEY]['post']>) {
    const { data } = await apiClient.POST(ANALOGUEMODELS_KEY, {
      body,
      headers: headers,
    });
    return data;
  }

  async function uploadNCFile(id: string, file: File) {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENV;
    const form = new FormData();
    form.append('file', file);
    const { data } = await axios.post(NC_FILE_KEY.replace('{id}', id), form, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  const models = useQuery(['models', token], fetchModels, { enabled: !!token });
  // TODO: might want to add queryFn to this:

  const model: AnalogueModel = useQuery({
    queryKey: ['model', token, id],
    queryFn: () => fetchModel(id),

    enabled: !!id,
  });

  return {
    model,
    createModel,
    models,
    uploadNCFile,
  };
}
