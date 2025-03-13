import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';
import { AnalogueModelImagesService } from '../api/generated';
import { usePepmContextStore } from '../stores/GlobalStore';

export const useFetchImageMetadata = () => {
  const { analogueModel } = usePepmContextStore();
  const { modelId = '' } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const imageId = analogueModel.analogueModelImage?.analogueModelImageId
    ? analogueModel.analogueModelImage.analogueModelImageId
    : '';

  const query = useQuery({
    queryKey: ['analogue-model-image-metadata', modelId, imageId],
    queryFn: () =>
      AnalogueModelImagesService.getApiV1AnalogueModelsImagesMetadata(
        modelId,
        imageId,
      ),
    enabled: !!token && modelId !== '' && imageId !== '',
  });

  return query;
};
