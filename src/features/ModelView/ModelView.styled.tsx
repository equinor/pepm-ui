import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: ${spacings.XXX_LARGE};
  padding: ${spacings.X_LARGE} ${spacings.X_LARGE}
    calc(${spacings.XXXX_LARGE} + ${spacings.X_LARGE});
`;
