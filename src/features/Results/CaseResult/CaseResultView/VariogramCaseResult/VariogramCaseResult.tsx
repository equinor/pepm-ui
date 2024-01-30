import { Table } from '@equinor/eds-core-react';
import { CaseCardComponent } from '../../../../../components/CaseCardComponent/CaseCardComponent';
import { ImageView } from '../../../../../components/ImageView/ImageView';
import { VariogramResultListType } from '../../../../../pages/ModelPages/Results/VariogramResults/VariogramResults';
import * as Styled from './VariogramCaseResult.styled';

export const VariogramCaseResult = ({
  caseList,
  img,
}: {
  caseList: VariogramResultListType[];
  img: string;
}) => {
  return (
    <>
      {caseList.map((caseItem) => (
        <CaseCardComponent key={caseItem.caseId} title={caseItem.title}>
          {caseItem.resultList.map((item) => (
            <Styled.CaseResultCard key={item.identifier}>
              <ImageView text="run" img={img} altText="run"></ImageView>
              <Styled.CaseLeftDiv>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Quality factor</Table.Cell>
                      <Table.Cell>{item.quality}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Model area</Table.Cell>
                      <Table.Cell>{item.modelArea}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Compute method</Table.Cell>
                      <Table.Cell>{item.computeMethod}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Attribute</Table.Cell>
                      <Table.Cell>{item.attribute}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Variogram model</Table.Cell>
                      <Table.Cell>{item.family}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Sigma</Table.Cell>
                      <Table.Cell>{item.sigma}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Styled.CaseLeftDiv>
            </Styled.CaseResultCard>
          ))}
        </CaseCardComponent>
      ))}
    </>
  );
};
