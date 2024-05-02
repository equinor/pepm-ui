import { Banner } from '@equinor/eds-core-react';
import * as Styled from './ErrorBanner.styled';

export const ErrorBanner = ({ text }: { text: string | undefined }) => {
  return (
    <Styled.Error>
      <Banner.Message color="#C7264C">
        {text !== undefined ? text : ''}
      </Banner.Message>
    </Styled.Error>
  );
};
