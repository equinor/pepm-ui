/* eslint-disable max-lines-per-function */
import { Button } from '@equinor/eds-core-react'
import { useState } from 'react'
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable'
import { ModelMetadata } from '../ModelMetadata/ModelMetadata'
import * as Styled from './AddModelDialog.styled'

interface AddModelDialogProps {
  isOpen: boolean
  confirm: (file: File) => Promise<void>
  cancel: () => void
}

export default interface MetadataProps {
  description?: string
  field: string[]
  zone?: string[]
  formation: string[]
  analogue?: string[]
}

export const AddModelDialog = ({
  isOpen,
  confirm,
  cancel,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false)
  const [files, setFiles] = useState<{ NC?: File; INI?: File }>({
    NC: undefined,
    INI: undefined,
  })
  const [metadata, setMetadata] = useState<Partial<MetadataProps>>()

  const [fieldValidationError, setFieldValidationError] =
    useState<boolean>(false)
  const [formationValidationError, setFormationValidationError] =
    useState<boolean>(false)

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay)
  }

  const INIFileContent = () => <p>Not implemented yet...</p>

  const validateFieldInput = () => {
    if (metadata?.field === undefined) {
      setFieldValidationError(true)
    } else if (metadata?.field.length === 0) {
      setFieldValidationError(true)
    } else {
      setFieldValidationError(false)
    }
  }
  const validateFormationInput = () => {
    if (metadata?.formation === undefined) {
      setFormationValidationError(true)
    } else if (metadata?.formation.length === 0) {
      setFormationValidationError(true)
    } else {
      setFormationValidationError(false)
    }
  }

  const uploadFile = () => {
    if (files.NC) confirm(files.NC)
  }

  const submit = () => {
    validateFieldInput()
    validateFormationInput()

    if (!fieldValidationError || !formationValidationError) uploadFile()
  }

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
        <ModelMetadata
          fieldValidationError={fieldValidationError}
          formationValidationError={formationValidationError}
          metadata={metadata}
          setMetadata={setMetadata}
        />
      </Styled.DialogCustomContent>
      <Styled.DialogActions>
        <Button onClick={submit}>Confirm and start uploading</Button>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  )
}
