import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const StyledDialog = styled(Dialog)`
  width: fit-content;
  min-width: 500px;
  min-height: 500px;
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.SMALL};
`;

export { StyledDialog as Dialog };
