import styled from 'styled-components'
import { spacings } from '../tokens/spacings'

export const StyledDiv = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > .table-wrapper {
    > table {
      width: auto !important;
      margin: 0px !important;
    }

    > div {
      max-width: none !important;
    }
  }
`
