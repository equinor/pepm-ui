import { useNavigate } from 'react-router-dom';
import { ResultType } from '../../../../pages/ModelPages/Results/Results';
import * as Styled from './CaseResultCard.styled';

export const CaseResultCard = ({ result }: { result: ResultType }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${result.id}`);
  };

  return (
    <Styled.CaseResultCard onClick={handleClick}>
      <h2>{result.case}</h2>
      {result.finished ? <h4>Finished</h4> : <h4>Not computed yet!</h4>}
    </Styled.CaseResultCard>
  );
};
