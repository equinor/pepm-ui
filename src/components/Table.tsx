/* eslint-disable max-lines-per-function */
import { Button, Chip } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AnalogueModelsService } from '../api/generated';
import * as Styled from './Table.styled';

export const Table = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
  });

  const navigate = useNavigate();

  if (isLoading || !data?.success) return <p>Loading...</p>;

  return (
    <Styled.StyledDiv>
      <EdsDataGrid
        enableSorting
        enablePagination
        emptyMessage="Empty :("
        rows={data.data}
        pageSize={5}
        columns={[
          {
            accessorKey: 'analogueModelId',
            header: 'Model ID',
            id: 'analogueModelId',
          },
          { accessorKey: 'name', header: 'Name', id: 'name' },
          {
            accessorKey: 'description',
            header: 'Description',
            id: 'description',
          },
          {
            accessorKey: 'isApproved',
            header: 'Result',
            cell: () => <Chip>{'Approved'}</Chip>,
          },
          {
            accessorKey: 'modified',
            header: 'Last Modified',
            cell: () => <div>{'<Last Modified>'}</div>,
          },
          {
            accessorKey: 'analogue',
            header: 'Analogue',
            cell: () => <div>{'<Analogue>'}</div>,
          },
          {
            accessorKey: 'formation',
            header: 'Formation',
            cell: () => <div>{'<Formation>'}</div>,
          },
          {
            accessorKey: 'field',
            header: 'Field',
            cell: () => <div>{'<Field>'}</div>,
          },
          {
            accessorKey: 'isProcessed',
            header: 'Status',
            id: 'isProcessed',
          },

          {
            accessorKey: 'navigate',
            cell: ({ row }) => (
              <Button
                onClick={() => {
                  navigate(`/model/${row.original.analogueModelId}/details`);
                }}
              >
                Go to model
              </Button>
            ),
            header: '',
            id: 'navigate',
          },
        ]}
      />
    </Styled.StyledDiv>
  );
};
