import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1Delft3dOrchestrationsByOrchestrationId } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export const useFetchOrchestration = (
  orchestrationId: string | null | undefined,
) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['orchestration', orchestrationId],
    queryFn: async () => {
      if (!orchestrationId) return null;

      const response = await getApiV1Delft3dOrchestrationsByOrchestrationId({
        path: {
          orchestrationId,
        },
      });
      return response.data?.data || null;
    },
    enabled: !!token && !!orchestrationId,
  });
};
