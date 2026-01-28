import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1Scenarios } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export const useFetchScenarios = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['scenarios'],
    queryFn: async () => {
      const response = await getApiV1Scenarios();
      return response.data?.data || [];
    },
    enabled: !!token,
  });
};
