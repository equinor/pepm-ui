import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const Case = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${spacings.X_LARGE};
  column-gap: ${spacings.MEDIUM};
  row-gap: ${spacings.XXX_LARGE};

  width: 70%;

  @media (max-width: 1450px) {
    width: 95%;
  }
`;
export const CaseBorder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};

  border-radius: ${spacings.X_SMALL};
  border: solid 1px ${theme.light.ui.background.medium};
`;
export const AddCaseButton = styled(Button)`
  width: fit-content;
`;
