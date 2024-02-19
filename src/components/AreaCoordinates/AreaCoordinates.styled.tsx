import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const StyledDialog = styled(Dialog)`
  width: fit-content;
`;

export const ContentSplitter = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.XXX_LARGE};
`;

export const Selects = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};

  min-width: 450px;
`;

export const CoordinateFields = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;
  justify-content: start;

  row-gap: ${spacings.SMALL};
`;

export const CoordinateGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CoordinateInputs = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;

export { StyledDialog as Dialog };
