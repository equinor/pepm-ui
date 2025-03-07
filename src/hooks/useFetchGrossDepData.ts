import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { getApiV1MetadataSmdaMetadataGeologyStandards } from '../api/generated';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from './GlobalState';

export const useFetchGrossDepData = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { geologyStandards } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-GDE'],
    queryFn: () => getApiV1MetadataSmdaMetadataGeologyStandards(),
    enabled: !!token && geologyStandards.length === 0,
  });

  return query;
};
