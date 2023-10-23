import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};
  padding-left: ${spacings.LARGE};
`;

export const CaseResultCard = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  width: 60vw;
  padding: ${spacings.X_LARGE};

  border-radius: ${spacings.CARD_ROUNDED};
  box-shadow: ${theme.light.ui.elevation.raised};

  > div {
    width: 50%;
  }

  > table {
    width: 50%;
  }
`;
