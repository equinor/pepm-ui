/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';

import * as Styled from './ChannelResultTable.styled';
import { GetObjectResultsDto } from '../../../../../../api/generated/models/GetObjectResultsDto';

const NumberOfDecimals = 2;

export const ChannelResultTable = ({ data }: { data: GetObjectResultsDto }) => {
  const roundResultString = (value?: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    }
  };

  return (
    <Styled.Table>
      <Table.Head>
        <Table.Row>
          <Styled.InfoCell></Styled.InfoCell>
          <Styled.DataCell>Mean</Styled.DataCell>
          <Styled.DataCell>Standard deviation (SD)</Styled.DataCell>
          <Styled.DataCell>Count</Styled.DataCell>
        </Table.Row>
      </Table.Head>
      <Table.Body key={data.computeCaseId}>
        <Table.Row>
          <Styled.ColumnCell>Channel width</Styled.ColumnCell>
          <Styled.DataCell>
            {roundResultString(data.width?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>{roundResultString(data.width?.sd)}</Styled.DataCell>
          <Styled.DataCell>{data.width?.count}</Styled.DataCell>
        </Table.Row>
        <Table.Row>
          <Styled.ColumnCell>Channel height</Styled.ColumnCell>
          <Styled.DataCell>
            {roundResultString(data.height?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>
            {roundResultString(data.height?.sd)}
          </Styled.DataCell>
          <Styled.DataCell>{data.height?.count}</Styled.DataCell>
        </Table.Row>
      </Table.Body>
    </Styled.Table>
  );
};
