import { useQuery } from '@tanstack/react-query';

import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { AnalogueModelComputeCasesService } from '../api/generated';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from './GlobalState';

export const useFetchCases = () => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { setComputeCases } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['model-cases', modelId],
    queryFn: () =>
      AnalogueModelComputeCasesService.getApiAnalogueModelsComputeCases(
        modelId as string,
      ),
    enabled: !!token,
    refetchInterval: 30000,
  });

  if (query.data?.data) setComputeCases(query.data.data);

  return query;
};
