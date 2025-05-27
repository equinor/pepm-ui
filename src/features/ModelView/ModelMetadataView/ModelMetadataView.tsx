/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  Banner,
  Button,
  Card,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
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
import { ModelStatus } from '../../ModelTable/ModelTable';
import { UploadingStatus } from '../../../pages/AddModel/stores/AddModelStore';
import { ModelAreaCoordinates } from '../ModelAreaCoordinates/ModelAreaCoordinates';
import { CoordinatesDialog } from '../../AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ModelFilesView } from '../ModelFilesView/ModelFilesView';
import { ModelNameFrameDetail } from '../ModelNameFrame/ModelNameFrameDetail';
import { ModelImageCanvas } from '../../AreaCoordinates/ImageView/ModelImageCanvas/ModelImageCanvas';
import { ModelArchelMap } from '../ModelArchelMap/ModelArchelMap';
import { useFetchJobStatus } from '../../../hooks/useFetchJobStatus';
import { CanvasWrapper } from '../../AreaCoordinates/ImageView/AnalogueModelImageView.styled';
import * as StyledCard from '../../../styles/Card/Card.styled';

/* eslint-disable camelcase */
Icon.add({ error_outlined });

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
    <>
      {getModelStatus() === ModelStatus.FAILED_TRANSFORMING && (
        <Banner className="model-error-message">
          <Banner.Icon variant="warning">
            <Icon name="error_outlined" />
          </Banner.Icon>
          <Banner.Message>
            Model transformation failed. This might be caused by an invalid ini
            file. Please delete this model and try uploading it again.
          </Banner.Message>
        </Banner>
      )}
      <Card className="card-name">
        {uploadingStatus === undefined && (
          <>
            <Card.Header>
              <ModelNameFrameDetail></ModelNameFrameDetail>
            </Card.Header>
            <StyledCard.Content>
              {analogueModel.description && (
                <Typography variant="body_long">
                  {analogueModel.description}
                </Typography>
              )}

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
            </StyledCard.Content>
          </>
        )}
      </Card>

      <ModelAreaCoordinates toggleOpen={toggleOpen}></ModelAreaCoordinates>

      <Card className="card-image">
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Model image
          </Typography>
        </Card.Header>
        <StyledCard.Content>
          {uploadingStatus === undefined && (
            <figure>
              {analogueModelImageURL &&
                analogueModelImageMetadata &&
                analogueModel !== analogueModelDefault && (
                  <CanvasWrapper>
                    <ModelImageCanvas
                      imageData={analogueModelImageURL}
                      imageMetadata={analogueModelImageMetadata}
                      showLegend={true}
                      showCoordinates={false}
                    />
                    <Typography
                      variant="caption"
                      as="figcaption"
                      className="caption"
                    >
                      Generated model image of {analogueModel.name}
                    </Typography>
                  </CanvasWrapper>
                )}
              {analogueModel.isProcessed &&
                !analogueModelImageURL &&
                generateImageRequested.current && (
                  <figcaption>
                    <Typography variant="body_long">
                      The model image is being generated, please refresh this
                      page in a few minutes…
                    </Typography>
                  </figcaption>
                )}
              {getModelStatus() === ModelStatus.TRANSFORMING && (
                <figcaption>
                  <Typography variant="body_long">
                    Your model is being transformed for further processing…
                  </Typography>
                </figcaption>
              )}
              {!analogueModel.processingStatus && (
                <figcaption>
                  <Typography variant="body_long">
                    The model image has not yet been generated. If the model was
                    successfully transformed, please refresh this page in a few
                    minutes…
                  </Typography>
                </figcaption>
              )}
              {!analogueModel.isProcessed && (
                <figcaption>
                  <Typography variant="body_long">
                    The model image has not yet been generated. If the model was
                    successfully transformed, please refresh this page in a few
                    minutes…
                  </Typography>
                </figcaption>
              )}
            </figure>
          )}
          {uploadingStatus === UploadingStatus.Uploading && (
            <Styled.UploadingMeta>
              <Typography variant="body_long">
                While your model is being uploaded, you can add some metadata
                like outcrop analogue, stratigraphic column, or gross
                depositional environment. Please note that at least one type of
                metadata is required for APP models before they can be approved
                later on.
              </Typography>
            </Styled.UploadingMeta>
          )}
        </StyledCard.Content>
      </Card>

      <Card>
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Gross Depositional Environment (GDE)
          </Typography>
        </Card.Header>
        <Card.Content>
          <GrossDepositionEnviromentGroup />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Architectural elements
          </Typography>
        </Card.Header>
        <Card.Content>
          <ModelArchelMap />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Outcrop analogue
          </Typography>
        </Card.Header>
        <Card.Content>
          <OutcropAnalogueGroup />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Stratigraphic column
          </Typography>
        </Card.Header>
        <Card.Content>
          <StratigrapicGroups />
        </Card.Content>
      </Card>

      <ModelFilesView />

      {analogueModel.iniParameters && uploadingStatus === undefined && (
        <>
          <Card className="card-ini">
            <Card.Header>
              <Typography variant="h4" as="h3" className="card-title">
                Ini parameters
              </Typography>
            </Card.Header>
            <StyledCard.Content>
              <Typography variant="body_long">
                All parameters added to the model in the original vendor ini
                file.
              </Typography>
              <IniParametersDialog
                iniParameters={analogueModel.iniParameters}
              />
            </StyledCard.Content>
          </Card>
        </>
      )}

      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
