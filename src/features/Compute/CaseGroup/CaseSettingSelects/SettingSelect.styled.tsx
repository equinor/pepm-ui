import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
import { theme } from '../../../../tokens/theme';

export const AutocompleteWrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  align-items: top;

  column-gap: ${spacings.MEDIUM};
`;

export const Required = styled.div`
  > label {
    color: ${theme.light.danger.text};
  }
`;

export const AutocompleteRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: end;
  column-gap: ${spacings.MEDIUM};

  > div {
    flex-grow: 1;
    > div {
      > label {
        white-space: nowrap;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MetadataWrapper = styled.div`
  > div {
    > label {
      white-space: nowrap;
    }
  }
`;
