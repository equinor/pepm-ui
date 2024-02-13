import { useQuery } from '@tanstack/react-query';
import { ModelAreaTypeService } from '../api/generated';

export const useFetchModelAreas = () => {
  const query = useQuery({
    queryKey: ['model-area'],
    queryFn: () => ModelAreaTypeService.getApiModelareatype(),
  });

  return query;
};
