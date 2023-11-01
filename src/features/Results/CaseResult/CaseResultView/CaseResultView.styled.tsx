import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};
  padding: ${spacings.LARGE};

  width: 75vw;
`;

export const CaseResultList = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};
`;
