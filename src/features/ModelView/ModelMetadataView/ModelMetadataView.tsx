/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AddStatigraphicGroupForm,
  AnalogueModelDetail,
  AnalogueModelMetadataService,
  AnalogueModelSourceType,
  JobStatus,
  MetadataDto,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
import { AnalogueModelsService } from '../../../api/generated/services/AnalogueModelsService';
import { queryClient } from '../../../auth/queryClient';
import { GrossDepositionEnviromentGroup } from '../../../components/GrossDepositionEnviroment/GrossDepositionEnviromentGroup/GrossDepositionEnviromentGroup';
import { OutcropAnalogueGroup } from '../../../components/OutcropAnalogue/OutcropAnalogueGroup/OutcropAnalogueGroup';
import { StratigraphicColumnSelect } from '../../../components/StrategraphicColumn/StratigraphicColumnSelect/StratigraphicColumnSelect';
import { StratigrapicGroups } from '../../../components/StrategraphicColumn/StratigrapicGroups/StratigrapicGroups';
import { useFetchModel } from '../../../hooks/useFetchModel';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { StratColumnType } from '../../HandleModel/HandleModelComponent/HandleModelComponent';
import { EditNameDescription } from '../EditNameDescription/EditNameDescription';
import * as Styled from './ModelMetadataView.styled';
export const defaultStratColumnData: StratColumnType = {
  country: undefined,
  field: undefined,
  stratColumn: undefined,
  level1: undefined,
  level2: undefined,
  level3: undefined,
};

export const ModelMetadataView = ({
  modelIdParent,
  isAddUploading,
}: {
  modelIdParent?: string;
  isAddUploading?: boolean;
}) => {
  const { isLoading, data } = useFetchModel(
    modelIdParent ? modelIdParent : undefined,
  );
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
    outcrops: data?.data.outcrops ? data?.data.outcrops : [],
    fileUploads: data?.data.fileUploads ? data?.data.fileUploads : [],
    parameters: [],
    metadata: data?.data.metadata ? data?.data.metadata : [],
    modelAreas: [],
    stratigraphicGroups: [],
    geologicalGroups: [],
    processingStatus: JobStatus.UNKNOWN,
  };
  const { modelId } = useParams();

  function toggleEditMetadata() {
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

  const metadataList: AddMetadataDto[] = [];
  function addMetadataFields(metadata?: MetadataDto[]) {
    const filteredMetadata = metadata?.filter(
      (m) => m.metadataType !== 'NoRelevant',
    );
    if (!filteredMetadata) return;
    const obj = filteredMetadata.map((x) => ({ metadataId: x.metadataId }));
    metadataList.push(...obj);
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
    const readyMetadata: AddAnalogueModelMetadataCommandForm = {
      metadata: metadataList,
    };

    await uploadModelMetadata.mutateAsync({
      id: id,
      requestBody: readyMetadata,
    });
    toggleEditMetadata();
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

  const deleteStratColCase = useMutation({
    mutationFn: ({
      analogueModelId,
      stratigraphicGroupId,
    }: {
      analogueModelId: string;
      stratigraphicGroupId: string;
    }) => {
      return AnalogueModelsService.deleteApiAnalogueModelsStratigraphicGroups(
        analogueModelId,
        stratigraphicGroupId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteGdeCase = useMutation({
    mutationFn: ({
      analogueModelId,
      geologicalGroupId,
    }: {
      analogueModelId: string;
      geologicalGroupId: string;
    }) => {
      return AnalogueModelsService.deleteApiAnalogueModelsGeologicalGroups(
        analogueModelId,
        geologicalGroupId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteStratColRow = async (stratigraphicGroupId: string) => {
    if (modelId) {
      const res = await deleteStratColCase.mutateAsync({
        analogueModelId: modelId,
        stratigraphicGroupId: stratigraphicGroupId,
      });
      return res;
    } else if (modelIdParent) {
      const res = await deleteStratColCase.mutateAsync({
        analogueModelId: modelIdParent,
        stratigraphicGroupId: stratigraphicGroupId,
      });
      return res;
    }
  };

  const deleteGdeRow = async (gdeGroupId: string) => {
    if (modelId) {
      const res = await deleteGdeCase.mutateAsync({
        analogueModelId: modelId,
        geologicalGroupId: gdeGroupId,
      });
      return res;
    } else if (modelIdParent) {
      const res = await deleteGdeCase.mutateAsync({
        analogueModelId: modelIdParent,
        geologicalGroupId: gdeGroupId,
      });
      return res;
    }
  };

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  const handleAddStratCol = async () => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;
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
      {!isAddUploading && (
        <Styled.DescriptionMeta>
          <>
            {data.data.description && (
              <Typography variant="body_long">
                {data.data.description}
              </Typography>
            )}
          </>

          <Button
            onClick={toggleEditMetadata}
            variant="outlined"
            className="edit-metadata-button"
          >
            Edit name and description…
          </Button>

          <EditNameDescription
            edit={updateModelMetadata}
            isEdit={isAddModelDialog}
            defaultMetadata={defaultMetadata}
            closeDialog={toggleEditMetadata}
          />
        </Styled.DescriptionMeta>
      )}
      {isAddUploading && (
        <>
          <Typography variant="h3">Add model metadata</Typography>
          <Typography variant="body_long">
            At least one type of metadata (outcrop analogue, stratigraphic
            column, or deposition environment) is required when adding a new
            model.
          </Typography>
        </>
      )}

      <Typography variant="h3" as="h2">
        Model metadata
      </Typography>

      <div>
        <OutcropAnalogueGroup
          modelIdParent={modelIdParent}
          defaultMetadata={defaultMetadata}
          outcropGroup={data.data.outcrops}
        />
      </div>
      <div>
        <StratigrapicGroups
          stratColumnGroups={data.data.stratigraphicGroups}
          handleStratColDialog={handleStratColDialog}
          deleteStratColRow={deleteStratColRow}
        />
      </div>
      <div>
        <GrossDepositionEnviromentGroup
          modelIdParent={modelIdParent}
          defaultMetadata={defaultMetadata}
          gdeGroups={data.data.geologicalGroups}
          deleteGdeRow={deleteGdeRow}
        />
      </div>

      <StyledDialog.DialogWindow open={showStratColDialog}>
        <Dialog.Header>Add stratigraphic column</Dialog.Header>
        <Dialog.CustomContent>
          <StratigraphicColumnSelect
            stratColumnObject={stratColumnObject}
            setStratColumnObject={setStratColumnObject}
          />
        </Dialog.CustomContent>
        <StyledDialog.Actions>
          <Button onClick={handleAddStratCol}>Add</Button>
          <Button variant="outlined" onClick={handleStratColDialog}>
            Close
          </Button>
        </StyledDialog.Actions>
      </StyledDialog.DialogWindow>
    </Styled.Wrapper>
  );
};
