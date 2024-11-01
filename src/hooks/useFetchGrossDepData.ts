import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { MetadataService } from '../api/generated';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from './GlobalState';

export const useFetchGrossDepData = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { geologyStandards } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-GDE'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataGeologyStandards(),
    enabled: !!token && geologyStandards.length === 0,
  });

  return query;
};
