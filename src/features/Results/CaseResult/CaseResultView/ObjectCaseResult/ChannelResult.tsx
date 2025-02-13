import {
  ComputeCaseDto,
  GetObjectResultsDto,
} from '../../../../../api/generated';
import * as Styled from './ChannelResult.styled';
import { ChannelResultTable } from './ChannelResultTable/ChannelResultTable';
import { ResultArea } from './ResultArea/ResultArea';

export const ChannelResult = ({
  data,
  computeCase,
}: {
  data: GetObjectResultsDto;
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
  const computeMethod = caseFilter && caseFilter.computeMethod;

  return (
    <Styled.Wrapper>
      <ResultArea
        computeMethod={computeMethod}
        modelArea={modelArea}
        data={data}
      ></ResultArea>
      <ChannelResultTable
        data={data}
        computeMethod={computeMethod}
      ></ChannelResultTable>
    </Styled.Wrapper>
  );
};
