import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

const FileUpload = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacings.X_SMALL};

  > input[type='file'] {
    opacity: 0;
  }
`

const SelectFile = styled(Typography).attrs({ variant: 'body_short_link' })`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
`

export { FileUpload, SelectFile }
