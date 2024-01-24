import { TopBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

const StyledTopBar = styled(TopBar)`
  column-gap: ${spacings.X_LARGE};
`;

const StyledHeader = styled(TopBar.Header)`
  cursor: pointer;
`;

export { StyledHeader as Header, StyledTopBar as TopBar };
