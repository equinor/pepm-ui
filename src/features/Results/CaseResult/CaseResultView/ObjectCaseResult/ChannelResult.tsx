import { Typography } from '@equinor/eds-core-react';
import {
  ComputeCaseDto,
  GetChannelResultsDto,
} from '../../../../../api/generated';
import * as Styled from './ChannelResult.styled';
import { ChannelResultTable } from './ChannelResultTable';

export const ChannelResult = ({
  data,
  computeCase,
}: {
  data: GetChannelResultsDto;
  computeCase?: ComputeCaseDto[];
}) => {
  let modelArea = '';
  if (
    computeCase &&
    computeCase[0] &&
    computeCase[0].modelArea !== undefined &&
    computeCase[0].modelArea !== null
  )
    modelArea = computeCase && computeCase[0].modelArea.name;

  if (modelArea === '') modelArea = 'Whole model';
  const caseFilter = computeCase && computeCase[0];
  const computeMethod = caseFilter && caseFilter.computeMethod.name;

  return (
    <Styled.Wrapper>
      <Styled.InnerWrapper>
        <Styled.Info>
          <Typography variant="h5"> {computeMethod}</Typography>
          <Typography variant="body_short"> {modelArea}</Typography>
        </Styled.Info>
        <ChannelResultTable data={data}></ChannelResultTable>
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
};
