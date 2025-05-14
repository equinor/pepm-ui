import styled from 'styled-components';
import { theme } from '../../../tokens/theme';
import { spacings } from '../../../tokens/spacings';

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
  min-height: 40rem;
  min-width: 32rem;
  canvas {
    min-height: 32rem;
    min-width: 32rem;
  }
`;
