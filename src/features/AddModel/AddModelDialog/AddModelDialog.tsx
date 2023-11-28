/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueList, MetadataDto } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import * as Styled from './AddModelDialog.styled';

interface AddModelDialogProps {
  isOpen: boolean;
  confirm: (file: File, metadata: MetadataProps) => Promise<void>;
  cancel: () => void;
  uploading: boolean;
}

export default interface MetadataProps {
  name: string;
  description: string;
  metadata: MetadataDto[];
  analogue?: AnalogueList[];
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
};

const defaultMetadata: MetadataProps = {
  name: '',
  description: '',
  metadata: [],
  analogue: [],
};

const defaultFiles = {
  NC: undefined,
  INI: undefined,
};

export const AddModelDialog = ({
  isOpen,
  confirm,
  cancel,
  uploading,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesProps>(defaultFiles);
  const [metadata, setMetadata] = useState<MetadataProps>(defaultMetadata);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [rawFile, setrawFile] = useState<File>();

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }

  const INIFileContent = () => <p>Not implemented yet...</p>;

  const validateValues = (inputValues: Partial<MetadataProps> | undefined) => {
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

    if (!files.NC) {
      errors.file = 'NC file missing';
    }

    return errors;
  };

  const handleSubmit = () => {
    setErrors(validateValues(metadata));
    setSubmitting(true);
  };

  const cleanupStates = () => {
    setMetadata(defaultMetadata);
    setFiles(defaultFiles);
    setrawFile(undefined);
    setFileSize(0);
    setSubmitting(false);
  };

  const finishSubmit = () => {
    if (files.NC) confirm(files.NC, metadata);
    cleanupStates();
  };

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
            Confirm and start uploading
          </Button>
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </Styled.DialogActions>
    </Styled.Dialog>
  );
};
