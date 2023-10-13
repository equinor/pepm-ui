import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const CaseResultCard = styled.div`
  display: flex;
  flex-direction: row;

  width: 60%;
  column-gap: ${spacings.LARGE};
  padding-left: ${spacings.LARGE};

  background-color: ${theme.light.ui.background.light};

  &:hover {
    background-color: ${theme.light.ui.background.medium};
    cursor: pointer;
  }
`;
