import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
`;

export const CustomContent = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};
`;

export const UploadDiv = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
`;

export const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.SMALL};
`;

export const InfoNavigation = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;
