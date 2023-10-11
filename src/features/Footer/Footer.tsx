import { Typography } from '@equinor/eds-core-react';

import logo from './Equinor_HORIZ_logo_RGB_RED.png';
import * as Styled from './Footer.styled';

export const Footer = ({ text }: { text: string }) => {
  return (
    <Styled.Footer>
      <Typography>{text}</Typography>
      <img className="footer-img" src={logo} alt="Equinor Logo" />
    </Styled.Footer>
  );
};
