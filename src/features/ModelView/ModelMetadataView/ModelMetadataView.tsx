/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
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
import { StratigrapicGroups } from '../../../components/StrategraphicColumn/StratigrapicGroups/StratigrapicGroups';
import { useFetchModel } from '../../../hooks/useFetchModel';
import { EditNameDescription } from '../EditNameDescription/EditNameDescription';
import * as Styled from './ModelMetadataView.styled';

export const ModelMetadataView = ({
  modelIdParent,
  uploadingProgress,
}: {
  modelIdParent?: string;
  uploadingProgress?: number;
}) => {
  const { isLoading, data } = useFetchModel(
    modelIdParent ? modelIdParent : undefined,
  );
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const { modelId } = useParams();

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

  return (
    <Styled.Wrapper>
      {uploadingProgress === undefined && (
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
      {uploadingProgress !== undefined &&
        uploadingProgress >= 0 &&
        uploadingProgress < 100 && (
          <Styled.UploadingMeta>
            <Typography variant="body_long">
              While your model is being uploaded, you can add some metadata like
              outcrop analogue, stratigraphic column, or gross depositional
              environment. Please note that at least one type of metadata is
              required for PEPM models before they can be approved later on.
            </Typography>
          </Styled.UploadingMeta>
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
          modelIdParent={modelIdParent}
          defaultMetadata={defaultMetadata}
          stratColumnGroups={data.data.stratigraphicGroups}
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
    </Styled.Wrapper>
  );
};
