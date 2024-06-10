import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { MetadataService } from '../api/generated';
import { useAccessToken } from './useAccessToken';

export const useFetchGrossDepData = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['smda-GDE'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataGeologyStandards(),
    enabled: !!token,
  });

  return query;
};
