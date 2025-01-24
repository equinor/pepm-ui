import styled from 'styled-components';
import { spacings } from '../../../../../tokens/spacings';
import { theme } from '../../../../../tokens/theme';

export const Case = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.MEDIUM};

  border-bottom: solid thin ${theme.light.ui.background.medium};
  background-color: ${theme.light.ui.background.default};
  border-radius: ${spacings.CARD_ROUNDED};

  &.local-case {
    border: solid lightgreen;
  }
`;

export const CaseRow = styled.div`
  &.Object {
    align-items: center;
  }
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;

export const AutocompleteWrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;
