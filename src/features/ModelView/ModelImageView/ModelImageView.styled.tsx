import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color: #cdcdcd;

  max-width: 100%;
  height: 100%;

  > h5 {
    font-weight: normal;
    margin: 0;
    padding: ${spacings.SMALL};
  }

  > .metadata-image {
    max-width: 100%;
    padding: ${spacings.SMALL};
  }

  @media (max-width: 1350px) {
    max-width: 100%;

    > .metadata-image {
      max-width: 100%;
    }
  }
`
