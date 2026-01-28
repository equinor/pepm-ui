import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1ScenariosByScenarioId } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export const useFetchScenario = (scenarioId: string | undefined) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['scenario', scenarioId],
    queryFn: async () => {
      if (!scenarioId) return null;

      const response = await getApiV1ScenariosByScenarioId({
        path: {
          scenarioId,
        },
      });
      return response.data?.data || null;
    },
    enabled: !!token && !!scenarioId,
  });
};
