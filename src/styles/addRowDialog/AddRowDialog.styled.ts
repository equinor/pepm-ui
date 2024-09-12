import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Actions = styled(Dialog.Actions)`
  display: flex;
  column-gap: ${spacings.SMALL};
`;

export const DialogWindow = styled(Dialog)`
  min-width: 400px;
`;

export const AutocompleteList = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;
