/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AnalogueModelDetail,
  AnalogueModelMetadataService,
  GenerateThumbnailCommand,
  JobsService,
  MetadataDto,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
import { AnalogueModelsService } from '../../../api/generated/services/AnalogueModelsService';
import { queryClient } from '../../../auth/queryClient';
import { GrossDepositionEnviromentGroup } from '../../../components/GrossDepositionEnviroment/GrossDepositionEnviromentGroup/GrossDepositionEnviromentGroup';
import { OutcropAnalogueGroup } from '../../../components/OutcropAnalogue/OutcropAnalogueGroup/OutcropAnalogueGroup';
import { StratigrapicGroups } from '../../../components/StrategraphicColumn/StratigrapicGroups/StratigrapicGroups';
import { EditNameDescription } from '../EditNameDescription/EditNameDescription';
import * as Styled from './ModelMetadataView.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../hooks/GlobalState';

export const ModelMetadataView = ({
  modelIdParent,
  uploadingProgress,
}: {
  modelIdParent?: string;
  uploadingProgress?: number;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const { analogueModel, analogueModelImageURL } = usePepmContextStore();

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);

  const generateImageRequested = useRef(false);

  const { modelId } = useParams();

  const defaultMetadata: AnalogueModelDetail = analogueModel
    ? analogueModel
    : analogueModelDefault;

  const generateThumbnail = useMutation({
    mutationFn: (requestBody: GenerateThumbnailCommand) => {
      return JobsService.postApiJobsComputeThumbnailGen(requestBody);
    },
  });

  const generateThumbnailOnLoad = useCallback(
    async (modelId: string) => {
      if (modelId) {
        const res = await generateThumbnail.mutateAsync({
          modelId: modelId,
        });
        return res;
      }
    },
    [generateThumbnail],
  );

  useEffect(() => {
    if (
      modelId &&
      analogueModel !== analogueModelDefault &&
      analogueModel.analogueModelImage === null &&
      generateImageRequested.current === false &&
      analogueModel.isProcessed
    ) {
      generateImageRequested.current = true;
      generateThumbnailOnLoad(modelId);
    }
  }, [
    analogueModel,
    analogueModel.analogueModelImage,
    modelId,
    generateThumbnailOnLoad,
    analogueModel.isProcessed,
  ]);

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
    const id = analogueModel.analogueModelId
      ? analogueModel.analogueModelId
      : '';
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

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  return (
    <Styled.Wrapper className="metadata-row">
      {uploadingProgress === undefined && (
        <Styled.DescriotionImageWrapper>
          <Styled.DescriptionMeta>
            <Typography variant="h3">Description</Typography>
            <>
              {analogueModel.description && (
                <Typography variant="body_long">
                  {analogueModel.description}
                </Typography>
              )}
            </>

            {isOwnerOrAdmin && (
              <Button
                onClick={toggleEditMetadata}
                variant="outlined"
                className="edit-metadata-button"
              >
                Edit name and description…
              </Button>
            )}
            <EditNameDescription
              edit={updateModelMetadata}
              isEdit={isAddModelDialog}
              defaultMetadata={defaultMetadata}
              closeDialog={toggleEditMetadata}
            />
          </Styled.DescriptionMeta>
          {analogueModelImageURL && analogueModel !== analogueModelDefault && (
            <Styled.ModelImageView>
              <img src={analogueModelImageURL} alt=""></img>
              <Typography>{analogueModel.name}</Typography>
            </Styled.ModelImageView>
          )}
          <Styled.ImageMessage>
            {analogueModel.isProcessed &&
              !analogueModelImageURL &&
              generateImageRequested.current && (
                <div>
                  <Typography as="p">
                    We are generating image for this analogue model
                  </Typography>
                  <Typography as="p">
                    Please come back to this page in a couple of minutes
                  </Typography>
                </div>
              )}
            {!analogueModel.isProcessed && (
              <div>
                <Typography as="p">
                  Cannot generate picture for unprocessed model.
                </Typography>
                <Typography as="p">
                  If processing failed, delete this model and reupload again.
                  Else, wait.
                </Typography>
              </div>
            )}
          </Styled.ImageMessage>
        </Styled.DescriotionImageWrapper>
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
        <OutcropAnalogueGroup modelIdParent={modelIdParent} />
      </div>
      <div>
        <StratigrapicGroups
          modelIdParent={modelIdParent}
          deleteStratColRow={deleteStratColRow}
        />
      </div>
      <div>
        <GrossDepositionEnviromentGroup
          modelIdParent={modelIdParent}
          deleteGdeRow={deleteGdeRow}
        />
      </div>
    </Styled.Wrapper>
  );
};
