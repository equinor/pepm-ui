import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { AnaloguesService } from '../api/generated';
import { useAccessToken } from './useAccessToken';

export const useFetchAnalogues = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => AnaloguesService.getApiAnalogues(),
    enabled: !!token,
  });
  return query;
};
