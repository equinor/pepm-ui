/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';

import { GetChannelResultsDto } from '../../../../../api/generated';
import * as Styled from './ChannelResultTable.styled';

const NumberOfDecimals = 2;

export const ChannelResultTable = ({
  data,
}: {
  data: GetChannelResultsDto;
}) => {
  const roundResultString = (value?: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    }
  };

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
            {roundResultString(data.channelWidth?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>
            {roundResultString(data.channelWidth?.sd)}
          </Styled.DataCell>
          <Styled.DataCell>{data.channelWidth?.count}</Styled.DataCell>
        </Table.Row>
        <Table.Row>
          <Styled.ColumnCell>Channel height</Styled.ColumnCell>
          <Styled.DataCell>
            {roundResultString(data.channelHeight?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>
            {roundResultString(data.channelHeight?.sd)}
          </Styled.DataCell>
          <Styled.DataCell>{data.channelHeight?.count}</Styled.DataCell>
        </Table.Row>
      </Table.Body>
    </Styled.Table>
  );
};
