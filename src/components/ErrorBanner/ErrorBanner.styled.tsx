import { Banner } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Error = styled(Banner)`
  max-width: 650px;
  box-shadow: none;
  hr {
    height: 0px;
  }

  div {
    background-color: #ffaebf;
    border: solid 1px #c7264c;
    border-radius: ${spacings.BORDER_ROUNDED};
  }
`;
