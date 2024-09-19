import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};

  table {
    border: 1px solid ${theme.light.ui.background.medium};
    border-collapse: collapse;
  }

  /* Equal widths of the icon column in each of the metadata tables */
  td:first-child {
    width: ${spacings.XXX_LARGE};
  }
`;

export const DescriptionMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: ${spacings.MEDIUM};
`;
