import { TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';
export const ModelMetadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  min-height: 200px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;

export const TextInput = styled(TextField)``;

export const InputfieldRequired = styled.div`
  > label {
    color: ${theme.light.danger.text};
    margin-block-start: ${spacings.X_SMALL};
  }
`;
