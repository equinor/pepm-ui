import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';
import { TextField } from '@equinor/eds-core-react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
`;

export const CustomContent = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};
`;

export const UploadDiv = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  .warning-message {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: ${spacings.SMALL};
    padding: ${spacings.MEDIUM_SMALL} ${spacings.MEDIUM};
    border-radius: ${spacings.X_SMALL};
    background-color: ${theme.light.warning.highlight};
    color: ${theme.light.text.staticIconsDefault};

    .icon {
      fill: ${theme.light.warning.text};
    }
  }
`;

export const ErrorDiv = styled.div`
  color: ${theme.light.danger.text};
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.333em;
`;

export const InfoNavigation = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;

export const IniFileTextField = styled(TextField)`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;
