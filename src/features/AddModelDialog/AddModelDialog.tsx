import { Button } from '@equinor/eds-core-react';
import { useState } from 'react';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import * as Styled from './AddModelDialog.styled';

interface AddModelDialogProps {
  isOpen: boolean;
  confirm: (file: File) => Promise<void>;
  cancel: () => void;
}

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

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }

  const INIFileContent = () => <p>Not implemented yet...</p>;

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
        />
        {isFileDisplay && <INIFileContent />}
        <ModelMetadata />
      </Styled.DialogCustomContent>
      <Styled.DialogActions>
        <Button onClick={() => (files.NC ? confirm(files.NC) : {})}>
          Confirm and start uploading
        </Button>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  );
};
