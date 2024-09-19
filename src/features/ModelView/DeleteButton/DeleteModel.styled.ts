import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { Dialog } from '@equinor/eds-core-react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  align-items: flex-start;
`;

export const DeleteDialog = styled(Dialog)`
  min-width: 336px;

  .actions {
    display: flex;
    flex-flow: row nowrap;
    column-gap: ${spacings.SMALL};
  }
`;
