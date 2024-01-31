import styled from 'styled-components';
import { spacings } from '../../../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  width: 150px;
`;
