import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { getApiV1Outcrops } from '../api/generated';
import { useAccessToken } from './useAccessToken';

export const useFetchOutcrops = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => getApiV1Outcrops(),
    enabled: !!token,
  });
  return query;
};
