import { Banner, Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const StyledDialog = styled(Dialog)`
  width: fit-content;
  max-height: 90vh;
`;

export const ContentSplitter = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.XXX_LARGE};
`;

export const Selects = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.XXX_LARGE};
  width: 28rem;
`;

export const CoordinateFields = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
`;

export const Content = styled(Dialog.CustomContent)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: ${spacings.SMALL};

  .coordinate-errors {
    padding: 0;
    margin: 0 0 0 ${spacings.LARGE};

    p,
    li {
      color: ${theme.light.danger.text};
    }

    li:has(p:empty) {
      display: none;
    }
  }
`;

export const CoordinateGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const CoordinateInputs = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;

export const Warning = styled(Banner)`
  div {
    background-color: ${theme.light.info.warning};
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
`;

export { StyledDialog as Dialog };
