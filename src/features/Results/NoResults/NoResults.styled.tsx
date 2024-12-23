import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  padding: ${spacings.X_LARGE};

  a {
    color: ${theme.light.primary.resting};
    display: inline-block;
    margin-inline: 0.2em;
  }
`;
