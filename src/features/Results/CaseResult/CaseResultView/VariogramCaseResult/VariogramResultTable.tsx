/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';

import { GetResultDto } from '../../../../../api/generated';

// const NumberOfDecimals = 2;

export const VariogramResultTable = ({ data }: { data: GetResultDto }) => {
  //   const filterValues = (name: string) => {
  //     return data.resultValues.filter((d) => d.name === name);
  //   };

  //   const roundResultString = (value: string) => {
  //     return parseFloat(value).toFixed(NumberOfDecimals);
  //   };

  //   const channelHeightCount = filterValues('channel-height_count');
  //   const channelHeightMean = filterValues('channel-height_mean');
  //   const channelHeightSD = filterValues('channel-height_sd');

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Quality factor</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Model area</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Compute method</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Attribute</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Variogram model</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Sigma</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
