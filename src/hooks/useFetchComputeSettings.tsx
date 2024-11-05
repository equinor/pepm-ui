import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';
import { ComputeSettingsService } from '../api/generated';

export const useFetchComputeSettings = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['compute-settings'],
    queryFn: () => ComputeSettingsService.getApiComputeSettings(),
    enabled: !!token,
  });

  return query;
};
