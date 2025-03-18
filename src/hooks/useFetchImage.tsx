/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';
import { usePepmContextStore } from '../stores/GlobalStore';
import { getAnalogueModelImage } from '../api/custom/getAnalogueModelImageById';
import { client } from '../api/generated/client.gen';

export const useFetchImage = () => {
  const { analogueModel } = usePepmContextStore();
  const token = client.getConfig().auth;

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
