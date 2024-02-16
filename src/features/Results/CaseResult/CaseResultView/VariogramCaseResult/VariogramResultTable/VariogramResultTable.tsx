/* eslint-disable max-lines-per-function */
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { GetVariogramResultsDto } from '../../../../../../api/generated';
import { useFetchCases } from '../../../../../../hooks/useFetchCases';
import * as Styled from './VariogramResultTable.styled';

const NumberOfDecimals = 3;

export const VariogramResultTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const caseList = useFetchCases();
  const roundResultString = (value?: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    }
  };

  return (
    <Styled.Table>
      <EdsDataGrid
        enableSorting
        enablePagination
        enableColumnFiltering
        emptyMessage="Empty
        :("
        columnResizeMode="onChange"
        rows={resultList}
        pageSize={50}
        columns={[
          {
            accessorKey: 'method',
            id: 'method',
            header: 'Compute method',
            cell: ({ row }) => (
              <div>
                {
                  caseList.data?.data.filter(
                    (c) => c.computeCaseId === row.original.computeCaseId,
                  )[0].computeMethod.name
                }
              </div>
            ),
          },
          {
            accessorKey: 'attribute',
            header: 'Parameter',
            id: 'attribute',
          },
          {
            accessorKey: 'archelFilter',
            header: 'Archel Filter',
            id: 'archelFilter',
            enableColumnFilter: false,
          },
          {
            accessorKey: 'modelArea',
            header: 'Model area',
            id: 'modelArea',
            cell: ({ row }) => (
              <div>
                {
                  caseList.data?.data.filter(
                    (c) => c.computeCaseId === row.original.computeCaseId,
                  )[0].modelArea.name
                }
              </div>
            ),
          },
          {
            accessorKey: 'family',
            header: 'Variogram model',
            id: 'family',
            enableColumnFilter: false,
          },
          {
            accessorKey: 'quality',
            header: 'Quailty factor',
            id: 'quality',
            enableColumnFilter: false,
            cell: ({ row }) => (
              <div>{roundResultString(row.original.quality)}</div>
            ),
          },
        ]}
      />
    </Styled.Table>
  );
};
