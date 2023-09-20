import { Typography } from '@equinor/eds-core-react'

import logo from './Equinor_HORIZ_logo_RGB_RED.png'
import * as Styled from './Footer.styled'

export const Footer = ({ footerText }: { footerText: string }) => {
  return (
    <Styled.Footer>
      <Typography>{footerText}</Typography>
      <img className="footer-img" src={logo} alt="Equinor Logo" />
    </Styled.Footer>
  )
}
