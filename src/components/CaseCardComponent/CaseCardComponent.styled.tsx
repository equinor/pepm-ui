import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const Wrapper = styled.div`
  border-left: solid;
  border-width: ${spacings.SMALL};
  border-color: ${theme.light.primary.resting};
  border-radius: ${spacings.BORDER_ROUNDED};

  > .result {
    background-color: ${theme.light.ui.background.default};
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  column-gap: ${spacings.MEDIUM};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.LARGE};
  background-color: ${theme.light.ui.background.light};
`;

export const CaseBorder = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};

  border-radius: ${spacings.CARD_ROUNDED};
  border: solid 1px ${theme.light.ui.background.medium};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  column-gap: ${spacings.SMALL};
  padding: ${spacings.MEDIUM};
`;
