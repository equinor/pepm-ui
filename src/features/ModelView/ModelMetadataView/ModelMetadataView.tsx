/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Table, Typography } from '@equinor/eds-core-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddAnalogueDto,
  AddAnalogueModelAnalogueCommandForm,
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AnalogueList,
  AnalogueModelAnaloguesService,
  AnalogueModelMetadataService,
  MetadataDto,
  OpenAPI,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
import { AnalogueModelsService } from '../../../api/generated/services/AnalogueModelsService';
import { useAccessToken } from '../../../hooks/useAccessToken';
import MetadataProps, {
  AddModelDialog,
} from '../../AddModel/AddModelDialog/AddModelDialog';
import * as Styled from './ModelMetadataView.styled';

export const ModelMetadataView = () => {
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const [refetchKey, setRefetchKey] = useState<number>(0);
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models', modelId, refetchKey],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
    enabled: !!token,
  });

  const defaultMetadata: MetadataProps = {
    name: data?.data.name ? data?.data.name : '',
    description: data?.data.description ? data?.data.description : '',
    metadata: data?.data.metadata ? data?.data.metadata : [],
    analogue: data?.data.analogues ? data?.data.analogues : [],
  };

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog);
  }

  const updateNameDescription = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: UpdateAnalogueModelCommandBody;
    }) => {
      return AnalogueModelsService.putApiAnalogueModels(id, requestBody);
    },
  });

  const uploadModelMetadata = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelMetadataCommandForm;
    }) => {
      return AnalogueModelMetadataService.putApiAnalogueModelsMetadata(
        id,
        requestBody,
      );
    },
  });

  const uploadModelAnalouges = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelAnalogueCommandForm;
    }) => {
      return AnalogueModelAnaloguesService.putApiAnalogueModelsAnalogues(
        id,
        requestBody,
      );
    },
  });

  const metadataList: AddMetadataDto[] = [];
  const analougueList: AddAnalogueDto[] = [];

  function addMetadataFields(metadata?: MetadataDto[]) {
    if (!metadata) return;
    const obj = metadata.map((x) => ({ metadataId: x.metadataId }));
    metadataList.push(...obj);
  }

  function addAnalogueFields(metadata?: AnalogueList[]) {
    if (!metadata) return;
    const obj = metadata.map((x) => ({ analogueId: x.analogueId }));
    analougueList.push(...obj);
  }

  const updateModelMetadata = async (metadata: MetadataProps) => {
    const id = data?.data.analogueModelId ? data?.data.analogueModelId : '';
    const modelMetadata = {
      name: metadata.name,
      description: metadata.description,
      sourceType: 'Deltares',
    };

    await updateNameDescription.mutateAsync({
      id: id,
      requestBody: modelMetadata,
    });

    addMetadataFields(metadata.metadata);
    addAnalogueFields(metadata.analogue);

    const readyMetadata: AddAnalogueModelMetadataCommandForm = {
      metadata: metadataList,
    };
    const readyAnalogue: AddAnalogueModelAnalogueCommandForm = {
      analogues: analougueList,
    };

    await uploadModelMetadata.mutateAsync({
      id: id,
      requestBody: readyMetadata,
    });
    await uploadModelAnalouges.mutateAsync({
      id: id,
      requestBody: readyAnalogue,
    });

    setRefetchKey(refetchKey + 1);
    toggleDialog();
  };

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

      <Button
        onClick={toggleDialog}
        variant="outlined"
        className="edit-metadata-button"
      >
        Edit description and metadata
      </Button>
      <AddModelDialog
        isOpen={isAddModelDialog}
        edit={updateModelMetadata}
        cancel={toggleDialog}
        defaultMetadata={defaultMetadata}
        isEdit={true}
      />
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
