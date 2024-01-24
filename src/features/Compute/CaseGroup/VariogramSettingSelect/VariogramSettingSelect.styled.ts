import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: start;
`;

export const SettingsContainer = styled.div`
  padding-top: ${spacings.SMALL};
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.SMALL};
`;
