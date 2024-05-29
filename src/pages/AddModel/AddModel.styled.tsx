import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const PageLayout = styled.div`
  display: flex;
  fled-direction: row;
  flex: auto;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  fled-direction: column;

  width: 100%;
  overflow: scroll;

  padding: ${spacings.XX_LARGE} ${spacings.X_LARGE};
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};
`;
