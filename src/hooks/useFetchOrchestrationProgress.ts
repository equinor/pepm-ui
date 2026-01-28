import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1Delft3dOrchestrationsByOrchestrationIdSimulationProgress } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export const useFetchOrchestrationProgress = (
  orchestrationId: string | null | undefined,
) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['orchestration-progress', orchestrationId],
    queryFn: async () => {
      if (!orchestrationId) return null;

      const response =
        await getApiV1Delft3dOrchestrationsByOrchestrationIdSimulationProgress({
          path: {
            orchestrationId,
          },
        });
      return response.data?.data || null;
    },
    enabled: !!token && !!orchestrationId,
    refetchInterval: 10000, // Poll every 10 seconds for progress updates
  });
};
