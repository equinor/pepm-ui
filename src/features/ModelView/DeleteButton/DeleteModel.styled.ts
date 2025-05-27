import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { Dialog } from '@equinor/eds-core-react';

export const DeleteDialog = styled(Dialog)`
  min-width: 336px;

  .actions {
    display: flex;
    flex-flow: row nowrap;
    column-gap: ${spacings.SMALL};
  }
`;
