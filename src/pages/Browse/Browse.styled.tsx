import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const BrowseWrapper = styled.div`
  column-gap: ${spacings.X_LARGE};
  padding: ${spacings.XXX_LARGE} ${spacings.X_LARGE};

  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};

  > .btn-div {
    > button {
      width: 136px;
      margin-right: 50px;
    }
  }
`;
