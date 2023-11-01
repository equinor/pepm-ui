import { Typography } from '@equinor/eds-core-react';
import * as Styled from './CaseCardComponent.styled';

export const CaseCardComponent = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <Styled.CaseBorder>
      <Styled.Wrapper>
        <Styled.Title>
          <Typography variant="h4">{title}</Typography>
        </Styled.Title>
        {children}
      </Styled.Wrapper>
    </Styled.CaseBorder>
  );
};
