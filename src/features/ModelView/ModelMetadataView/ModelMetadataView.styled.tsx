import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};

  > button {
    width: fit-content;
  }
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
`;

export const MetadataInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  max-width: 60%;
`;

export const Actions = styled(Dialog.Actions)`
  display: flex;
  column-gap: ${spacings.SMALL};
`;
