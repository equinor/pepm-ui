import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const StyledDialog = styled(Dialog)`
  width: min(1500px, 90vw);
  height: min(1000px, 90vh);
  grid-template-rows: auto 52px;
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.SMALL};

  .tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tabs-panels {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tabs-panel {
    align-self: center;
  }
`;

export { StyledDialog as Dialog };

export const ImageWrapper = styled.div`
  .image {
    display: block;
    width: 100%;
    object-fit: contain;
    max-height: calc(
      min(1000px, 90vh) - 16px - 48px - 16px - 16px - 52px - 16px
    ); /* Tweaking the height to match the content area minus patting, tab bars, action bar, etc. */
  }

  .placeholder-text {
    text-align: center;
  }
`;
