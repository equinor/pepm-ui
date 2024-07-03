/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';

import { GetObjectResultsDto } from '../../../../../../api/generated/models/GetObjectResultsDto';
import * as Styled from './ChannelResultTable.styled';

const NumberOfDecimals = 2;

export const ChannelResultTable = ({
  data,
  computeMethod,
}: {
  data: GetObjectResultsDto;
  computeMethod?: string;
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
          <Styled.InfoCell></Styled.InfoCell>
          <Styled.DataCell>Mean</Styled.DataCell>
          <Styled.DataCell>Standard deviation (SD)</Styled.DataCell>
          <Styled.DataCell>Count</Styled.DataCell>
        </Table.Row>
      </Table.Head>
      <Table.Body key={data.computeCaseId}>
        <Table.Row>
          <Styled.ColumnCell>{computeMethod} width</Styled.ColumnCell>
          <Styled.DataCell>
            {roundResultString(data.width?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>{roundResultString(data.width?.sd)}</Styled.DataCell>
          <Styled.DataCell>{data.width?.count}</Styled.DataCell>
        </Table.Row>
        <Table.Row>
          <Styled.ColumnCell>{computeMethod} height</Styled.ColumnCell>
          <Styled.DataCell>
            {roundResultString(data.height?.mean)}
          </Styled.DataCell>
          <Styled.DataCell>
            {roundResultString(data.height?.sd)}
          </Styled.DataCell>
          <Styled.DataCell>{data.height?.count}</Styled.DataCell>
        </Table.Row>
        {computeMethod === 'Mouthbar' ? (
          <Table.Row>
            <Styled.ColumnCell>{computeMethod} length</Styled.ColumnCell>
            <Styled.DataCell>
              {roundResultString(data.length?.mean)}
            </Styled.DataCell>
            <Styled.DataCell>
              {roundResultString(data.length?.sd)}
            </Styled.DataCell>
            <Styled.DataCell>{data.length?.count}</Styled.DataCell>
          </Table.Row>
        ) : (
          <></>
        )}
      </Table.Body>
    </Styled.Table>
  );
};
