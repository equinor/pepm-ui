import { useQuery } from '@tanstack/react-query';
import { ModelAreaTypeService } from '../api/generated';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';

export const useFetchModelAreas = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['model-area'],
    queryFn: () => ModelAreaTypeService.getApiModelareatype(),
    enabled: !!token,
  });

  return query;
};
