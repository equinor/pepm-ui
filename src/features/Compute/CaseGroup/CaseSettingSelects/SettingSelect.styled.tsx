import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const AutocompleteWrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;

  column-gap: ${spacings.MEDIUM};
`;

export const Required = styled.div`
  > label {
    color: red;
  }
`;

export const AutocompleteRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: end;
  column-gap: ${spacings.MEDIUM};

  > div {
    flex-grow: 1;
  }
`;
