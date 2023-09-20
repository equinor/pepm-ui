import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'
import { theme } from '../../tokens/theme'

const StyledFooter = styled.footer`
  height: ${spacings.XXXX_LARGE};

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid ${theme.light.ui.background.medium};

  padding: ${spacings.SMALL} ${spacings.LARGE};

  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  > .footer-img {
    height: ${spacings.XXX_LARGE};
  }
`
export { StyledFooter as Footer }
