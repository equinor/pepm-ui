/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, LinearProgress } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  AnalogueModelsService,
  MetadataDto,
  OpenAPI,
} from '../../api/generated';
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

  const hasSelectedOptions = (metadata: MetadataDto[], type: string) => {
    return metadata.filter((d) => d.metadataType === type).length > 0;
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
        pageSize={10}
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
                {row.original.analogues.length > 0
                  ? row.original.analogues.map((a) => (
                      <p key={a.analogueId}>{a.name + ', '}</p>
                    ))
                  : 'Not relevant'}
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
                {hasSelectedOptions(row.original.metadata, 'Formation')
                  ? row.original.metadata
                      .filter((data) => data.metadataType === 'Formation')
                      .map((f) => <p key={f.metadataId}>{f.value + ', '}</p>)
                  : 'Not relevant'}
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
                {hasSelectedOptions(row.original.metadata, 'Zone')
                  ? row.original.metadata
                      .filter((data) => data.metadataType === 'Zone')
                      .map((z) => <p key={z.metadataId}>{z.value + ', '}</p>)
                  : 'Not relevant'}
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
                {hasSelectedOptions(row.original.metadata, 'Field')
                  ? row.original.metadata
                      .filter((data) => data.metadataType === 'Field')
                      .map((filed) => (
                        <p key={filed.metadataId}>{filed.value + ', '}</p>
                      ))
                  : 'Not relevant'}
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
            maxSize: 100,
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
              </Styled.Buttons>
            ),
          },
        ]}
      />
    </Styled.Table>
  );
};
