/* eslint-disable max-lines-per-function */
import { Button } from '@equinor/eds-core-react'
import { useState } from 'react'
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable'
import { ModelMetadata } from '../ModelMetadata/ModelMetadata'
import * as Styled from './AddModelDialog.styled'

interface AddModelDialogProps {
  isOpen: boolean
  confirm: () => void
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
  const [metadata, setMetadata] = useState<Partial<MetadataProps>>()

  const [fieldValidationError, setFieldValidationError] =
    useState<boolean>(false)
  const [formationValidationError, setFormationValidationError] =
    useState<boolean>(false)
  // const [validationError, setValidationError] = useState<{
  //   field: boolean
  //   formation: boolean
  // }>({ field: false, formation: false })

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay)
  }

  const INIFileContent = () => <p>Not implemented yet...</p>

  /** 
   * 
   * 
  const validateInput = (
    input: {
      values: string[] | undefined
      target: string
    }[]
    ) =>
    input.forEach((input) => {
      console.log('Kjører: ' + input.target)
      if (!input.values)
      setValidationError({ ...validationError, [input.target]: true })
    
    if (input.values === undefined) {
      setValidationError({ ...validationError, [input.target]: true })
      console.log('Undefined Error')
      console.log(validationError)
    } else if (input.values.length === 0) {
      setValidationError({ ...validationError, [input.target]: true })
      console.log('Length 0 Error')
      console.log(validationError)
    } else {
      setValidationError({ ...validationError, [input.target]: false })
      console.log('Ingen Error')
      console.log(validationError)
    }
  })

  validateInput([
      { values: metadata?.field, target: 'field' },
      { values: metadata?.formation, target: 'formation' },
    ])
  */

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

  const submit = () => {
    validateFieldInput()
    validateFormationInput()
  }

  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.DialogCustomContent scrollable>
        <ModelInputFilesTable
          fileDisplay={{
            isVisible: isFileDisplay,
            toggle: toggleINIFileContent,
          }}
        />
        {isFileDisplay && <INIFileContent />}
        <ModelMetadata
          // onValidate={validateInput}
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
