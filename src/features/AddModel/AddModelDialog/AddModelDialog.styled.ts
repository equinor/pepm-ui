import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

const StyledDialog = styled(Dialog)`
  min-width: 600px;
  overflow-y: scroll;

  @media (max-height: 1000px) {
    height: 90vh;
  }
`;

const StyledDialogCustomContent = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};
  height: fit-content;
  padding-bottom: ${spacings.XXX_LARGE};

  > p {
    &.error {
      color: red;
    }
  }
`;

const StyledDialogActions = styled(Dialog.Actions)`
  display: flex;
  flex-direction: column;
  gap: ${spacings.SMALL};

  > div {
    display: flex;
    gap: ${spacings.SMALL};
  }
`;

export {
  StyledDialog as Dialog,
  StyledDialogActions as DialogActions,
  StyledDialogCustomContent as DialogCustomContent,
};
