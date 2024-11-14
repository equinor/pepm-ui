import { Typography } from '@equinor/eds-core-react';
import { AreaCoordinateType } from '../../AreaCoordinates/AreaCoordinates';
import { ModelImageCanvas } from './ModelImageCanvas/ModelImageCanvas';
import { CanvasWrapper } from './AnalogueModelImageView.styled';
import { usePepmContextStore } from '../../../hooks/GlobalState';

export const AnalogueModelImageView = ({
  coordinateBox,
}: {
  coordinateBox: AreaCoordinateType;
}) => {
  const { analogueModelImageURL, analogueModelImageMetadata } =
    usePepmContextStore();

  return (
    <>
      {!analogueModelImageURL && <Typography>Loading ...</Typography>}
      {analogueModelImageURL && analogueModelImageMetadata && (
        <CanvasWrapper>
          <ModelImageCanvas
            imageData={analogueModelImageURL}
            imageMetadata={analogueModelImageMetadata}
            coordinateBox={coordinateBox}
            showLegend={true}
            showCoordinates={true}
          />
        </CanvasWrapper>
      )}
    </>
  );
};
