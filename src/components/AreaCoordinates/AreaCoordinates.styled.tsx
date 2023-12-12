import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const SideSheet = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.X_LARGE};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
`;
export const CoordinateGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CoordinateInputs = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.MEDIUM};
`;
