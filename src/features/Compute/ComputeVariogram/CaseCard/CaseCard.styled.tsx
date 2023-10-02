import styled from 'styled-components'
import { spacings } from '../../../../tokens/spacings'
import { theme } from '../../../../tokens/theme'

export const CaseCard = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: ${spacings.LARGE};
  column-gap: ${spacings.MEDIUM};
`
export const Case = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.LARGE};
  column-gap: ${spacings.MEDIUM};

  border: solid thin ${theme.light.ui.background.medium};
`

export const Parameters = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  background-color: ${theme.light.ui.background.light};
  padding: ${spacings.LARGE};
  background-color: ${theme.light.ui.background.light};
`

export const Wrapper = styled.div`
  border-left: solid;
  border-width: thick;
  border-color: ${theme.light.primary.resting};
  border-radius: ${spacings.X_SMALL};
`
