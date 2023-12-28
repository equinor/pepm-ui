import { Typography } from '@equinor/eds-core-react';
import * as Styled from './CaseCardComponent.styled';

export const CaseCardComponent = ({
  children,
  title,
  resultCard,
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  resultCard?: boolean;
  subTitle?: string;
}) => {
  return (
    <Styled.CaseBorder>
      <Styled.Wrapper>
        <Styled.Title>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h6">{subTitle}</Typography>
        </Styled.Title>
        <Styled.Content className={resultCard ? 'result' : ''}>
          {children}
        </Styled.Content>
      </Styled.Wrapper>
    </Styled.CaseBorder>
  );
};
