import { useQuery } from '@tanstack/react-query';
import { ResultsService } from '../api/generated/services/ResultsService';

import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';

export const useFetchChannelResults = () => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['channel-results', modelId],
    queryFn: () =>
      ResultsService.getApiAnalogueModelsResultsChannel(modelId as string),
    enabled: !!token,
  });

  return query;
};
