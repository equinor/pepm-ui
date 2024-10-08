import { Typography } from '@equinor/eds-core-react';
import { getAnalogueModelImage } from '../../api/custom/getAnalogueModelImageById';
import { useQuery } from '@tanstack/react-query';
import Canvas from './Canvas';
import { useFetchImageMetadata } from '../../hooks/useFetchImageMetadata';
import { AreaCoordinateType } from '../AreaCoordinates/AreaCoordinates';

export const AnalogueModelImageView = ({
  modelId,
  imageId,
  coordinateBox,
}: {
  modelId: string;
  imageId: string;
  coordinateBox: AreaCoordinateType;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['analogue-model-image', modelId, imageId],
    queryFn: () => getAnalogueModelImage(modelId, imageId),
  });

  const imageMetadata = useFetchImageMetadata(imageId);

  return (
    <>
      {isLoading && <Typography>Loading ...</Typography>}
      {data && imageMetadata.data?.data && (
        <Canvas
          imageData={data}
          imageMetadata={imageMetadata.data?.data}
          coordinateBox={coordinateBox}
        />
      )}
    </>
  );
};
