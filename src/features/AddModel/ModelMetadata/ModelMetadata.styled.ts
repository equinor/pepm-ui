import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

export const ModelMetadata = styled.div`
  &.model-metadata {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: ${spacings.MEDIUM}};
    row-gap: ${spacings.MEDIUM};

    > .model-description {
      grid-column: 1 / span 2;
    }

    > .model-required {
      border-style: solid;
      border-width: 2px;
      border-color: red;
    }
    
    > .required-div {
      > label {
        color: red !important;
      }
      > .model-required2 {
        > div {
          border-style: solid !important;
          border-width: 2px !important;
          border-color: red !important;
        }
      }
    }
  }
`
