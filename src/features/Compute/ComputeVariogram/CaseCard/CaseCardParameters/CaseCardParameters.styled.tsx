import styled from 'styled-components'
import { spacings } from '../../../../../tokens/spacings'
import { theme } from '../../../../../tokens/theme'

export const Parameters = styled.div`
  background-color: ${theme.light.ui.background.default};
  padding: ${spacings.MEDIUM};
  border-radius: ${spacings.X_SMALL};
  box-shadow: ${theme.light.ui.elevation.raised};

  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${spacings.MEDIUM};
`
