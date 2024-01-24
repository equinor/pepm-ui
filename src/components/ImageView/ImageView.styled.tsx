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
  width: 100%;

  max-width: fit-content;
  height: fit-content;

  > h5 {
    font-weight: normal;
    margin: 0;
    padding: ${spacings.SMALL};
  }

  > .image {
    max-width: 100%;
    padding: ${spacings.SMALL};
  }
`;
