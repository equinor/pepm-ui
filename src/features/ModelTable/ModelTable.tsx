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
import { AnalogueModelsService, OpenAPI } from '../../api/generated';
import { AreaCoordinates } from '../../components/AreaCoordinates/AreaCoordinates';
import { useAccessToken } from '../../hooks/useAccessToken';
import * as Styled from './ModelTable.styled';

export const ModelTable = ({
  progress,
  activeUploadId,
  transforming,
}: {
  progress: number;
  activeUploadId: string;
  transforming: boolean;
}) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>();
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
    enabled: !!token,
    refetchInterval: 60000,
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

  const isTransforming = (id: string, status: boolean) => {
    if (transforming && id === activeUploadId && !status) {
      return <>Transforming model</>;
    } else {
      return status && <>Ready</>;
    }
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
          { accessorKey: 'name', header: 'Model name', id: 'name' },
          {
            accessorKey: 'analogues',
            id: 'analogues',
            header: 'Analogue',
            enableColumnFilter: false,
            size: 100,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.analogues.map((a) => (
                  <p key={a.analogueId}>{a.name + ', '}</p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'formation',
            id: 'formation',
            header: 'Formation',
            enableColumnFilter: false,
            size: 150,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Formation')
                  .map((f) => (
                    <p key={f.metadataId}>{f.value + ', '}</p>
                  ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'zone',
            id: 'zone',
            header: 'Zone',
            enableColumnFilter: false,
            size: 150,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Zone')
                  .map((z) => (
                    <p key={z.metadataId}>{z.value + ', '}</p>
                  ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'field',
            id: 'field',
            header: 'Field',
            enableColumnFilter: false,
            size: 200,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.metadata
                  .filter((data) => data.metadataType === 'Field')
                  .map((filed) => (
                    <p key={filed.metadataId}>{filed.value + ', '}</p>
                  ))}
              </Styled.List>
            ),
          },

          {
            accessorKey: 'isProcessed',
            id: 'isProcessed',
            header: 'Status',
            enableColumnFilter: false,
            size: 100,
            cell: ({ row }) => (
              <>
                {isActiveModel(row.original.analogueModelId) ? (
                  <Styled.Upload>
                    <p>Uploading {Math.round(progress)}%</p>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                    ></LinearProgress>
                  </Styled.Upload>
                ) : (
                  <>
                    {isTransforming(
                      row.original.analogueModelId,
                      row.original.isProcessed,
                    )}
                  </>
                )}
              </>
            ),
          },

          {
            accessorKey: 'navigate',
            header: 'Actions',
            id: 'navigate',
            enableColumnFilter: false,
            enableResizing: false,
            maxSize: 220,
            cell: ({ row }) => (
              <Styled.Buttons>
                <Button
                  variant="outlined"
                  disabled={isActiveModel(row.original.analogueModelId)}
                  onClick={() => {
                    navigate(`/${row.original.analogueModelId}/details`);
                  }}
                >
                  Open
                </Button>
                <Button
                  variant="ghost"
                  disabled={isActiveModel(row.original.analogueModelId)}
                  onClick={() => {
                    setActiveModel(row.original.analogueModelId);
                    setOpen(!open);
                  }}
                >
                  Set Areas
                </Button>
              </Styled.Buttons>
            ),
          },
        ]}
      />
      <Scrim open={open} isDismissable>
        <SideSheet onClose={() => setOpen(!open)}>
          {activeModel && <AreaCoordinates modelId={activeModel} />}
        </SideSheet>
      </Scrim>
    </Styled.Table>
  );
};
