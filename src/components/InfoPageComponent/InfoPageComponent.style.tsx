import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

const StyledInforPage = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  padding-top: 10%;

  width: 100%;
  height: 100%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
  width: 50%;
`
export { InnerWrapper, StyledInforPage as Page }
