import styled from 'styled-components';
import { spacings } from '../tokens/spacings';

export const StyledDiv = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > .table-wrapper {
    > table {
      width: auto !important;
    }
  }
`;
