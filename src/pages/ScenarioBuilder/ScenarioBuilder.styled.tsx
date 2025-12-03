import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';
import { TextField } from '@equinor/eds-core-react';

export const ScenarioBuilderWrapper = styled.main`
  column-gap: ${spacings.X_LARGE};
  padding: ${spacings.XXX_LARGE} ${spacings.X_LARGE} ${spacings.X_LARGE};

  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  .actions {
    display: flex;
    column-gap: 16px;
    align-items: center;
    margin-block-start: ${spacings.MEDIUM};
  }
`;

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

export const TextInput = styled(TextField)`
  max-width: 600px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;
