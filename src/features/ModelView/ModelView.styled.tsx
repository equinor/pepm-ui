import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const MetadataWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(7, auto);
  gap: 1.5rem;
  padding: ${spacings.X_LARGE};
  max-width: 1280px;

  > * {
    grid-column: 1 / -1; // Each card will display in full width by default
  }

  .model-title,
  .card-title {
    font-weight: 700;
  }

  .model-title {
    word-break: break-all;
  }

  /* 
    Assign explicit grid rules for the cards that are split into multiple columns and rows
    The grid-area shorthand is "row-start / column-start / row-end / column-end"
   */
  .card-name {
    grid-area: auto / 1 / auto / 7;
  }

  .card-areas {
    grid-area: auto / 1 / auto / 7;
  }

  .card-image {
    grid-area: 1 / 7 / span 2 / 16;

    :has(.model-error-message) & {
      grid-area: 2 / 7 / span 2 / 16;
    }
  }

  .card-files {
    grid-area: auto / 1 / auto / 11;
  }

  .card-ini {
    grid-area: auto / 11 / auto / 16;
  }
`;
