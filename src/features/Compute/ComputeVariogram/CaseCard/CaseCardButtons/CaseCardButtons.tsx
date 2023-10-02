import { Button } from '@equinor/eds-core-react'
import * as Styled from './CaseCardButtons.styled'

export const CaseCardButtons = ({ runCase }: { runCase: () => void }) => {
  return (
    <Styled.ButtonDiv>
      <Button variant="outlined">Duplicate</Button>
      <Button variant="outlined">Remove</Button>
      <Button variant="outlined" onClick={runCase}>
        Run
      </Button>
    </Styled.ButtonDiv>
  )
}
