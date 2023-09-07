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

  // const [description, setDescription] = useState<string>()
  // const [field, setField] = useState<string[]>()
  // const [zone, setZone] = useState<string[]>()
  // const [formation, setFormation] = useState<string[]>()
  // const [analogue, setAnalogue] = useState<string[]>()
  // const [fieldError, setFieldError] = useState<boolean>(false)
  // const [formationError, setFormationError] = useState<boolean>(false)

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay)
  }

  const INIFileContent = () => <p>Not implemented yet...</p>

  const validateInput = (values: string[] | undefined, target: string) => {
    // const value = e.selectedItems
    // console.log('Kjører: Value => ' + values + ' target => ' + target)

    values === undefined || !typeof Object
      ? setValidationError({ ...validationError, [target]: true })
      : setValidationError({ ...validationError, [target]: false })
    // onChange(metadata)
  }

  const submit = () => {
    /**
     * 
    console.log('Metadata' + metadata)

    console.log('Field: ' + metadata?.field)
    console.log('Formation: ' + metadata?.formation)

    console.log('Type Formation: ' + typeof metadata?.formation)
    console.log('Type Field: ' + typeof metadata?.field)
     */

    validateInput(metadata?.field, 'field')

    validateInput(metadata?.formation, 'formation')
    /**
 * 
console.log('Field error: ' + validationError.field)
console.log('Formation error: ' + validationError.formation)
*/

    // confirm()
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
          onValidate={validateInput}
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
