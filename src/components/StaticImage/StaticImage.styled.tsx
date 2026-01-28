import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacings.MEDIUM};
  min-height: 100px;
`;
