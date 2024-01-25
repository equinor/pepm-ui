import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const Case = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.X_LARGE};
  column-gap: ${spacings.MEDIUM};
  row-gap: ${spacings.XXX_LARGE};

  width: 70vw;
  max-width: 1400px;

  @media (max-width: 1725px) {
    width: 100%;
  }

  border-left: solid ${spacings.XX_SMALL} ${theme.light.ui.background.medium};
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  column-gap: ${spacings.SMALL};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  column-gap: ${spacings.SMALL};
`;
