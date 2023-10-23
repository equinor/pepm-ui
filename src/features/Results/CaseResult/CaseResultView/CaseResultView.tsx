import { Table } from '@equinor/eds-core-react';
import { ImageView } from '../../../../components/ImageView/ImageView';
import { ResultType } from '../../../../pages/ModelPages/Results/Results';
import * as Styled from './CaseResultView.styled';
import Img from './vargrest_output-0-_variogram_slices_.png';
import Img1 from './vargrest_output-1-_variogram_slices_.png';
export const CaseResultView = () => {
  const caseResult: ResultType = {
    id: '1',
    case: 'Variogramcase 1',
    finished: true,
  };
  // const results: ResultType[] = [
  //   { id: '1', case: 'Variogramcase 1', finished: true },
  //   { id: '2', case: 'Variogramcase 2', finished: false },
  // ]

  return (
    <Styled.CaseResultView>
      <h2>Case Results</h2>
      <h3>{caseResult.case}</h3>
      <ResultMetadata caseNumner={0} img={Img}></ResultMetadata>
      <ResultMetadata caseNumner={1} img={Img1}></ResultMetadata>
    </Styled.CaseResultView>
  );
};

const ResultMetadata = ({
  caseNumner,
  img,
}: {
  caseNumner: number;
  img: string;
}) => {
  const data = [
    {
      identifier: 0,
      family: 'exponential',
      indicator: null,
      attribute: 'Porosity',
      quality: 0.6427819811789964,
      sigma: 0.06967589201242001,
    },
    {
      identifier: 1,
      family: 'gaussian',
      indicator: null,
      attribute: 'Porosity',
      quality: 0.5432924009373808,
      sigma: 0.0670758033212357,
    },
  ];

  return (
    <Styled.CaseResultCard>
      <Table>
        <Table.Body>
          <Table.Row key={data[caseNumner].identifier} className="table-row">
            <Table.Cell className="table-first-col">Quality factor</Table.Cell>
            <Table.Cell>{data[caseNumner].quality}</Table.Cell>
          </Table.Row>
          <Table.Row key={data[caseNumner].identifier} className="table-row">
            <Table.Cell className="table-first-col">Family</Table.Cell>
            <Table.Cell>{data[caseNumner].family}</Table.Cell>
          </Table.Row>
          <Table.Row key={data[caseNumner].identifier} className="table-row">
            <Table.Cell className="table-first-col">Attribute</Table.Cell>
            <Table.Cell>{data[caseNumner].attribute}</Table.Cell>
          </Table.Row>
          <Table.Row key={data[caseNumner].identifier} className="table-row">
            <Table.Cell className="table-first-col">Sigma</Table.Cell>
            <Table.Cell>{data[caseNumner].sigma}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ImageView text="run" img={img} altText="run"></ImageView>
    </Styled.CaseResultCard>
  );
};
