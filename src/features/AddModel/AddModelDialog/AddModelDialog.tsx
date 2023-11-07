/* eslint-disable max-lines-per-function */
import { Button, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueList } from '../../../api/generated/models/AnalogueList';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import * as Styled from './AddModelDialog.styled';

interface AddModelDialogProps {
  isOpen: boolean;
  confirm: (file: File, metadata: Partial<MetadataProps>) => Promise<void>;
  cancel: () => void;
}

export default interface MetadataProps {
  name: string;
  description: string;
  field: string[];
  zone?: string[];
  formation: string[];
  analogue?: AnalogueList[];
}

export type ErrorType = {
  name?: string;
  description?: string;
  field?: string;
  formation?: string;
  file?: string;
};

export const AddModelDialog = ({
  isOpen,
  confirm,
  cancel,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<{ NC?: File; INI?: File }>({
    NC: undefined,
    INI: undefined,
  });
  const [metadata, setMetadata] = useState<Partial<MetadataProps>>({
    name: '',
    description: '',
    field: [],
    zone: [],
    formation: [],
    analogue: [],
  });
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

    if (inputValues?.field === undefined || inputValues?.field?.length === 0) {
      errors.field = 'Field not selected';
    }

    if (
      inputValues?.formation === undefined ||
      inputValues?.formation?.length === 0
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

  const finishSubmit = () => {
    if (files.NC) confirm(files.NC, metadata);
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
        <Button onClick={handleSubmit}>Confirm and start uploading</Button>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  );
};
