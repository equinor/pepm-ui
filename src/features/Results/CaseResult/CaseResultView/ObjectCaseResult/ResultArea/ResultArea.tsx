/* eslint-disable max-lines-per-function */
import { Label, Typography } from '@equinor/eds-core-react';
import { GetChannelResultsDto } from '../../../../../../api/generated';
import * as Styled from './ResultArea.styled';

export const ResultArea = ({
  computeMethod,
  modelArea,
  data,
}: {
  computeMethod?: string;
  modelArea: string;
  data: GetChannelResultsDto;
}) => {
  const xCoordinate = data.box?.filter((b) => b.m === 0)[0];
  const yCoordinate = data.box?.filter((b) => b.m === 1)[0];

  const xLength = () => {
    if (xCoordinate && yCoordinate) return yCoordinate?.x - xCoordinate?.x;
  };

  const yLength = () => {
    if (xCoordinate && yCoordinate) {
      const value = yCoordinate?.y - xCoordinate?.y;
      return value;
    }
  };

  const area = () => {
    const x = xLength();
    const y = yLength();

    if (x && y) return x * y + ' m^2';
  };

  return (
    <Styled.Wrapper>
      <Styled.Info>
        <div>
          <Typography variant="h5"> {computeMethod}</Typography>
          <Typography variant="body_short"> {modelArea}</Typography>
        </div>
        <div>
          <Label label="Area size"></Label>
          <Typography variant="body_short">{area() ? area() : '-'}</Typography>
        </div>
      </Styled.Info>
      <Styled.Coordinates>
        <Styled.CoordinateRow>
          <Styled.RowElement>
            <Label label="X start"></Label>
            <Typography variant="body_short">
              {modelArea === 'Whole model' ? '-' : xCoordinate?.x + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="X length"></Label>
            <Typography variant="body_short">
              {modelArea === 'Whole model' ? '-' : xLength() + ' m'}
            </Typography>
          </Styled.RowElement>
        </Styled.CoordinateRow>
        <Styled.CoordinateRow>
          <Styled.RowElement>
            <Label label="Y start"></Label>
            <Typography variant="body_short">
              {modelArea === 'Whole model' ? '-' : yCoordinate?.x + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="Y length"></Label>
            <Typography variant="body_short">
              {modelArea === 'Whole model' ? '-' : yLength() + ' m'}
            </Typography>
          </Styled.RowElement>
        </Styled.CoordinateRow>
      </Styled.Coordinates>
    </Styled.Wrapper>
  );
};
