import { Card } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Content = styled(Card.Content)`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  align-items: flex-start;
`;
