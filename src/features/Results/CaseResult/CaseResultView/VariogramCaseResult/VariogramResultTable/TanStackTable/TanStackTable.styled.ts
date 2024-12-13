import styled from 'styled-components';
import { theme } from '../../../../../../../tokens/theme';
import { spacings } from '../../../../../../../tokens/spacings';

export const TableWrapper = styled.div`
  .variogram-results-table {
    border: 1px solid #dcdcdc;
    border-collapse: collapse;
    min-width: 1180px;

    /* Fixed width for the expand toggle button column */
    > thead th:first-child,
    > tbody td:not(.expanded-cell, .expanded-cell td):first-child {
      width: calc(
        ${spacings.MEDIUM} + ${spacings.XXX_LARGE} + ${spacings.MEDIUM}
      );
      text-align: center;
    }

    /* Fixed width for the "Published" toggle button column */
    > thead th:last-child,
    > tbody td:not(.expanded-cell, .expanded-cell td):last-child {
      width: 136px;
    }

    > thead {
      border-bottom: 2px solid
        var(--eds_ui_background__medium, rgba(220, 220, 220, 1));
      background: var(
        --eds_interactive_table__header__fill_resting,
        rgba(247, 247, 247, 1)
      );
      > tr {
        > th {
          white-space: nowrap;
          min-height: var(--eds_table__cell__height, 48px);
          height: var(--eds_table__cell__height, 48px);
          background: var(
            --eds_interactive_table__header__fill_resting,
            rgba(247, 247, 247, 1)
          );
          box-sizing: border-box;
          padding-left: var(--eds_table__cell__padding_x, 16px);
          padding-top: var(--eds_table__cell__padding_y, 0);
          padding-right: var(--eds_table__cell__padding_x, 16px);
          padding-bottom: var(--eds_table__cell__padding_y, 0);
          margin: 0;
          color: var(--eds_text__static_icons__default, rgba(61, 61, 61, 1));
          font-family: Equinor;
          font-size: var(--eds_table__font_size, 0.875rem);
          font-weight: 700;
          line-height: 1.429em;
          text-align: left;
          border-bottom: 2px solid
            var(--eds_ui_background__medium, rgba(220, 220, 220, 1));
        }
      }
    }

    > tbody {
      border-bottom: 1px solid
        var(--eds_ui_background__medium, rgba(220, 220, 220, 1));

      > tr {
        > td {
          white-space: nowrap;
          min-height: var(--eds_table__cell__height, 48px);
          height: var(--eds_table__cell__height, 48px);
          vertical-align: var(--eds_table__cell__vertical_align, inherit);
          box-sizing: border-box;
          padding-left: var(--eds_table__cell__padding_x, 16px);
          padding-top: var(--eds_table__cell__padding_y, 0);
          padding-right: var(--eds_table__cell__padding_x, 16px);
          padding-bottom: var(--eds_table__cell__padding_y, 0);
          margin: 0;
          color: var(--eds_text__static_icons__default, rgba(61, 61, 61, 1));
          font-family: Equinor;
          font-size: var(--eds_table__font_size, 0.875rem);
          font-weight: 500;
          line-height: 1.429em;
          text-align: left;
          border-bottom: 1px solid
            var(--eds_ui_background__medium, rgba(220, 220, 220, 1));
        }
      }
    }

    .expanded-cell {
      background-color: ${theme.light.ui.background.light};
      padding-inline: 0;
    }

    .has-tooltip {
      display: flex;
      column-gap: ${spacings.SMALL};
      align-items: center;

      .icon {
        color: ${theme.light.primary.resting};
      }
    }
  }
`;
