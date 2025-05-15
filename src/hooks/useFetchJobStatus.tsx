import { useQuery } from '@tanstack/react-query';

import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';
import { getApiV1JobsByIdStatus } from '../api';

export const useFetchJobStatus = (id: string | undefined) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const query = useQuery({
    queryKey: ['jobs', id],
    queryFn: () =>
      getApiV1JobsByIdStatus({
        path: { id: id as string },
      }),
    enabled: !!token && id !== undefined,
    refetchInterval: 30000,
  });

  return query;
};
