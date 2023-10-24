/* eslint-disable max-lines-per-function */
import { Button, Chip, Table, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
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
      <Styled.CaseResultList>
        <ResultMetadata caseNumner={0} img={Img}></ResultMetadata>
        <ResultMetadata caseNumner={1} img={Img1}></ResultMetadata>
        <ResultMetadata caseNumner={2} img={Img1}></ResultMetadata>
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};

export interface ResultMetadataType {
  identifier: number;
  family: string;
  indicator: string | null;
  attribute: string;
  quality: GLfloat;
  sigma: GLfloat;
  approved: string;
}

const ResultMetadata = ({
  caseNumner,
  img,
}: {
  caseNumner: number;
  img: string;
}) => {
  const [data, setData] = useState<ResultMetadataType[]>([
    {
      identifier: 0,
      family: 'exponential',
      indicator: null,
      attribute: 'Porosity',
      quality: 0.6427819811789964,
      sigma: 0.06967589201242001,
      approved: 'rejected',
    },
    {
      identifier: 1,
      family: 'gaussian',
      indicator: null,
      attribute: 'Porosity',
      quality: 0.5432924009373808,
      sigma: 0.0670758033212357,
      approved: 'pending',
    },
    {
      identifier: 2,
      family: 'general_exponential',
      indicator: null,
      attribute: 'Porosity',
      quality: 0.5580294305723851,
      sigma: 0.0678988627745677,
      approved: 'approved',
    },
  ]);

  const onApproveClick = () => {
    const dataList = [...data];
    const dataObj = { ...dataList[caseNumner] };
    dataObj.approved = 'approved';
    dataList[caseNumner] = dataObj;

    setData(dataList);
  };
  const onRejectClick = () => {
    const dataList = [...data];
    const dataObj = { ...dataList[caseNumner] };
    dataObj.approved = 'rejected';
    dataList[caseNumner] = dataObj;

    setData(dataList);
  };

  const onResetClick = () => {
    const dataList = [...data];
    const dataObj = { ...dataList[caseNumner] };
    dataObj.approved = 'pending';
    dataList[caseNumner] = dataObj;

    setData(dataList);
  };
  return (
    <Styled.CaseResultCard>
      <Styled.CaseLeftDiv>
        <Table>
          <Table.Body>
            <Table.Row key={data[caseNumner].identifier} className="table-row">
              <Table.Cell className="table-first-col">
                Quality factor
              </Table.Cell>
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
        <Styled.CaseResultStatus>
          <Styled.CaseStatusDisplay>
            <Typography variant="h4">Status: </Typography>
            {data[caseNumner].approved === 'approved' && (
              <Chip variant="active">Approved</Chip>
            )}
            {data[caseNumner].approved === 'pending' && <Chip>Pending</Chip>}
            {data[caseNumner].approved === 'rejected' && (
              <Chip variant="error">Not aproved</Chip>
            )}
          </Styled.CaseStatusDisplay>

          <Styled.CaseStatusButtons>
            <Button
              disabled={
                data[caseNumner].approved === 'approved' ||
                data[caseNumner].approved === 'rejected'
              }
              onClick={onApproveClick}
            >
              Approve
            </Button>
            <Button
              color="danger"
              disabled={
                data[caseNumner].approved === 'rejected' ||
                data[caseNumner].approved === 'approved'
              }
              onClick={onRejectClick}
            >
              Reject
            </Button>
            <Button
              variant="outlined"
              disabled={data[caseNumner].approved === 'pending'}
              onClick={onResetClick}
            >
              Reset
            </Button>
          </Styled.CaseStatusButtons>
        </Styled.CaseResultStatus>
      </Styled.CaseLeftDiv>

      <ImageView text="run" img={img} altText="run"></ImageView>
    </Styled.CaseResultCard>
  );
};
