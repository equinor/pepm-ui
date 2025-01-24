import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  column-gap: ${spacings.SMALL};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  column-gap: ${spacings.SMALL};
`;
