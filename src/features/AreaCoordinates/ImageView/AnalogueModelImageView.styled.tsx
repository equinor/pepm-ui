import { styled } from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const CanvasWrapper = styled.figure`
  width: fit-content;
  margin: 0;

  .analogue-image {
    max-width: 100%;
    height: auto;
  }

  .caption {
    border-top: 1px solid ${theme.light.ui.background.medium};
    padding-top: ${spacings.SMALL};
    text-align: center;
    color: ${theme.light.text.staticIconsTertiary};
  }
`;
