import { Dialog } from '@equinor/eds-core-react';
import { styled } from 'styled-components';

export const IniParamDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  width: min(720px, 75vw);

  table {
    width: 100%;
  }
`;

export const IniDialogContent = styled(Dialog.CustomContent)`
  height: 40vh;
`;
