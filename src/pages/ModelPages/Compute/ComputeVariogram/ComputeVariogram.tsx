import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { CaseCard } from '../../../../features/Compute/ComputeVariogram/CaseCard/CaseCard'
import { ComputeCaseInfoActions } from '../../../../features/Compute/ComputeVariogram/ComputeCaseInfoActions/ComputeCaseInfoActions'
import * as Styled from './ComputeVariogram.styled'

interface Casetype {
  id: number
  name: string
}
export const ComputeVariogram = () => {
  const [cases, setCases] = useState<Casetype[]>([
    { id: 1, name: 'Variogram Case 1' },
  ])

  const AddCase = () => {
    const newCase: Casetype = {
      id: Math.floor(Math.random() * 100),
      name: `Variogram Case ${cases.length + 1}`,
    }

    setCases([...cases, newCase])
  }

  return (
    <Styled.Case>
      <ComputeCaseInfoActions addCase={AddCase} />
      {cases.length !== 0 ? (
        cases.map((c) => (
          <Styled.CaseBorder key={c.id}>
            <CaseCard name={c.name} />
          </Styled.CaseBorder>
        ))
      ) : (
        <Typography>Add a Case</Typography>
      )}
      <Styled.AddCaseButton variant="outlined" onClick={AddCase}>
        Add variogram case
      </Styled.AddCaseButton>
    </Styled.Case>
  )
}
