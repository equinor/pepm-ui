import { Button, Typography } from '@equinor/eds-core-react'
import * as Styled from './ComputeCaseInfoActions.styled'

export const ComputeCaseInfoActions = ({
  addCase,
}: {
  addCase: () => void
}) => {
  return (
    <Styled.CaseOverview>
      <Styled.Text>
        <Typography variant="h2">Variogram cases</Typography>
        <Typography variant="body_long">
          You can add multiple cases for the different areas in your model.
        </Typography>
      </Styled.Text>
      <Styled.Buttons>
        <Button variant="outlined" onClick={addCase}>
          Add Variogram case
        </Button>
        <Button>Run all variograms</Button>
      </Styled.Buttons>
    </Styled.CaseOverview>
  )
}
