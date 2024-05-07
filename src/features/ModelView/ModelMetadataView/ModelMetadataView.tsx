/* eslint-disable max-lines-per-function */
import { Button, Table, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  AddAnalogueDto,
  AddAnalogueModelAnalogueCommandForm,
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AnalogueList,
  AnalogueModelAnaloguesService,
  AnalogueModelDetail,
  AnalogueModelMetadataService,
  AnalogueModelSourceType,
  MetadataDto,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
import { AnalogueModelsService } from '../../../api/generated/services/AnalogueModelsService';
import { queryClient } from '../../../auth/queryClient';
import { useFetchModel } from '../../../hooks/useFetchModel';
import { HandleModelComponent } from '../../HandleModel/HandleModelComponent/HandleModelComponent';
import { TableDataCell } from '../TableDataCell/TableDataCell';
import * as Styled from './ModelMetadataView.styled';

export const ModelMetadataView = () => {
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const { isLoading, data } = useFetchModel();

  const defaultMetadata: AnalogueModelDetail = {
    analogueModelId: data?.data.analogueModelId
      ? data?.data.analogueModelId
      : '',
    name: data?.data.name ? data?.data.name : '',
    description: data?.data.description ? data?.data.description : '',
    isProcessed: data?.data.isProcessed ? data?.data.isProcessed : false,
    sourceType: AnalogueModelSourceType.DELTARES,
    analogues: data?.data.analogues ? data?.data.analogues : [],
    fileUploads: data?.data.fileUploads ? data?.data.fileUploads : [],
    parameters: [],
    metadata: data?.data.metadata ? data?.data.metadata : [],
    modelAreas: [],
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
    onSuccess: () => {
      queryClient.refetchQueries();
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
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const metadataList: AddMetadataDto[] = [];
  const analougueList: AddAnalogueDto[] = [];

  function addMetadataFields(metadata?: MetadataDto[]) {
    const filteredMetadata = metadata?.filter(
      (m) => m.metadataType !== 'NoRelevant',
    );
    if (!filteredMetadata) return;
    const obj = filteredMetadata.map((x) => ({ metadataId: x.metadataId }));
    metadataList.push(...obj);
  }

  function addAnalogueFields(metadata?: AnalogueList[]) {
    if (!metadata) return;
    const obj = metadata.map((x) => ({ analogueId: x.analogueId }));
    analougueList.push(...obj);
  }

  const updateModelMetadata = async (metadata: AnalogueModelDetail) => {
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
    addAnalogueFields(metadata.analogues);

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

    toggleDialog();
  };

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  return (
    <Styled.Metadata>
      <Typography variant="h3">Description and metadata</Typography>
      {data.data.description && <div>{data.data.description}</div>}
      <Styled.Table>
        <Table.Body>
          <Table.Row>
            <Styled.NameCell>Field</Styled.NameCell>
            <TableDataCell data={data.data} type="Field" />
          </Table.Row>
          <Table.Row>
            <Styled.NameCell>Fomation</Styled.NameCell>
            <TableDataCell data={data.data} type="Formation" />
          </Table.Row>
          <Table.Row>
            <Styled.NameCell>Analouge</Styled.NameCell>
            <TableDataCell data={data.data} type="Analouge" />
          </Table.Row>
          <Table.Row>
            <Styled.NameCell>Zone</Styled.NameCell>
            <TableDataCell data={data.data} type="Zone" />
          </Table.Row>
        </Table.Body>
      </Styled.Table>

      <Button
        onClick={toggleDialog}
        variant="outlined"
        className="edit-metadata-button"
      >
        Edit description and metadata
      </Button>
      {isAddModelDialog && (
        <HandleModelComponent
          edit={updateModelMetadata}
          defaultMetadata={defaultMetadata}
          isEdit={true}
          existingData={data.data}
        />
      )}
    </Styled.Metadata>
  );
};
