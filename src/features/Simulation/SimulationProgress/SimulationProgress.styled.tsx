import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacings.MEDIUM};
  padding: ${spacings.LARGE};
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacings.MEDIUM};
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.SMALL};
`;

export const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacings.MEDIUM};
`;
