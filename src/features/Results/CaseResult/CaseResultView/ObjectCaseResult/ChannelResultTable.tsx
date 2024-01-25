/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';
import { CaseCardComponent } from '../../../../../components/CaseCardComponent/CaseCardComponent';

import { ComputeCaseDto, GetResultDto } from '../../../../../api/generated';
import * as Styled from './ChannelResultTable.styled';

const NumberOfDecimals = 2;

export const ChannelResultTable = ({
  data,
  computeCase,
}: {
  data: GetResultDto;
  computeCase?: ComputeCaseDto[];
}) => {
  const filterValues = (name: string) => {
    return data.resultValues.filter((d) => d.name === name);
  };

  let modelArea = '';
  if (
    computeCase &&
    computeCase[0] &&
    computeCase[0].modelArea !== undefined &&
    computeCase[0].modelArea !== null
  )
    modelArea = computeCase && computeCase[0].modelArea.name;

  if (modelArea === '') modelArea = 'Whole model';

  const roundResultString = (value: string) => {
    return parseFloat(value).toFixed(NumberOfDecimals);
  };

  const channelHeightCount = filterValues('channel-height_count');
  const channelHeightMean = filterValues('channel-height_mean');
  const channelHeightSD = filterValues('channel-height_sd');

  const channelWidthCount = filterValues('channel-width_count');
  const channelWidthMean = filterValues('channel-width_mean');
  const channelWidthSD = filterValues('channel-width_sd');

  return (
    <Styled.Wrapper>
      <CaseCardComponent
        title={data.resultType + ' Case'}
        subTitle={modelArea}
        resultCard={true}
      >
        <Table>
          <Table.Head>
            <Table.Row>
              <Styled.DataCell></Styled.DataCell>
              <Styled.DataCell>Mean</Styled.DataCell>
              <Styled.DataCell>Standard deviation (SD)</Styled.DataCell>
              <Styled.DataCell>Count</Styled.DataCell>
            </Table.Row>
          </Table.Head>
          <Table.Body key={data.computeCaseId}>
            <Table.Row>
              <Styled.ColumnCell>Channel width</Styled.ColumnCell>
              <Styled.DataCell>
                {roundResultString(channelWidthMean[0].value)}
              </Styled.DataCell>
              <Styled.DataCell>
                {roundResultString(channelWidthSD[0].value)}
              </Styled.DataCell>
              <Styled.DataCell>{channelWidthCount[0].value}</Styled.DataCell>
            </Table.Row>
            <Table.Row>
              <Styled.ColumnCell>Channel height</Styled.ColumnCell>
              <Styled.DataCell>
                {roundResultString(channelHeightMean[0].value)}
              </Styled.DataCell>
              <Styled.DataCell>
                {roundResultString(channelHeightSD[0].value)}
              </Styled.DataCell>
              <Styled.DataCell>{channelHeightCount[0].value}</Styled.DataCell>
            </Table.Row>
          </Table.Body>
        </Table>
      </CaseCardComponent>
    </Styled.Wrapper>
  );
};
