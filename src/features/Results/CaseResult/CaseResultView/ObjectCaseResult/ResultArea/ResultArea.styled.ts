import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${spacings.MEDIUM_SMALL} 0 ${spacings.MEDIUM_SMALL} ${spacings.LARGE};
  row-gap: ${spacings.MEDIUM_SMALL};
`;

export const ResultHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

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

export const CoordinateDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowElement = styled.div`
  white-space: nowrap;
  > label {
    margin: 0;
  }
`;

export const Divider = styled.div`
  width: 100%;
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 100%;
  margin: 0 ${spacings.MEDIUM};
  border: 0.5px solid #e0e0e0;
`;
