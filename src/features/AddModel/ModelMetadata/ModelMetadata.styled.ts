import { TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
export const ModelMetadata = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;

export const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
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

export const TextInput = styled(TextField)`
  display: flex;
  flex-direction: column;
`;
export const Required = styled.div`
  > label {
    color: red;
  }
  > .model-required {
    > div {
      > div {
        border: solid 2px red;
      }
    }
  }
`;
