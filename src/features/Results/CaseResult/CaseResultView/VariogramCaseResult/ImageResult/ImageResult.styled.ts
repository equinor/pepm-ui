import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

import { theme } from '../../../../../../tokens/theme';

export const StyledDialog = styled(Dialog)`
  width: fit-content;
  max-width: 90vw;
  max-height: 90vh;
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.SMALL};
`;

export { StyledDialog as Dialog };

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color: ${theme.light.ui.background.medium};

  > h5 {
    font-weight: normal;
    padding: ${spacings.SMALL};
  }

  > .image {
    width: fit-content;
    max-width: 80vw;
    max-height: 70vh;
    padding: ${spacings.SMALL};

    @media (max-width: 1200px) {
      width: fit-content;
      max-width: 70vw;
      max-height: 60vh;
    }
    @media (max-width: 800px) {
      width: fit-content;
      max-width: 60vw;
      max-height: 50vh;
    }
  }
`;
