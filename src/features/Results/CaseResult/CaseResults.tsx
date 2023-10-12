import { ResultType } from '../../../pages/ModelPages/Results/Results';
import * as Styled from './CaseResults.styled';

export const CaseResults = () => {
  const caseResult: ResultType = {
    id: '1',
    case: 'Variogramcase 1',
    finished: true,
  };
  // const results: ResultType[] = [
  //   { id: '1', case: 'Variogramcase 1', finished: true },
  //   { id: '2', case: 'Variogramcase 2', finished: false },
  // ]

  return (
    <>
      <Styled.CaseResults>
        <h2>Case Result</h2>
        <h3>{caseResult.case}</h3>
        {caseResult.finished ? <h4>Finished</h4> : <h4>Not computed yet!</h4>}
      </Styled.CaseResults>
    </>
  );
};
