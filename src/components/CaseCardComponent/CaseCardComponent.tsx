/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { ComputeCaseDto } from '../../api/generated';
import { AddCaseButtons } from '../AddCaseButtons/AddCaseButtons';
import * as Styled from './CaseCardComponent.styled';

export const CaseCardComponent = ({
  children,
  title,
  resultCard,
  subTitle,
  localList,
  addCase,
}: {
  children: React.ReactNode;
  title: string;
  resultCard?: boolean;
  subTitle?: string;
  localList?: ComputeCaseDto[];
  addCase?: (methodType: string) => void;
}) => {
  return (
    <Styled.CaseBorder>
      <Styled.Wrapper>
        <Styled.ButtonGroup>
          <Styled.Title>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h6">{subTitle}</Typography>
          </Styled.Title>
          <AddCaseButtons
            title={title}
            localList={localList}
            addCase={addCase}
          ></AddCaseButtons>
        </Styled.ButtonGroup>

        <Styled.Content className={resultCard ? 'result' : ''}>
          {children}
        </Styled.Content>
      </Styled.Wrapper>
    </Styled.CaseBorder>
  );
};
