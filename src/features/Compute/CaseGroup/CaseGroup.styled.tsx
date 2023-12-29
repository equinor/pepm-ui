import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const Parameters = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  padding: ${spacings.LARGE};
  background-color: ${theme.light.ui.background.light};
  border-radius: 0 0 ${spacings.CARD_ROUNDED} 0;
`;

export const Wrapper = styled.div`
  border-left: solid;
  border-width: ${spacings.SMALL};
  border-color: ${theme.light.primary.resting};
  border-radius: ${spacings.BORDER_ROUNDED};
`;

export const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
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
