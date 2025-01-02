import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const Table = styled.div`
  .table-wrapper {
    border: 1px solid ${theme.light.ui.background.medium};
    max-height: calc(
      100vh - 64px - 48px - 30px - 16px - 36px - 16px - 48px - 64px
    );
  }
  table {
    table-layout: auto !important;
    width: 100% !important;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: ${spacings.SMALL};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  > p {
    margin: 0;
    padding-right: ${spacings.X_SMALL};
  }
`;
