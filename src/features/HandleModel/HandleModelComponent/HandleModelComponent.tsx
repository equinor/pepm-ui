/* eslint-disable camelcase */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  Button,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AnalogueModelDetail } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import {
  useHandleModelComponent,
  validateValues,
} from './HandleModelComponent.hooks';
import * as Styled from './HandleModelComponent.styled';
Icon.add({ error_outlined });

interface AddModelDialogProps {
  confirm?: (file: File, metadata: AnalogueModelDetail) => Promise<void>;
  progress?: number;
  uploading?: boolean;
  defaultMetadata: AnalogueModelDetail;
  isAddUploading?: boolean;
  existingData?: AnalogueModelDetail;
  modelId?: string;
}

export interface FilesProps {
  NC?: File;
  INI?: File;
}

export type ErrorType = {
  name?: string;
  description?: string;
  country?: string;
  field?: string;
  stratColumn?: string;
  level1?: string;
  level2?: string;
  level3?: string;

  formation?: string;
  file?: string;
  analogues?: string;
  zone?: string;
};

const defaultFiles = {
  NC: undefined,
  INI: undefined,
};

export const HandleModelComponent = ({
  confirm,
  progress,
  uploading,
  defaultMetadata,
  isAddUploading,
  existingData,
  modelId,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesProps>(defaultFiles);
  const [metadata, setMetadata] =
    useState<AnalogueModelDetail>(defaultMetadata);
  const [submitting, setSubmitting] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [rawFile, setrawFile] = useState<File>();

  const [errors, setErrors] = useState<ErrorType>({});
  const navigate = useNavigate();

  useHandleModelComponent(
    setFileSize,
    setMetadata,
    files,
    rawFile,
    existingData,
  );

  const handleSubmit = () => {
    setErrors(validateValues(metadata, files));
    setSubmitting(true);
  };

  const fileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
    setrawFile(e.target.files[0]);
  };

  useEffect(() => {
    const cleanupStates = () => {
      setFiles(defaultFiles);
      setrawFile(undefined);
      setFileSize(0);
      setSubmitting(false);
    };

    const finishSubmit = () => {
      if (files.NC && confirm) {
        confirm(files.NC, metadata);
      }
      cleanupStates();
    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [confirm, defaultMetadata, errors, files.NC, metadata, submitting]);

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }
  const INIFileContent = () => <p>Not implemented yet...</p>;

  return (
    <Styled.Wrapper>
      {progress !== undefined && progress <= 0 && (
        <Typography variant="h3">Add new model</Typography>
      )}
      <Styled.CustomContent>
        {progress !== undefined && progress <= 0 && (
          <ModelInputFilesTable
            files={files}
            setFiles={setFiles}
            fileDisplay={{
              isVisible: isFileDisplay,
              toggle: toggleINIFileContent,
            }}
            fileSize={fileSize}
            fileChange={fileAdded}
          />
        )}
        {isFileDisplay && <INIFileContent />}
        {!isAddUploading && (
          <>
            <ModelMetadata
              errors={errors}
              metadata={metadata}
              setMetadata={setMetadata}
            />
            <Styled.ErrorDiv>{errors.file && errors.file}</Styled.ErrorDiv>
          </>
        )}
      </Styled.CustomContent>
      {!isAddUploading && (
        <div>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading
              ? 'Wait for model to finish uploading'
              : 'Confirm and start uploading'}
          </Button>
        </div>
      )}

      {uploading && (
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

      {progress === 100 && modelId && (
        <Styled.InfoNavigation>
          <Typography variant="h4" as="h2">
            Upload complete
          </Typography>
          <div>
            <Button
              onClick={() => {
                const path = generatePath('../:id/details', {
                  id: modelId,
                });
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
