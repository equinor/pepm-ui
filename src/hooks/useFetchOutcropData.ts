import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { OutcropsService } from '../api/generated';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from '../stores/GlobalStore';

export const useFetchOutcropData = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { outcrops } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['outcrop'],
    queryFn: () => OutcropsService.getApiV1Outcrops(),
    enabled: !!token && outcrops.length === 0,
  });

  return query;
};
