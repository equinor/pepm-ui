import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const StyledDialog = styled(Dialog)`
  --image-width: 1500px;
  --image-height: 1000px;

  width: min(var(--image-width), 90vw);
  height: min(var(--image-height), 90vh);
  grid-template-rows: auto 52px;

  .dialog-content {
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

    .image-wrapper {
      margin: 0;
    }

    .image {
      display: block;
      width: 100%;
      object-fit: contain;

      /* Tweak the content height inside the dialog minus tabs, actions, padding, etc. */
      max-height: calc(
        min(var(--image-height), 90vh) -
          (16px + 48px + 16px + 16px + 52px + 16px)
      );
    }

    .placeholder-text {
      text-align: center;
    }
  }
`;

export { StyledDialog as Dialog };
