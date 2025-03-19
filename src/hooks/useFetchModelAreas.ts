import { useQuery } from '@tanstack/react-query';
import { getApiV1Modelareatype } from '../api/generated';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';

export const useFetchModelAreas = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['model-area'],
    queryFn: () => getApiV1Modelareatype(),
    enabled: !!token,
  });

  return query;
};
