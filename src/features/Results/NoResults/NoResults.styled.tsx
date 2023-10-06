import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

const StyledImg = styled.img`
  scale: 85%;
`
export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: ${spacings.MEDIUM};
`
export { StyledImg as Img }
