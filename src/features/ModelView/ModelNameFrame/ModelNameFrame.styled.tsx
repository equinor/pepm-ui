import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

export const NameFrame = styled.div`
  width: 100%;
  padding: ${spacings.LARGE} 0;
  background-color: rgb(247, 247, 247, 1);

  > h1 {
    margin: 0;
    padding: 0 ${spacings.X_LARGE};
    font-weight: normal;
  }
`
