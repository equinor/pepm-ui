import { Dialog } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

const StyledDialog = styled(Dialog)`
  width: max-content;
`

const StyledDialogActions = styled(Dialog.Actions)`
  display: flex;
  gap: ${spacings.SMALL};
`
export { StyledDialog as Dialog, StyledDialogActions as DialogActions }
