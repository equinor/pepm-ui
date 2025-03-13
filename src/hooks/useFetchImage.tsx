/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from '../stores/GlobalStore';
import { getAnalogueModelImage } from '../api/custom/getAnalogueModelImageById';

export const useFetchImage = () => {
  const { analogueModel } = usePepmContextStore();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const imageId = analogueModel.analogueModelImage?.analogueModelImageId
    ? analogueModel.analogueModelImage.analogueModelImageId
    : '';

  const query = useQuery({
    queryKey: ['analogue-model-image', analogueModel.analogueModelId, imageId],
    queryFn: () =>
      getAnalogueModelImage(analogueModel.analogueModelId, imageId),
    enabled: !!token && imageId !== '',
  });

  return query;
};
