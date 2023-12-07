/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import {
  Button,
  LinearProgress,
  Scrim,
  SideSheet,
} from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalogueModelsService, OpenAPI } from '../api/generated';
import { useAccessToken } from '../hooks/useAccessToken';
import { AreaCoordinates } from './AreaCoordinates/AreaCoordinates';
import * as Styled from './Table.styled';

export const Table = ({
  refetchKey,
  progress,
  activeUploadId,
}: {
  refetchKey: number;
  progress: number;
  activeUploadId: string;
}) => {
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

  const isActiveModel = (id: string) => {
    let isActive = false;
    let started = false;
    if (progress < 100 && id === activeUploadId) {
      isActive = true;
      started = true;
    }
    if (progress === 0 && started && id === activeUploadId) {
      isActive = false;
      started = false;
    }
    return isActive;
  };

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
            accessorKey: 'analogues',
            id: 'analogues',
            header: 'Analogue',
            enableColumnFilter: false,
            size: 120,
            cell: ({ row }) => (
              <>
                {row.original.analogues.map((a) => (
                  <p key={a.analogueId}>
                    {a.name} {', '}
                  </p>
                ))}
              </>
            ),
          },
          {
            accessorKey: 'formation',
            id: 'formation',
            header: 'Formation',
            enableColumnFilter: false,
            size: 120,
            cell: ({ row }) => (
              <>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Formation')
                  .map((f) => (
                    <p key={f.metadataId}>
                      {f.value} {', '}
                    </p>
                  ))}
              </>
            ),
          },
          {
            accessorKey: 'zone',
            id: 'zone',
            header: 'Zone',
            enableColumnFilter: false,
            size: 120,
            cell: ({ row }) => (
              <>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Zone')
                  .map((z) => (
                    <p key={z.metadataId}>
                      {z.value} {', '}
                    </p>
                  ))}
              </>
            ),
          },
          {
            accessorKey: 'field',
            id: 'field',
            header: 'Field',
            enableColumnFilter: false,
            cell: ({ row }) => (
              <>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Field')
                  .map((filed) => (
                    <p key={filed.metadataId}>
                      {filed.value} {', '}
                    </p>
                  ))}
              </>
            ),
          },

          {
            accessorKey: 'isProcessed',
            id: 'isProcessed',
            header: 'Upload status',
            enableColumnFilter: false,
            cell: ({ row }) => (
              <>
                {isActiveModel(row.original.analogueModelId) ? (
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                  ></LinearProgress>
                ) : (
                  <>
                    {row.original.isProcessed ? (
                      <>Success</>
                    ) : (
                      <>Processing/Failed</>
                    )}
                  </>
                )}
              </>
            ),
          },

          {
            accessorKey: 'navigate',
            enableColumnFilter: false,
            enableResizing: false,
            size: 200,
            minSize: 200,
            cell: ({ row }) => (
              <Styled.Buttons>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(`/${row.original.analogueModelId}/details`);
                  }}
                >
                  Open
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActiveModel(row.original.analogueModelId);
                    setToggle(!toggle);
                  }}
                >
                  Set Areas
                </Button>
              </Styled.Buttons>
            ),
            header: '',
            id: 'navigate',
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
