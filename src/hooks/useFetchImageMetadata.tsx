import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';
import { AnalogueModelImagesService } from '../api/generated';

export const useFetchImageMetadata = (imageId: string) => {
  const { modelId = '' } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['analogue-model-image-metadata', modelId, imageId],
    queryFn: () =>
      AnalogueModelImagesService.getApiAnalogueModelsImagesMetadata(
        modelId,
        imageId,
      ),
    enabled: !!token && modelId !== '',
  });

  return query;
};
