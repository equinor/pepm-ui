import { Table } from '@equinor/eds-core-react';
import { ResultObjectType } from '../TanStackTable/TanStackTable';
import * as Styled from './SubRowResultItem.styled';

export const SubRowResultItem = ({
  resultItem,
}: {
  resultItem: ResultObjectType;
}) => {
  return (
    <Styled.TableWrapper>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{resultItem.variogramModel}</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Styled.HeaderContent>
            <Table.Cell>Range major</Table.Cell>
            <Table.Cell>Range minor</Table.Cell>
            <Table.Cell>Azimuth</Table.Cell>
            <Table.Cell>Range vertical</Table.Cell>
            <Table.Cell>SILL/STD</Table.Cell>
          </Styled.HeaderContent>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{resultItem.rmajor}</Table.Cell>
            <Table.Cell>{resultItem.rminor}</Table.Cell>
            <Table.Cell>{resultItem.azimuth}</Table.Cell>
            <Table.Cell>{resultItem.rvertical}</Table.Cell>
            <Table.Cell>{resultItem.sigma}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Styled.TableWrapper>
  );
};
