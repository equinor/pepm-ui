import { Accordion, Dialog } from '@equinor/eds-core-react';
import { styled } from 'styled-components';

export const IniParamDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

export const IniParamAccordion = styled(Accordion)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const IniParamTable = styled.div`
  display: grid;
  overflow: auto;
`;

export const IniDialogContent = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;
  height: 40vh;
`;
