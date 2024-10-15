import styled from 'styled-components';
import { spacings } from '../../../../../../../tokens/spacings';

export const MetadataWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MetadataDiv = styled.div`
  align-items: start;
  padding-right: ${spacings.MEDIUM};
  > label {
    margin: 0;
  }
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 100%;
  margin: 0 ${spacings.MEDIUM};
  border: 0.5px solid #e0e0e0;
`;
