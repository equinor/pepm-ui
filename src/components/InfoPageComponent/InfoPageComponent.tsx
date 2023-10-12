import { Typography } from '@equinor/eds-core-react';
import * as Styled from './InfoPageComponent.style';

export const InfoPageComponent = ({
  title,
  children,
  scaleHight,
}: {
  title?: string;
  children?: React.ReactNode;
  scaleHight?: string;
}) => {
  return (
    <Styled.Page className={scaleHight && 'scaleHight'}>
      <Styled.InnerWrapper>
        <Typography variant="h1">{title}</Typography>
        {children}
      </Styled.InnerWrapper>
    </Styled.Page>
  );
};
