/* eslint-disable max-lines-per-function */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  AddAnalogueDto,
  AddAnalogueModelAnalogueCommandForm,
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AddStatigraphicGroupForm,
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
import { StratigrapicGroups } from '../../../components/StratigrapicGroups/StratigrapicGroups';
import { useFetchModel } from '../../../hooks/useFetchModel';
import {
  HandleModelComponent,
  StratColumnType,
} from '../../HandleModel/HandleModelComponent/HandleModelComponent';
import { StratigraphicColumnSelect } from '../../HandleModel/StratigraphicColumnSelect/StratigraphicColumnSelect';
import * as Styled from './ModelMetadataView.styled';

export const defaultStratColumnData: StratColumnType = {
  country: undefined,
  field: undefined,
  stratColumn: undefined,
  level1: undefined,
  level2: undefined,
  level3: undefined,
};

export const ModelMetadataView = ({ modelId }: { modelId?: string }) => {
  const { isLoading, data } = useFetchModel(modelId ? modelId : undefined);
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const [stratColumnObject, setStratColumnObject] = useState<StratColumnType>(
    defaultStratColumnData,
  );
  const [showStratColDialog, setShowStratColDialog] = useState<boolean>(false);

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
    stratigraphicGroups: [],
    geologicalGroups: [],
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

  const handleStratColDialog = () => {
    setShowStratColDialog(!showStratColDialog);
    setStratColumnObject(defaultStratColumnData);
  };

  const postSmdaMetadataRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddStatigraphicGroupForm;
    }) => {
      return AnalogueModelsService.postApiAnalogueModelsStratigraphicGroups(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  console.log(modelId);

  const handleAddStratCol = async () => {
    const id = modelId ? modelId : defaultMetadata.analogueModelId;
    if (
      id &&
      stratColumnObject.country &&
      stratColumnObject.field &&
      stratColumnObject.stratColumn
    ) {
      const stratUnitList: string[] = [];
      if (stratColumnObject.level1 !== undefined)
        stratUnitList.push(stratColumnObject.level1.stratUnitId);
      if (
        stratColumnObject.level1 !== undefined &&
        stratColumnObject.level2 !== undefined
      )
        stratUnitList.push(stratColumnObject.level2.stratUnitId);
      if (
        stratColumnObject.level1 !== undefined &&
        stratColumnObject.level2 !== undefined &&
        stratColumnObject.level3 !== undefined
      )
        stratUnitList.push(stratColumnObject.level3.stratUnitId);

      const postRequestBody: AddStatigraphicGroupForm = {
        countryId: stratColumnObject.country.countryId,
        fieldId: stratColumnObject.field.fieldId,
        stratigraphicColumnId: stratColumnObject.stratColumn.stratColumnId,
        stratigraphicUnitIds: stratUnitList.length > 0 ? stratUnitList : [],
      };

      const rowUpload = await postSmdaMetadataRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.success) handleStratColDialog();
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Metadata>
        <Typography variant="h3">Description and metadata</Typography>

        {!isAddModelDialog && (
          <>{data.data.description && <div>{data.data.description}</div>}</>
        )}

        {isAddModelDialog && (
          <HandleModelComponent
            edit={updateModelMetadata}
            defaultMetadata={defaultMetadata}
            isEdit={true}
            existingData={data.data}
          />
        )}

        <div>
          <StratigrapicGroups
            stratColumnGroups={data.data.stratigraphicGroups}
            handleStratColDialog={handleStratColDialog}
          />
        </div>
      </Styled.Metadata>

      <Button
        onClick={toggleDialog}
        variant="outlined"
        className="edit-metadata-button"
      >
        Edit description and metadata
      </Button>

      <Dialog open={showStratColDialog}>
        <Dialog.Header>Add stratigraphic column</Dialog.Header>
        <Dialog.CustomContent>
          <StratigraphicColumnSelect
            stratColumnObject={stratColumnObject}
            setStratColumnObject={setStratColumnObject}
          />
        </Dialog.CustomContent>
        <Styled.Actions>
          <Button onClick={handleAddStratCol}>Add</Button>
          <Button variant="outlined" onClick={handleStratColDialog}>
            Close
          </Button>
        </Styled.Actions>
      </Dialog>
    </Styled.Wrapper>
  );
};
