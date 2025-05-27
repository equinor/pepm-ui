import { Dialog } from '@equinor/eds-core-react';
import { styled } from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const ArchelDialogWrapper = styled(Dialog)`
  min-width: 32em;
`;

export const ArchelMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  table {
    border: 1px solid ${theme.light.ui.background.medium};
    border-collapse: collapse;
  }
`;
