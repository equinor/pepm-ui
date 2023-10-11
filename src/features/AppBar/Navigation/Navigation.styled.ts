import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-end;

  > * {
    display: flex;
    gap: ${spacings.SMALL};

    > [aria-selected='false'] {
      border-color: transparent;
    }
  }
`;
export { StyledTabs as Tabs };
