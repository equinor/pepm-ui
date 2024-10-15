import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const DescriptionMeta = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  row-gap: ${spacings.MEDIUM};
`;

export const ModelImageView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${theme.light.ui.background.medium};
  padding: ${spacings.SMALL};
  gap: ${spacings.SMALL};
  img {
    height: 35vh;
    width: auto;
  }
  p {
    text-align: center;
  }
`;

export const ImageMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${theme.light.ui.background.medium};
    padding: ${spacings.SMALL};
    gap: ${spacings.SMALL};
  }
`;

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

export const DescriotionImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  column-gap: ${spacings.XXXX_LARGE};
`;

export const UploadingMeta = styled.div`
  max-width: 40rem;
`;
