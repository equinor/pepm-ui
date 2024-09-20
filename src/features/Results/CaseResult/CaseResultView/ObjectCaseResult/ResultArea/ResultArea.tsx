/* eslint-disable max-lines-per-function */

import {
  Button,
  Divider,
  Icon,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import { bar_chart as barChart } from '@equinor/eds-icons';
import { GetObjectResultsDto } from '../../../../../../api/generated/models/GetObjectResultsDto';
import * as Styled from './ResultArea.styled';

export const ResultArea = ({
  computeMethod,
  modelArea,
  data,
}: {
  computeMethod?: string;
  modelArea: string;
  data: GetObjectResultsDto;
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
      <Styled.ResultHeader>
        <Styled.MetadataWrapperDiv>
          <Styled.MetadataDiv>
            <Label label="Object type"></Label>
            <Typography variant="h5"> {computeMethod}</Typography>
          </Styled.MetadataDiv>
          <Styled.VerticalDivider />
          <Styled.MetadataDiv>
            <Label label="Area"></Label>
            <Typography variant="h5"> {modelArea}</Typography>
          </Styled.MetadataDiv>
        </Styled.MetadataWrapperDiv>

        <Button variant="outlined">
          <Icon data={barChart} title={'Open plot for case results.'} />
          Show plot
        </Button>
      </Styled.ResultHeader>

      <Styled.Divider>
        <Divider color="medium" variant="medium" size="1" />
      </Styled.Divider>
      <Styled.CoordinateDiv>
        <Styled.RowElement>
          <Label label="Area size"></Label>
          <Typography>{area() ? area() : '-'}</Typography>
        </Styled.RowElement>
        <Styled.VerticalDivider />
        <Styled.RowElement>
          <Label label="X start"></Label>
          <Typography>
            {modelArea === 'Whole model' ? '-' : xCoordinate?.x + ' m'}
          </Typography>
        </Styled.RowElement>
        <Styled.VerticalDivider />
        <Styled.RowElement>
          <Label label="X length"></Label>
          <Typography>
            {modelArea === 'Whole model' ? '-' : xLength() + ' m'}
          </Typography>
        </Styled.RowElement>
        <Styled.VerticalDivider />
        <Styled.RowElement>
          <Label label="Y start"></Label>
          <Typography>
            {modelArea === 'Whole model' ? '-' : yCoordinate?.x + ' m'}
          </Typography>
        </Styled.RowElement>
        <Styled.VerticalDivider />
        <Styled.RowElement>
          <Label label="Y length"></Label>
          <Typography>
            {modelArea === 'Whole model' ? '-' : yLength() + ' m'}
          </Typography>
        </Styled.RowElement>
      </Styled.CoordinateDiv>
    </Styled.Wrapper>
  );
};
