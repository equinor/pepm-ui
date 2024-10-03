import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const DialogWrapper = styled(Dialog)`
  min-width: 336px;
`;

export const Buttons = styled(Dialog.Actions)`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
`;
