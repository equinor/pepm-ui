import { Typography } from '@equinor/eds-core-react';
import { getAnalogueModelImage } from '../../api/custom/getAnalogueModelImageById';
import { useQuery } from '@tanstack/react-query';
import { useFetchImageMetadata } from '../../hooks/useFetchImageMetadata';
import { AreaCoordinateType } from '../AreaCoordinates/AreaCoordinates';
import { ModelImageCanvas } from './ModelImageCanvas/ModelImageCanvas';
import { CanvasWrapper } from './AnalogueModelImageView.styled';

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
        <CanvasWrapper>
          <ModelImageCanvas
            imageData={data}
            imageMetadata={imageMetadata.data?.data}
            coordinateBox={coordinateBox}
            showLegend={true}
            showCoordinates={true}
          />
        </CanvasWrapper>
      )}
    </>
  );
};
