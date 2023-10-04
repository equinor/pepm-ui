import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'

import { CaseCard } from '../../../../features/Compute/ComputeVariogram/CaseCard/CaseCard'
import { ComputeCaseInfoActions } from '../../../../features/Compute/ComputeVariogram/ComputeCaseInfoActions/ComputeCaseInfoActions'
import * as Styled from './ComputeVariogram.styled'

interface Casetype {
  id: string
  name: string
}
export const ComputeVariogram = () => {
  const [cases, setCases] = useState<Casetype[]>([
    { id: '1', name: 'Variogram Case 1' },
  ])

  const addCase = () => {
    const newCase: Casetype = {
      id: `${Math.floor(Math.random() * 100)}`,
      name: `Variogram Case ${cases.length + 1}`,
    }
    setCases([...cases, newCase])
  }

  const removeCase = (id: string) => {
    const newCaseList = cases.filter((c) => c.id !== id)
    setCases(newCaseList)
  }

  return (
    <Styled.Case>
      <ComputeCaseInfoActions addCase={addCase} />
      {cases.length !== 0 ? (
        cases.map((c) => (
          <Styled.CaseBorder key={c.id}>
            <CaseCard id={c.id} name={c.name} removeCase={removeCase} />
          </Styled.CaseBorder>
        ))
      ) : (
        <Typography>Add a Case</Typography>
      )}
      <Styled.AddCaseButton variant="outlined" onClick={addCase}>
        Add variogram case
      </Styled.AddCaseButton>
    </Styled.Case>
  )
}
