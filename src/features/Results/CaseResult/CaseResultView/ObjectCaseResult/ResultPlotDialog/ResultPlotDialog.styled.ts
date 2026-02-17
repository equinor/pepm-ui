import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Content = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  width: 100%;
`;

export const GraphDialog = styled(Dialog)`
  min-height: 400px;
  min-width: 700px;
  width: fit-content;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${spacings.X_LARGE};
  padding-left: ${spacings.SMALL};
`;

export const RadioButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    padding-right: 0;
    padding-left: 0;
  }
`;
