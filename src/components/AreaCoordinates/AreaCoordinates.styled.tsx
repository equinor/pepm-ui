import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const StyledDialog = styled(Dialog)`
  min-width: 500px;
  min-height: 500px;
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;

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

export { StyledDialog as Dialog };
