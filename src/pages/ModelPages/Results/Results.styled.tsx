import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: ${spacings.MEDIUM};
`

export const ResultCaseList = styled.div`
  display: flex;
  flex-direction: column;

  column-gap: ${spacings.LARGE};
  row-gap: ${spacings.LARGE};

  margin: ${spacings.XXX_LARGE};
`
