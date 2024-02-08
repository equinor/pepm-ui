import { Table } from '@equinor/eds-core-react';
import { GetVariogramResultsDto } from '../../../../../api/generated';

export const VariogramResultTable = ({
  data,
}: {
  data: GetVariogramResultsDto;
}) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Quality factor</Table.Cell>
          <Table.Cell>{data.quality}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Model area</Table.Cell>
          <Table.Cell>--Data--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Compute method</Table.Cell>
          <Table.Cell>--Method--</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Attribute</Table.Cell>
          <Table.Cell>{data.attribute ? data.attribute : '--'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Variogram model</Table.Cell>
          <Table.Cell>{data.family}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Sigma</Table.Cell>
          <Table.Cell>{data.sigma}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
