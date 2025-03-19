/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelDetail,
  deleteApiV1AnalogueModelsByAnalogueModelIdGeologicalGroupsByGeologicalGroupId,
  GenerateThumbnailCommand,
  postApiV1JobsComputeThumbnailGen,
  putApiV1AnalogueModelsById,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
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
} from '../../../stores/GlobalStore';
import { useFetchOutcropData } from '../../../hooks/useFetchOutcropData';
import {
  useFetchSmdaCountries,
  useFetchSmdaFields,
  useFetchSmdaMetadataStratigraphicUnits,
  useFetchSmdaStratigraphicColumns,
} from '../../../hooks/useFetchStratColData';
import { useFetchGrossDepData } from '../../../hooks/useFetchGrossDepData';
import { IniParametersDialog } from '../IniParametersDialog/IniParametersDialog';
import { IniParametersWrapper } from './ModelMetadataView.styled';
import { ModelStatus } from '../../ModelTable/ModelTable';
import { UploadingStatus } from '../../../pages/AddModel/stores/AddModelStore';

export const ModelMetadataView = ({
  modelIdParent,
  uploadingStatus,
}: {
  modelIdParent?: string;
  uploadingStatus?: UploadingStatus;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const {
    analogueModel,
    analogueModelImageURL,
    setOutcrops,
    setCountries,
    setFields,
    setStratigraphicColumns,
    setStratigraphicUnits,
    setGeologicalStandards,
    setAnalogueModel,
  } = usePepmContextStore();
  const outcropData = useFetchOutcropData();
  const countryData = useFetchSmdaCountries();
  const fieldData = useFetchSmdaFields();
  const stratColumnData = useFetchSmdaStratigraphicColumns();
  const stratUnitData = useFetchSmdaMetadataStratigraphicUnits();
  const geologyStandards = useFetchGrossDepData();

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);

  const generateImageRequested = useRef(false);

  const { modelId } = useParams();

  const generateThumbnail = useMutation({
    mutationFn: (requestBody: GenerateThumbnailCommand) => {
      return postApiV1JobsComputeThumbnailGen({ body: requestBody });
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
    if (countryData.data?.data?.data) setCountries(countryData.data.data.data);
    if (fieldData.data?.data?.data) setFields(fieldData.data.data.data);
    if (stratColumnData.data?.data?.data)
      setStratigraphicColumns(stratColumnData.data.data.data);
    if (stratUnitData.data?.data?.data)
      setStratigraphicUnits(stratUnitData.data.data.data);
    if (outcropData.data?.data?.data) setOutcrops(outcropData.data.data.data);
    if (geologyStandards.data?.data?.data)
      setGeologicalStandards(geologyStandards.data.data.data);
  }, [
    geologyStandards.data?.data,
    outcropData.data?.data,
    countryData.data?.data,
    fieldData.data?.data,
    setGeologicalStandards,
    setCountries,
    setOutcrops,
    setFields,
    setStratigraphicColumns,
    setStratigraphicUnits,
    stratColumnData.data?.data,
    stratUnitData.data?.data,
  ]);

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
    mutationKey: ['analogue-model'],
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: UpdateAnalogueModelCommandBody;
    }) => {
      return putApiV1AnalogueModelsById({
        body: requestBody,
        path: { id: id },
      });
    },
  });

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
    setAnalogueModel(metadata);
    toggleEditMetadata();
  };

  const deleteGdeCase = useMutation({
    mutationFn: ({
      analogueModelId,
      geologicalGroupId,
    }: {
      analogueModelId: string;
      geologicalGroupId: string;
    }) => {
      return deleteApiV1AnalogueModelsByAnalogueModelIdGeologicalGroupsByGeologicalGroupId(
        {
          path: {
            analogueModelId: analogueModelId,
            geologicalGroupId: geologicalGroupId,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

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
      return res.request;
    }
  };

  const getModelStatus = () => {
    let status = ModelStatus.UNKNOWN;

    const transforming =
      analogueModel && analogueModel.processingStatus
        ? analogueModel.processingStatus
        : undefined;
    const isProcessed = analogueModel ? analogueModel.isProcessed : undefined;

    if (isProcessed === true) {
      status = ModelStatus.SUCCEEDED;
    } else if (
      transforming === 'Created' ||
      transforming === 'Waiting' ||
      transforming === 'Running'
    ) {
      status = ModelStatus.TRANSFORMING;
    } else if (transforming === 'Failed') {
      status = ModelStatus.FAILED_TRANSFORMING;
    } else if (isProcessed === false) {
      status = ModelStatus.FAILED_UPLOADING;
    }

    return status;
  };

  if (analogueModel === analogueModelDefault && uploadingStatus === undefined)
    return <p>Loading ...</p>;

  return (
    <Styled.Wrapper className="metadata-row">
      {uploadingStatus === undefined && (
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
            {getModelStatus() === ModelStatus.TRANSFORMING && (
              <div>
                <Typography as="p">
                  Model picture will be generated after the model is
                  transformed.
                </Typography>
              </div>
            )}
            {getModelStatus() === ModelStatus.FAILED_TRANSFORMING && (
              <div>
                <Typography as="p">
                  Model transformation failed. Delete the model and upload
                  again.
                </Typography>
              </div>
            )}
            {!analogueModel.processingStatus && (
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
      {uploadingStatus === UploadingStatus.Uploading && (
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
      {analogueModel.iniParameters && uploadingStatus === undefined && (
        <IniParametersWrapper>
          <Typography variant="h4" as="h3">
            Ini Parameters
          </Typography>
          <div>
            <IniParametersDialog iniParameters={analogueModel.iniParameters} />
          </div>
        </IniParametersWrapper>
      )}
      <div>
        <OutcropAnalogueGroup modelIdParent={modelIdParent} />
      </div>
      <div>
        <StratigrapicGroups modelIdParent={modelIdParent} />
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
