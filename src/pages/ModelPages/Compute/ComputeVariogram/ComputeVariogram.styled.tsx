import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const Case = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.X_LARGE};
  column-gap: ${spacings.MEDIUM};
  row-gap: ${spacings.XXX_LARGE};

  width: 75%;

  @media (max-width: 1450px) {
    width: 95%;
  }

  border-left: solid ${spacings.XX_SMALL} ${theme.light.ui.background.medium};
`;
export const CaseBorder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};

  border-radius: ${spacings.CARD_ROUNDED};
  border: solid 1px ${theme.light.ui.background.medium};
`;
export const AddCaseButton = styled(Button)`
  width: fit-content;
`;
