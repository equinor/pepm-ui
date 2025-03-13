/* eslint-disable camelcase */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-depth */

import {
  Button,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import {
  useHandleModelComponent,
  validateIniFile,
  validateValues,
} from './HandleModelComponent.hooks';
import * as Styled from './HandleModelComponent.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
import { readFileAsText } from '../../../utils/ReadIniFile';
import { IniFileTextField } from './HandleModelComponent.styled';
import {
  UploadingStatus,
  useAddModelStore,
} from '../../../pages/AddModel/stores/AddModelStore';
import { useMutation } from '@tanstack/react-query';
import {
  AnalogueModelsService,
  ConvertAnalogueModelCommand,
  CreateAnalogueModelCommand,
  JobsService,
  UploadFileType,
  UploadsService,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import { postIniFile } from '../../../api/custom/postIniFile';
import { useErrorStore } from '../../../stores/ErrorStore';

Icon.add({ error_outlined });

export const HandleModelComponent = () => {
  const { setAnalogueModelDefault, analogueModel, setAnalogueModel } =
    usePepmContextStore();

  const { progress, setProgress } = useAddModelStore();
  const { uploadStatus, setUploadStatus } = useAddModelStore();
  const { uploading, setUploading } = useAddModelStore();
  const { submitErrors, setSubmitErrors } = useAddModelStore();
  const { addError, addErrors } = useErrorStore();
  const { resetState } = useAddModelStore();
  const { files } = useAddModelStore();
  const { fileErrors, addFileErrors, resetFileErrors } = useAddModelStore();

  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [iniFileString, setIniFileString] = useState<string>();
  const navigate = useNavigate();

  useHandleModelComponent(setAnalogueModel);

  const createModel = useMutation({
    mutationFn: AnalogueModelsService.postApiV1AnalogueModels,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-models'] });
    },
  });
  const uploadIniFile = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: FormData;
    }) => {
      return postIniFile(id, requestBody);
    },
  });
  const createModelManifest = useMutation({
    mutationFn: UploadsService.postApiV1UploadsModelsManifest,
  });

  const uploadModelChunk = useMutation({
    mutationFn: UploadsService.postApiV1UploadsModelsChunks,
  });

  const finishUpload = useMutation({
    mutationFn: UploadsService.postApiV1UploadsModelsComplete,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-models'] });
    },
  });

  const deleteModel = useMutation({
    mutationFn: (id: string) => {
      return AnalogueModelsService.deleteApiV1AnalogueModels(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const convertModelFile = useMutation({
    mutationFn: (requestBody: ConvertAnalogueModelCommand) => {
      return JobsService.postApiV1JobsComputeModelConversions(requestBody);
    },
  });

  async function handleSubmit() {
    setSubmitErrors(validateValues(analogueModel, files));
    if (
      Object.keys(submitErrors).length === 0 &&
      fileErrors.length === 0 &&
      files.INI &&
      files.NC
    ) {
      setUploading(true);
      setUploadStatus(UploadingStatus.Uploading);
      const modelName = analogueModel.name;
      const modelDescription = analogueModel.description;
      const ModelBody: CreateAnalogueModelCommand = {
        name: modelName,
        description: modelDescription,
        sourceType: 'Deltares',
      };

      const model = await createModel.mutateAsync(ModelBody);
      if (model.success && model && model.data.analogueModelId) {
        const iniFile = files.INI;
        const modelFile = files.NC;
        setAnalogueModel({
          ...analogueModel,
          analogueModelId: model.data.analogueModelId,
        });
        const analogueModelId = model.data.analogueModelId;
        // UploadIniFile
        const data = new FormData();
        data.append('file', iniFile!);
        try {
          const iniFileUpload = await uploadIniFile.mutateAsync({
            id: analogueModelId,
            requestBody: data,
          });
          if (iniFileUpload && iniFileUpload.success) {
            // Create Manifest

            const fileType = UploadFileType.NET_CDF;
            const filenameExtention = modelFile.name.split('.').pop();
            const fileExtention = '.' + filenameExtention;

            const data = {
              ModelId: analogueModelId,
              FileSize: modelFile.size,
              FileName: modelFile.name,
              FileExtension: fileExtention,
              FileType: fileType,
            };

            const modelManifest = await createModelManifest.mutateAsync(data);
            // UploadChunks
            if (modelManifest.success) {
              const totalChunkCount = modelManifest.data.numChunks;
              const chunkSize = modelManifest.data.fileSize;
              const uploadId = modelManifest.data.uploadId;

              let begginingOfChunk = 0;
              let endOfChunk = begginingOfChunk + chunkSize;
              let chunksUploaded = 0;
              let chunkNumber = 1;

              while (chunkNumber <= totalChunkCount) {
                const chunk = modelFile.slice(begginingOfChunk, endOfChunk);
                const chunkData = {
                  ModelId: analogueModelId,
                  UploadId: uploadId,
                  Blob: chunk,
                  ChunkNumber: chunkNumber,
                };
                const uploadedChunk = await uploadModelChunk.mutateAsync(
                  chunkData,
                );
                const percentage = (chunkNumber / totalChunkCount) * 100;
                setProgress(percentage);
                if (!uploadedChunk.success) {
                  setUploadStatus(UploadingStatus.Failed);
                  addError('Failed to upload model file');
                  setUploading(false);
                  break;
                }
                chunkNumber += 1;
                chunksUploaded += 1;
                begginingOfChunk = endOfChunk;
                endOfChunk = begginingOfChunk + chunkSize;
              }

              if (chunksUploaded === totalChunkCount) {
                const finishBody = {
                  ModelId: analogueModelId,
                  UploadId: uploadId,
                };
                const finished = await finishUpload.mutateAsync(finishBody);
                if (finished.success) {
                  const convertion = await convertModelFile.mutateAsync({
                    modelId: analogueModelId,
                  });

                  if (convertion.success) {
                    setUploadStatus(UploadingStatus.Success);
                    setUploading(false);
                    setProgress(100);
                    return;
                  } else {
                    setUploadStatus(UploadingStatus.Failed);
                    setUploading(false);
                    addError('Failed to convert model');
                  }
                } else {
                  setUploadStatus(UploadingStatus.Failed);
                  setUploading(false);
                  addError('Failed to complete upload');
                }
              } else {
                setUploadStatus(UploadingStatus.Failed);
                setUploading(false);
                addError('Failed to complete upload');
              }
            } else {
              addError('Failed to create manifest for model upload');
              setUploading(false);
              setUploadStatus(UploadingStatus.Failed);
            }
          } else {
            addError(
              'Failed to upload ini file. Make sure ini file is correct and try again',
            );
            setUploadStatus(UploadingStatus.Failed);
            setUploading(false);
          }
        } catch {
          addError(
            'Failed to upload ini file. Make sure ini file is correct and try again',
          );
          await deleteModel.mutateAsync(analogueModelId);
          setAnalogueModelDefault();
          setUploadStatus(UploadingStatus.NotStarted);
          setUploading(false);
          setProgress(0);
        }
        if (uploadStatus === UploadingStatus.Failed) {
          await deleteModel.mutateAsync(analogueModelId);
          setAnalogueModelDefault();
          setUploadStatus(UploadingStatus.NotStarted);
          setUploading(false);
          setProgress(0);
        }
      }
    } else {
      if (fileErrors.length !== 0) {
        addError(
          'Failed validation of files. Try again or choose another file',
        );
      }
      if (Object.keys(submitErrors).length !== 0) {
        addError('Failed validation of model. Check errors and try again');
      }
      setUploading(false);
    }
  }

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }

  useEffect(() => {
    if (files.INI && iniFileString === undefined) {
      readFileAsText(files.INI).then((val) => {
        setIniFileString(val);
      });
    }
    if (files.INI && iniFileString) {
      const errors = validateIniFile(iniFileString);
      // addErrors(errors)
      addFileErrors(errors);
    } else if (files.INI === undefined) {
      setIniFileString(undefined);
      resetFileErrors();
    }
  }, [files, iniFileString, addErrors, addFileErrors, resetFileErrors]);

  useEffect(() => {
    setSubmitErrors(validateValues(analogueModel, files));
  }, [setAnalogueModel, setSubmitErrors, analogueModel, files]);

  return (
    <Styled.Wrapper>
      {uploadStatus === UploadingStatus.NotStarted && (
        <Typography variant="h3">Add new model</Typography>
      )}
      <Styled.CustomContent>
        {uploadStatus === UploadingStatus.NotStarted && (
          <ModelInputFilesTable
            fileDisplay={{
              isVisible: isFileDisplay,
              toggle: toggleINIFileContent,
            }}
          />
        )}
        {uploadStatus === UploadingStatus.NotStarted &&
          isFileDisplay &&
          iniFileString && (
            <div>
              <IniFileTextField id="iniFile" multiline rowsMax={10}>
                {iniFileString}
              </IniFileTextField>
            </div>
          )}
        {uploadStatus === UploadingStatus.NotStarted && (
          <>
            <ModelMetadata
              metadata={analogueModel}
              setMetadata={setAnalogueModel}
              errors={submitErrors}
            />
            {submitErrors.file && (
              <Styled.ErrorDiv key={submitErrors.file}>
                {submitErrors.file}
              </Styled.ErrorDiv>
            )}
            {fileErrors.length !== 0 &&
              fileErrors.map((x) => (
                <Styled.ErrorDiv key={x.message}>{x.message}</Styled.ErrorDiv>
              ))}
          </>
        )}
      </Styled.CustomContent>
      {uploadStatus !== UploadingStatus.Success && (
        <div>
          <Button
            onClick={handleSubmit}
            disabled={uploadStatus !== UploadingStatus.NotStarted}
          >
            {uploading
              ? 'Wait for model to finish uploading'
              : 'Confirm and start uploading'}
          </Button>
        </div>
      )}
      {uploadStatus === UploadingStatus.Uploading && (
        <Styled.UploadDiv>
          <p className="warning-message">
            <Icon data={error_outlined} className="icon" />
            Remember to keep this browser tab open until the upload has finished
          </p>
          <Typography variant="h4" as="h2">
            Upload progress: {progress !== undefined && progress.toFixed(0)}%
          </Typography>
          {<LinearProgress variant="indeterminate" value={progress} />}
        </Styled.UploadDiv>
      )}
      {uploadStatus === UploadingStatus.Success &&
        analogueModel.analogueModelId && (
          <Styled.InfoNavigation>
            <Typography variant="h4" as="h2">
              Upload complete
            </Typography>
            <div>
              <Button
                onClick={() => {
                  const path = generatePath('../:id/details', {
                    id: analogueModel.analogueModelId,
                  });
                  setAnalogueModelDefault();
                  resetState();
                  navigate(path);
                }}
              >
                Open model
              </Button>
            </div>
          </Styled.InfoNavigation>
        )}
    </Styled.Wrapper>
  );
};
