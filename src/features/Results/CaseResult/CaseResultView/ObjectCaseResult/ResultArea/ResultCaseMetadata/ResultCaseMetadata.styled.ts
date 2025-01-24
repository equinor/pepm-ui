import styled from 'styled-components';
import { spacings } from '../../../../../../../tokens/spacings';

export const MetadataWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.LARGE};
  align-items: flex-end;
`;

export const MetadataDiv = styled.div`
  > label {
    margin-inline-start: 0;
  }
`;
