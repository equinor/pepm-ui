import { Table } from '@equinor/eds-core-react';
import { ResultObjectType } from '../TanStackTable/TanStackTable';
import * as Styled from './SubRowResultItem.styled';

export const SubRowResultItem = ({
  resultList,
}: {
  resultList: ResultObjectType[];
}) => {
  return (
    <Styled.TableWrapper>
      <Table>
        <Table.Head>
          <Styled.HeaderContent>
            <Table.Cell>Variogram model</Table.Cell>
            <Table.Cell>Range major (m)</Table.Cell>
            <Table.Cell>Range minor (m)</Table.Cell>
            <Table.Cell>Azimuth (deg)</Table.Cell>
            <Table.Cell>Range vertical (m)</Table.Cell>
            <Table.Cell>SILL/STD (m)</Table.Cell>
          </Styled.HeaderContent>
        </Table.Head>
        <Table.Body>
          {resultList.map((resultItem) => (
            <Table.Row key={resultItem.computeCaseId + resultItem.quality}>
              <Table.Cell>{resultItem.variogramModel}</Table.Cell>
              <Table.Cell>{resultItem.rmajor}</Table.Cell>
              <Table.Cell>{resultItem.rminor}</Table.Cell>
              <Table.Cell>{resultItem.azimuth}</Table.Cell>
              <Table.Cell>{resultItem.rvertical}</Table.Cell>
              <Table.Cell>{resultItem.sigma}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Styled.TableWrapper>
  );
};
