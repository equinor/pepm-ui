import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseResultList = styled.div`
  display: flex;
  flex-direction: column;

  column-gap: ${spacings.LARGE};
  row-gap: ${spacings.LARGE};

  margin: ${spacings.XXX_LARGE};
`;
