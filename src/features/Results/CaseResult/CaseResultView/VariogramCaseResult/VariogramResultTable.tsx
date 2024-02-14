import { Table } from '@equinor/eds-core-react';
import { GetVariogramResultsDto } from '../../../../../api/generated';
import { useFetchCases } from '../../../../../hooks/useFetchCases';

const NumberOfDecimals = 3;

export const VariogramResultTable = ({
  data,
}: {
  data: GetVariogramResultsDto;
}) => {
  const roundResultString = (value?: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    }
  };
  const caseList = useFetchCases();
  const resultCase = caseList.data?.data.filter(
    (c) => c.computeCaseId === data.computeCaseId,
  );

  // console.log(data);
  // console.log(resultCase && resultCase[0]);

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Quality factor</Table.Cell>
          <Table.Cell>{roundResultString(data.quality)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Model area</Table.Cell>
          <Table.Cell>{resultCase && resultCase[0].modelArea.name}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Compute method</Table.Cell>
          <Table.Cell>
            {resultCase && resultCase[0].computeMethod.name}
          </Table.Cell>
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
          <Table.Cell>{roundResultString(data.sigma)}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
