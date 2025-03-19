import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';
import { getApiV1AnalogueModelsByIdResultsVariogram } from '../api/generated';

export const useFetchVariogramResults = () => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['variogram-results', modelId],
    queryFn: () =>
      getApiV1AnalogueModelsByIdResultsVariogram({
        path: { id: modelId as string },
      }),
    enabled: !!token,
  });

  return query;
};
