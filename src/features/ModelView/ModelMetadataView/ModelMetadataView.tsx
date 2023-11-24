import { useMsal } from '@azure/msal-react';
import { Button, Table, Typography } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MetadataDto, OpenAPI } from '../../../api/generated';
import { AnalogueModelsService } from '../../../api/generated/services/AnalogueModelsService';
import { useAccessToken } from '../../../hooks/useAccessToken';
import * as Styled from './ModelMetadataView.styled';

export const ModelMetadataView = () => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;

  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
    enabled: !!token,
  });
  if (isLoading || !data?.success) return <p>Loading ...</p>;

  return (
    <Styled.Metadata>
      <Typography variant="h3">Description and metadata</Typography>
      {data.data.description && <div>{data.data.description}</div>}
      <Styled.MetadataTable>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="table-first-col">Field</Table.Cell>
              <DataCell metadata={data.data.metadata} type="Field" />
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Fomation</Table.Cell>
              <DataCell metadata={data.data.metadata} type="Formation" />
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Analouge</Table.Cell>
              <Table.Cell className="table-second-col">
                {data.data.analogues.length > 0 ? (
                  data.data.analogues.map((m) => (
                    <Typography key={m.analogueId}>{m.name}</Typography>
                  ))
                ) : (
                  <Typography> - No Analogues selected - </Typography>
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Zone</Table.Cell>
              <DataCell metadata={data.data.metadata} type="Zone" />
            </Table.Row>
          </Table.Body>
        </Table>
      </Styled.MetadataTable>

      <Button variant="outlined" className="edit-metadata-button">
        Edit description and metadata
      </Button>
    </Styled.Metadata>
  );
};

const DataCell = ({
  metadata,
  type,
}: {
  metadata?: MetadataDto[] | null;
  type: string;
}) => {
  return (
    <Table.Cell className="table-second-col">
      {metadata?.filter((m) => m.metadataType === type).length ? (
        metadata
          ?.filter((m) => m.metadataType === type)
          .map((m) => <Typography key={m.metadataId}>{m.value}</Typography>)
      ) : (
        <Typography> - No Zone selected - </Typography>
      )}
    </Table.Cell>
  );
};
