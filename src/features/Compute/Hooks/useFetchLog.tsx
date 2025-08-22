import { useQuery } from '@tanstack/react-query';

import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { getApiV1DownloadsAnalogueModelsByIdComputeCaseByComputeCaseId } from '../../../api/generated';

export const useFetchLog = (computeCaseId: string) => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['compute-case-log', modelId, computeCaseId],
    queryFn: () =>
      getApiV1DownloadsAnalogueModelsByIdComputeCaseByComputeCaseId({
        path: { id: modelId as string, computeCaseId: computeCaseId as string },
      }),
    enabled: !!token,
    refetchInterval: 30000,
  });

  return query;
};
