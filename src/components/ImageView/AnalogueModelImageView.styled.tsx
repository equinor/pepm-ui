import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color: ${theme.light.ui.background.medium};
  width: auto;

  max-width: 70vh;
  max-height: 70vh;
  height: fit-content;
  > h5 {
    font-weight: normal;
    margin: 0;
    padding: ${spacings.SMALL};
  }

  > .image {
    width: 40%;
    height: auto;
    padding: ${spacings.SMALL};
  }
`;

export const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  width: 45vw;
`;
