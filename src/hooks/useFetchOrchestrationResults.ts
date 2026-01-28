import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1Delft3dOrchestrationsByOrchestrationIdResults } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export const useFetchOrchestrationResults = (
  orchestrationId: string | null | undefined,
) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['orchestration-results', orchestrationId],
    queryFn: async () => {
      if (!orchestrationId) return null;

      const response =
        await getApiV1Delft3dOrchestrationsByOrchestrationIdResults({
          path: {
            orchestrationId,
          },
        });
      return response.data || null;
    },
    enabled: !!token && !!orchestrationId,
  });
};
