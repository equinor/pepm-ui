import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { MetadataService } from '../api/generated';
import { useAccessToken } from './useAccessToken';

export const useFetchMetadata = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['metadata'],
    queryFn: () => MetadataService.getApiMetadata(),
    enabled: !!token,
  });

  return query;
};
