import styled from 'styled-components';
import { theme } from '../../../../../../tokens/theme';
import { spacings } from '../../../../../../tokens/spacings';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-auto-rows: auto;
  grid-column: 1 / 6;
  align-items: end;
  padding: ${spacings.MEDIUM_SMALL} ${spacings.LARGE};
  border-right: 1px solid ${theme.light.ui.background.medium};

  > * {
    grid-column: 1 / -1;
  }

  > hr {
    grid-row: 2 / 3;
  }
`;

export const ResultHeader = styled.div`
  display: grid;
  grid-row: 1 / 2;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${spacings.MEDIUM};
  white-space: nowrap;

  .actions {
    display: flex;
    column-gap: ${spacings.MEDIUM};
    align-items: center;
  }
`;

export const CoordinateDiv = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-row: 3 / 4;
`;

export const RowElement = styled.div`
  white-space: nowrap;
  > label {
    margin-inline-start: 0;
  }

  &.area {
    padding-inline-end: ${spacings.MEDIUM};
    min-width: 220px;
    width: fit-content;
  }

  &:not(.area) {
    padding-inline: ${spacings.MEDIUM};
    border-left: 1px solid ${theme.light.ui.background.medium};

    &:last-child {
      padding-inline-end: 0;
    }
  }

  .value {
    font-size: 0.875rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`;

export const VerticalDivider = styled.div`
  background-color: ${theme.light.ui.background.medium};
  margin-left: ${spacings.SMALL};
  margin-right: calc(${spacings.SMALL} - 1px);
  width: 1px;
`;
