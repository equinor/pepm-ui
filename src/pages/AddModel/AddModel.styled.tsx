import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const PageLayout = styled.div`
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 16rem 1fr;
  height: 100%;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: ${spacings.XXX_LARGE};
  padding: ${spacings.X_LARGE} ${spacings.X_LARGE}
    calc(${spacings.XXXX_LARGE} + ${spacings.X_LARGE});
`;
