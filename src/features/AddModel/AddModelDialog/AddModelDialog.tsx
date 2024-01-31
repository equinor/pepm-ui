/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import { useAddModelDialog, validateValues } from './AddModelDialog.hooks';
import * as Styled from './AddModelDialog.styled';

interface AddModelDialogProps {
  isOpen: boolean;
  confirm?: (file: File, metadata: AnalogueModelDetail) => Promise<void>;
  edit?: (metadata: AnalogueModelDetail) => Promise<void>;
  cancel: () => void;
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

export const AddModelDialog = ({
  isOpen,
  confirm,
  edit,
  cancel,
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

  useAddModelDialog(setFileSize, setMetadata, files, rawFile, existingData);

  const handleSubmit = () => {
    setErrors(validateValues(metadata, files, isEdit));
    setSubmitting(true);
  };

  const handleCancle = () => {
    setMetadata(defaultMetadata);
    setFiles(defaultFiles);
    setErrors({});
    cancel();
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
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>
          {isEdit ? 'Edit model details' : 'Add new model'}
        </Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.DialogCustomContent scrollable>
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
      </Styled.DialogCustomContent>
      <Styled.DialogActions>
        {uploading && (
          <Typography>
            You have to wait until current upload has finnished before a new one
            can start.{' '}
          </Typography>
        )}
        <div>
          <Button onClick={handleSubmit} disabled={uploading}>
            {!isEdit ? 'Confirm and start uploading' : 'Save changes'}
          </Button>
          <Button variant="outlined" onClick={handleCancle}>
            Cancel
          </Button>
        </div>
      </Styled.DialogActions>
    </Styled.Dialog>
  );
};
