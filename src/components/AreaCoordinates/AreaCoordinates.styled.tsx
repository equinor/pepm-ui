import { Typography } from '@equinor/eds-core-react';
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

  row-gap: ${spacings.LARGE};
`;

export const CoordinateGroup = styled.div`
  display: flex;
  flex-direction: column;

  > .error {
    color: red;
  }
`;

export const ErrorMessage = styled(Typography)`
  color: red;
`;
