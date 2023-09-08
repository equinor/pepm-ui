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
  const [validationError, setValidationError] = useState<{
    field: boolean
    formation: boolean
  }>({ field: false, formation: false })
  const [metadata, setMetadata] = useState<Partial<MetadataProps>>()

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay)
  }

  const INIFileContent = () => <p>Not implemented yet...</p>

  const validateInput = (
    // input: { values: string[] | undefined; target: string }[]
    input: { [target: string]: string[] | undefined }
  ) => {
    Object.entries(input).map(([target, value]) =>
      setValidationError({ ...validationError, [target]: value !== undefined })
    )
    // input.forEach((input) => {
    //   console.log('Kjører: ' + input.target)
    //   if (!input.values)
    //     setValidationError({ ...validationError, [input.target]: true })
    //
    //   if (input.values === undefined) {
    //     setValidationError({ ...validationError, [input.target]: true })
    //     console.log('Undefined Error')
    //     console.log(validationError)
    //   } else if (input.values.length === 0) {
    //     setValidationError({ ...validationError, [input.target]: true })
    //     console.log('Length 0 Error')
    //     console.log(validationError)
    //   } else {
    //     setValidationError({ ...validationError, [input.target]: false })
    //     console.log('Ingen Error')
    //     console.log(validationError)
    //   }
    // })
  }

  const submit = () => {
    console.log(metadata)
    validateInput([
      { values: metadata?.field, target: 'field' },
      { values: metadata?.formation, target: 'formation' },
    ])
    validateInput()
    console.log(validationError)
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
          validationError={validationError}
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
