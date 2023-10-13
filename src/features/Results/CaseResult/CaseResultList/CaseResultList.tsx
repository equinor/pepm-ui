import { ResultType } from '../../../../pages/ModelPages/Results/Results'
import { CaseResultCard } from '../../CaseResult/CaseResultCard/CaseResultCard'
import * as Styled from './CaseResultList.styled'

export const CaseResultList = ({ results }: { results: ResultType[] }) => {
  return (
    <Styled.CaseResultList>
      {results.map((res: ResultType) => (
        <CaseResultCard key={res.id} result={res} />
      ))}
    </Styled.CaseResultList>
  )
}
