import { Chip } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import * as Styled from './Table.styled';
import { useQuery } from '@tanstack/react-query';
import { AnalogueModelsService } from '../api/generated';

export const Table = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
  });
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
        ]}
      />
    </Styled.StyledDiv>
  );
};
