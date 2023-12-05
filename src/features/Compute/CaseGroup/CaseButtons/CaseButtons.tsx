import { Button } from '@equinor/eds-core-react';
import * as Styled from './CaseButtons.styled';

export const CaseButtons = ({
  id,
  removeCase,
  runCase,
}: {
  id: string;
  removeCase: (id: string) => void;
  runCase?: () => void;
}) => {
  return (
    <Styled.ButtonDiv>
      <Button variant="outlined">Duplicate</Button>
      <Button variant="outlined" onClick={() => removeCase(id)}>
        Remove
      </Button>
      <Button variant="outlined" onClick={runCase}>
        Run
      </Button>
    </Styled.ButtonDiv>
  );
};
