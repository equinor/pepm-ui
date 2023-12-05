import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const Wrapper = styled.div`
  border-left: solid;
  border-width: ${spacings.SMALL};
  border-color: ${theme.light.primary.resting};
  border-radius: ${spacings.BORDER_ROUNDED};
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.LARGE} 0 0 ${spacings.LARGE};
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
