import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Actions = styled(Dialog.Actions)`
  display: flex;
  flex: row;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
  align-items: start;
`;
