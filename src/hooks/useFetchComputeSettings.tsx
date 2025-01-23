import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';
import { ComputeSettingsService } from '../api/generated';
import { useParams } from 'react-router-dom';

export const useFetchComputeSettings = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { modelId } = useParams();

  const query = useQuery({
    queryKey: ['compute-settings', modelId],
    queryFn: () =>
      ComputeSettingsService.getApiComputeSettings(modelId as string),
    enabled: !!token,
  });

  return query;
};
