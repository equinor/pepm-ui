/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Card, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelDetail,
  GenerateThumbnailCommand,
  getApiV1AnalogueModelsById,
  postApiV1JobsComputeThumbnailGen,
  putApiV1AnalogueModelsById,
  UpdateAnalogueModelCommandBody,
} from '../../../api/generated';
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
import { ModelAreaCoordinates } from '../ModelAreaCoordinates/ModelAreaCoordinates';
import { CoordinatesDialog } from '../../AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ModelFilesView } from '../ModelFilesView/ModelFilesView';
import { ModelNameFrameDetail } from '../ModelNameFrame/ModelNameFrameDetail';
import { ModelImageCanvas } from '../../AreaCoordinates/ImageView/ModelImageCanvas/ModelImageCanvas';
import { ModelArchelMap } from '../ModelArchelMap/ModelArchelMap';
import { useFetchJobStatus } from '../../../hooks/useFetchJobStatus';

export const ModelMetadataView = ({
  uploadingStatus,
}: {
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
    analogueModelImageMetadata,
    setAnalogueModelImageDto,
    conversionJobId,
    setConversionJobId,
    thumbnailJobId,
    setThumbnailJobId,
  } = usePepmContextStore();
  const outcropData = useFetchOutcropData();
  const countryData = useFetchSmdaCountries();
  const fieldData = useFetchSmdaFields();
  const stratColumnData = useFetchSmdaStratigraphicColumns();
  const stratUnitData = useFetchSmdaMetadataStratigraphicUnits();
  const geologyStandards = useFetchGrossDepData();
  const [open, setOpen] = useState<boolean>(false);

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);

  const generateImageRequested = useRef(false);

  const { modelId } = useParams();

  const checkThumbnailStatus = useFetchJobStatus(thumbnailJobId);
  const checkConversionStatus = useFetchJobStatus(conversionJobId);

  const generateThumbnail = useMutation({
    mutationFn: (requestBody: GenerateThumbnailCommand) => {
      return postApiV1JobsComputeThumbnailGen({ body: requestBody });
    },
    onSuccess: (data) => {
      setThumbnailJobId(data.data?.data.jobId);
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

  const fetchModel = useMutation({
    mutationFn: () => {
      return getApiV1AnalogueModelsById({
        path: { id: analogueModel.analogueModelId },
      });
    },
  });

  const fetchModelCallback = useCallback(async () => {
    const res = await fetchModel.mutateAsync();
    if (res.data?.success)
      setAnalogueModelImageDto(res.data.data.analogueModelImage);

    return res;
  }, [fetchModel, setAnalogueModelImageDto]);

  const toggleOpen = () => {
    setOpen(!open);
  };

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

  useEffect(() => {
    if (
      generateImageRequested.current === true &&
      analogueModel.analogueModelImage === null &&
      thumbnailJobId !== '' &&
      checkThumbnailStatus.data?.data?.data.jobStatus === 'Succeeded'
    ) {
      fetchModelCallback();
    }
    if (
      analogueModel.analogueModelImage &&
      analogueModel.analogueModelImage.analogueModelImageId !== ''
    )
      setThumbnailJobId(undefined);
  }, [
    analogueModel.analogueModelImage,
    checkThumbnailStatus.data?.data?.data.jobStatus,
    fetchModelCallback,
    setThumbnailJobId,
    thumbnailJobId,
  ]);

  useEffect(() => {
    if (
      analogueModel !== analogueModelDefault &&
      !analogueModel.isProcessed &&
      checkConversionStatus.data?.data?.data.jobStatus === 'Succeeded'
    ) {
      setAnalogueModel({ ...analogueModel, isProcessed: true });
      setConversionJobId(undefined);
    }
  }, [
    analogueModel,
    checkConversionStatus.data?.data?.data.jobStatus,
    setAnalogueModel,
    setConversionJobId,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Card style={{ height: '45%', overflow: 'auto' }}>
            <Card.Content style={{ padding: '1rem' }}>
              {uploadingStatus === undefined && (
                <div>
                  <ModelNameFrameDetail></ModelNameFrameDetail>
                  <Styled.DescriptionMeta>
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
                </div>
              )}
            </Card.Content>
          </Card>

          <ModelAreaCoordinates toggleOpen={toggleOpen}></ModelAreaCoordinates>
        </div>

        <Card>
          <Card.Content style={{ padding: '1rem' }}>
            {uploadingStatus === undefined && (
              <Styled.DescriotionImageWrapper>
                {analogueModelImageURL &&
                  analogueModelImageMetadata &&
                  analogueModel !== analogueModelDefault && (
                    <Styled.ModelImageView>
                      <ModelImageCanvas
                        imageData={analogueModelImageURL}
                        imageMetadata={analogueModelImageMetadata}
                        showLegend={true}
                        showCoordinates={false}
                      />
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
                      <Typography as="p">Model is transforming.</Typography>
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
                        If processing failed, delete this model and reupload
                        again. Else, wait.
                      </Typography>
                    </div>
                  )}
                  {!analogueModel.isProcessed && (
                    <div>
                      <Typography as="p">
                        Cannot generate picture for unprocessed model.
                      </Typography>
                      <Typography as="p">
                        If processing failed, delete this model and reupload
                        again. Else, wait.
                      </Typography>
                    </div>
                  )}
                </Styled.ImageMessage>
              </Styled.DescriotionImageWrapper>
            )}
            {uploadingStatus === UploadingStatus.Uploading && (
              <Styled.UploadingMeta>
                <Typography variant="body_long">
                  While your model is being uploaded, you can add some metadata
                  like outcrop analogue, stratigraphic column, or gross
                  depositional environment. Please note that at least one type
                  of metadata is required for PEPM models before they can be
                  approved later on.
                </Typography>
              </Styled.UploadingMeta>
            )}
          </Card.Content>
        </Card>
      </div>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <GrossDepositionEnviromentGroup />
        </Card.Content>
      </Card>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <ModelArchelMap />
        </Card.Content>
      </Card>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <OutcropAnalogueGroup />
        </Card.Content>
      </Card>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <StratigrapicGroups />
        </Card.Content>
      </Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ModelFilesView />

        {analogueModel.iniParameters && uploadingStatus === undefined && (
          <div style={{ width: '30%' }}>
            <Card>
              <Card.Content style={{ padding: '1rem' }}>
                <IniParametersWrapper>
                  <Typography variant="h3" as="h2">
                    Ini Parameters
                  </Typography>
                  <Typography variant="body_long">
                    All parameters added to the model in the original vendor ini
                    file.
                  </Typography>
                  <IniParametersDialog
                    iniParameters={analogueModel.iniParameters}
                  />
                </IniParametersWrapper>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </Styled.Wrapper>
  );
};
