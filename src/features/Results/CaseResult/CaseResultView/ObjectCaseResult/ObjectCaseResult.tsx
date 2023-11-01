/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';
import { CaseCardComponent } from '../../../../../components/CaseCardComponent/CaseCardComponent';
import { ObjectResultType } from '../../../../../pages/ModelPages/Results/Results';

import * as Styled1 from './ObjectCaseResult.styled';

export const ObjectCaseResult = ({ data }: { data: ObjectResultType }) => {
  return (
    <CaseCardComponent title="Case X">
      <Styled1.ResultCard>
        <Styled1.CaseTable>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Styled1.DataCell>Mean</Styled1.DataCell>
                <Styled1.DataCell>Standard deviation (SD)</Styled1.DataCell>
                <Styled1.DataCell>Count</Styled1.DataCell>
              </Table.Row>
            </Table.Head>
            <Table.Body key={data.identifier}>
              <Table.Row>
                <Styled1.ColumnCell>Channel width</Styled1.ColumnCell>
                <Styled1.DataCell>{data.CWMean}</Styled1.DataCell>
                <Styled1.DataCell>{data.CWSD}</Styled1.DataCell>
                <Styled1.DataCell>{data.CWCount}</Styled1.DataCell>
              </Table.Row>
              <Table.Row>
                <Styled1.ColumnCell>Channel height</Styled1.ColumnCell>
                <Styled1.DataCell>{data.CHMean}</Styled1.DataCell>
                <Styled1.DataCell>{data.CHSD}</Styled1.DataCell>
                <Styled1.DataCell>{data.CHCount}</Styled1.DataCell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Styled1.CaseTable>
      </Styled1.ResultCard>
    </CaseCardComponent>
  );
};
