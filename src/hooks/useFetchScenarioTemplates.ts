import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';
import { getApiV1Scenariotemplates } from '../api/generated';

export const useFetchScenarioTemplates = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['scenario-templates'],
    queryFn: () => getApiV1Scenariotemplates({}),
    enabled: !!token,
  });

  return query;
};
