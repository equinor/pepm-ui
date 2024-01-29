/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';

import { GetResultDto } from '../../../../../api/generated';
import * as Styled from './ChannelResultTable.styled';

const NumberOfDecimals = 2;

export const ChannelResultTable = ({ data }: { data: GetResultDto }) => {
  const filterValues = (name: string) => {
    return data.resultValues.filter((d) => d.name === name);
  };

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
    <Styled.Table>
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
    </Styled.Table>
  );
};
