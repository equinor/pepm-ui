import { Dialog } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

const StyledDialog = styled(Dialog)`
  width: max-content;
`

const StyledDialogCustomContent = styled(Dialog.CustomContent)`
  display: grid;
  row-gap: ${spacings.X_LARGE};
`

const StyledDialogActions = styled(Dialog.Actions)`
  display: flex;
  gap: ${spacings.SMALL};
`

const StyledMetadata = styled.div`
  &.model-metadata {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: ${spacings.MEDIUM}};
    row-gap: ${spacings.MEDIUM};

    > .model-description {
      grid-column: 1 / span 2;
    }
  }
`

export {
  StyledDialog as Dialog,
  StyledDialogActions as DialogActions,
  StyledDialogCustomContent as DialogCustomContent,
  StyledMetadata as Metadata,
}
