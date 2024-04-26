/* eslint-disable max-lines-per-function */
import { Button, LinearProgress, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import {
  useHandleModelComponent,
  validateValues,
} from './HandleModelComponent.hooks';
import * as Styled from './HandleModelComponent.styled';

interface AddModelDialogProps {
  confirm?: (file: File, metadata: AnalogueModelDetail) => Promise<void>;
  edit?: (metadata: AnalogueModelDetail) => Promise<void>;
  progress?: number;
  uploading?: boolean;
  defaultMetadata: AnalogueModelDetail;
  isEdit?: boolean;
  existingData?: AnalogueModelDetail;
}

export interface FilesProps {
  NC?: File;
  INI?: File;
}

export type ErrorType = {
  name?: string;
  description?: string;
  field?: string;
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
  edit,
  progress,
  // cancel,
  uploading,
  defaultMetadata,
  isEdit,
  existingData,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesProps>(defaultFiles);
  const [metadata, setMetadata] =
    useState<AnalogueModelDetail>(defaultMetadata);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [rawFile, setrawFile] = useState<File>();

  useHandleModelComponent(
    setFileSize,
    setMetadata,
    files,
    rawFile,
    existingData,
  );

  const handleSubmit = () => {
    setErrors(validateValues(metadata, files, isEdit));
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
      if (!isEdit) setMetadata(defaultMetadata);
      setFiles(defaultFiles);
      setrawFile(undefined);
      setFileSize(0);
      setSubmitting(false);
    };

    const finishSubmit = () => {
      if (files.NC && !isEdit && confirm) {
        confirm(files.NC, metadata);
      } else if (isEdit && edit) {
        edit(metadata);
      }
      cleanupStates();
    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [
    confirm,
    defaultMetadata,
    edit,
    errors,
    files.NC,
    isEdit,
    metadata,
    submitting,
  ]);

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }
  const INIFileContent = () => <p>Not implemented yet...</p>;

  return (
    <Styled.Wrapper>
      <Typography variant="h3">
        {isEdit ? 'Edit model details' : 'Add new model'}
      </Typography>
      <Styled.CustomContent>
        {!isEdit && (
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
        <ModelMetadata
          errors={errors}
          metadata={metadata}
          setMetadata={setMetadata}
        />
        {Object.keys(errors).includes('file') && (
          <Typography className="error">NC file missing</Typography>
        )}
      </Styled.CustomContent>
      <div>
        <Button onClick={handleSubmit} disabled={uploading}>
          {isEdit
            ? 'Save changes'
            : uploading
            ? 'Wait for model to finish uploading'
            : 'Confirm and start uploading'}
        </Button>
        {uploading && <LinearProgress variant="determinate" value={progress} />}
      </div>
    </Styled.Wrapper>
  );
};
