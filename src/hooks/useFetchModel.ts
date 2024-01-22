import { useQuery } from '@tanstack/react-query';
import { AnalogueModelsService } from '../api/generated/services/AnalogueModelsService';

import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';

export const useFetchModel = (id?: string) => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const ID = id ? id : (modelId as string);

  const query = useQuery({
    queryKey: ['analogue-model', ID],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(ID),
    enabled: !!token,
  });

  return query;
};
