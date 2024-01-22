/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
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

interface FilesProps {
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, submitting]);

  useEffect(() => {
    if (rawFile === undefined) return;
    setFileSize(rawFile.size);
  }, [rawFile]);

  useEffect(() => {
    if (files.NC === undefined) setFileSize(0);
  }, [files]);

  useEffect(() => {
    if (existingData) setMetadata(existingData);
  }, [existingData]);

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }

  const INIFileContent = () => <p>Not implemented yet...</p>;

  const validateValues = (
    inputValues: Partial<AnalogueModelDetail> | undefined,
  ) => {
    const errors: ErrorType = {};

    if (inputValues?.name === undefined || inputValues?.name === '') {
      errors.name = 'Name not provided';
    }

    if (
      inputValues?.description === undefined ||
      inputValues?.description === ''
    ) {
      errors.description = 'Description not provided';
    }

    if (
      inputValues?.metadata === undefined ||
      inputValues?.metadata?.filter((m) => m.metadataType === 'Field').length <=
        0
    ) {
      errors.field = 'Field not selected';
    }

    if (
      inputValues?.metadata === undefined ||
      inputValues?.metadata?.filter((m) => m.metadataType === 'Formation')
        .length <= 0
    ) {
      errors.formation = 'Formation not selected';
    }

    if (
      inputValues?.analogues === undefined ||
      inputValues?.analogues?.length <= 0
    ) {
      errors.analogues = 'Analogues not selected';
    }

    if (
      inputValues?.metadata === undefined ||
      inputValues?.metadata?.filter((m) => m.metadataType === 'Zone').length <=
        0
    ) {
      errors.zone = 'Zone not selected';
    }

    if (!files.NC && !isEdit) {
      errors.file = 'NC file missing';
    }

    return errors;
  };

  const handleSubmit = () => {
    setErrors(validateValues(metadata));
    setSubmitting(true);
  };

  const handleCancle = () => {
    setMetadata(defaultMetadata);
    setFiles(defaultFiles);
    setErrors({});
    cancel();
  };

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

  const fileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
    setrawFile(e.target.files[0]);
  };

  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
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
