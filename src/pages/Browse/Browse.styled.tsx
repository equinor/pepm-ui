import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const BrowseWrapper = styled.div`
  column-gap: ${spacings.X_LARGE};
  padding: ${spacings.XXX_LARGE} ${spacings.X_LARGE} ${spacings.X_LARGE};

  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  .actions {
    display: flex;
    column-gap: 16px;
    align-items: center;
    margin-block-start: ${spacings.MEDIUM};
  }
`;
