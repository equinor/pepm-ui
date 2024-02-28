import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${spacings.LARGE};
  min-width: 320px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  width: 150px;
`;

export const Coordinates = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;

export const CoordinateRow = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;

export const RowElement = styled.div`
  white-space: nowrap;
`;
