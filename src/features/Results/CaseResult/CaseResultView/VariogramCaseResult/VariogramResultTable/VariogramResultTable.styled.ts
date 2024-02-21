import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    overflow-y: hidden;

    > table {
      min-width: 1150px;
    }
    > div {
      margin-top: 2rem;
      min-width: 1150px;
    }

    @media (max-width: 1750px) {
      > table {
        min-width: 100% !important;
      }
      > div {
        min-width: 100% !important;
      }
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  min-width: 500px;
  min-height: 500px;
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.SMALL};
`;

export { StyledDialog as Dialog };
