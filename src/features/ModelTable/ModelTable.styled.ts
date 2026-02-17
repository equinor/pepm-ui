import styled from 'styled-components';
import { SideSheet, Typography } from '@equinor/eds-core-react';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const SideSheetContent = styled.div`
  padding: ${spacings.MEDIUM};
`;

export const SideSheetTitle = styled(Typography)`
  display: block;
  margin-bottom: ${spacings.SMALL};
  font-weight: bold;
`;

export const CheckboxColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
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

export const ColumnsButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: ${spacings.MEDIUM};
  gap: ${spacings.X_SMALL};
`;

export const StyledSideSheet = styled(SideSheet)`
  top: ${spacings.XXXX_LARGE} !important;
  bottom: ${spacings.XXXX_LARGE} !important;
  height: calc(
    100dvh - ${spacings.XXXX_LARGE} - ${spacings.XXXX_LARGE}
  ) !important;
  max-height: calc(
    100dvh - ${spacings.XXXX_LARGE} - ${spacings.XXXX_LARGE}
  ) !important;
  overflow-y: auto !important;
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
