import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

const StyledInforPage = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  padding-top: 10%;

  &.scaleHight {
    height: calc(100% - 75.5px);
    padding-top: 5%;
  }

  width: 100%;
  height: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.LARGE};
  width: 50%;

  > a {
    display: flex;
    width: max-content;

    > svg {
      margin-left: ${spacings.SMALL};
    }
  }
`;
export { InnerWrapper, StyledInforPage as Page };
