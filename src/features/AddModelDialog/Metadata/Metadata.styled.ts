import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

export const Metadata = styled.div`
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
