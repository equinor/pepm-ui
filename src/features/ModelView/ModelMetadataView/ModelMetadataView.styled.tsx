import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};

  > button {
    width: fit-content;
  }
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
`;

export const MetadataInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  max-width: 60%;
`;
