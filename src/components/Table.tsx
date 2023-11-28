/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Scrim, SideSheet } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalogueModelsService, OpenAPI } from '../api/generated';
import { useAccessToken } from '../hooks/useAccessToken';
import { AreaCoordinates } from './AreaCoordinates/AreaCoordinates';
import * as Styled from './Table.styled';

export const Table = ({ refetchKey }: { refetchKey: number }) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  const [toggle, setToggle] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>();
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models', refetchKey],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
    enabled: !!token,
  });

  if (isLoading || !data?.success) return <p>Loading...</p>;

  return (
    <Styled.Table>
      <EdsDataGrid
        enableSorting
        enablePagination
        enableColumnFiltering
        emptyMessage="Empty :("
        columnResizeMode="onChange"
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
            enableColumnFilter: false,
          },
          {
            accessorKey: 'isProcessed',
            header: 'Status',
            id: 'isProcessed',
          },

          {
            accessorKey: 'navigate',
            enableColumnFilter: false,
            cell: ({ row }) => (
              <Button
                onClick={() => {
                  navigate(`/${row.original.analogueModelId}/details`);
                }}
              >
                Go to model
              </Button>
            ),
            header: '',
            id: 'navigate',
          },
          {
            accessorKey: 'areas',
            enableColumnFilter: false,
            cell: ({ row }) => (
              <Button
                onClick={() => {
                  setActiveModel(row.original.analogueModelId);
                  setToggle(!toggle);
                }}
              >
                Set Areas
              </Button>
            ),
            header: '',
            id: 'areas',
          },
        ]}
      />
      {activeModel && (
        <Scrim open={toggle}>
          <SideSheet open={toggle} onClose={() => setToggle(!toggle)}>
            <AreaCoordinates modelId={activeModel} />
          </SideSheet>
        </Scrim>
      )}
    </Styled.Table>
  );
};
