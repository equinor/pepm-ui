import styled from 'styled-components';
import { SideSheet, Typography } from '@equinor/eds-core-react';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacings.MEDIUM_SMALL};
  align-items: center;
`;

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
  min-width: 60%;
  max-width: 85%;
  .table-wrapper {
    border: 1px solid ${theme.light.ui.background.medium};
    max-height: 90vh;
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
  height: 100vh !important;
  top: ${spacings.XXXX_LARGE} !important;
  bottom: ${spacings.XXXX_LARGE} !important;
  max-height: 86vh !important;
`;
