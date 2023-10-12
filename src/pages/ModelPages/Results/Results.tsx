import { useNavigate } from 'react-router-dom'
import { NoResults } from '../../../features/Results/NoResults/NoResults'
import * as Styled from './Results.styled'

export type ResultType = {
  id: string
  case: string
  finished: boolean
}
export const Results = () => {
  const loaded = true
  const results: ResultType[] = [
    { id: '1', case: 'Variogramcase 1', finished: true },
    { id: '2', case: 'Variogramcase 2', finished: false },
  ]

  return (
    <>
      {loaded && results ? <CaseResultList results={results} /> : <NoResults />}
    </>
  )
}

const CaseResultList = ({ results }: { results: ResultType[] }) => {
  return (
    <Styled.ResultCaseList>
      {results.map((res: ResultType) => (
        <ResultCaseCard key={res.id} result={res} />
      ))}
    </Styled.ResultCaseList>
  )
}

const ResultCaseCard = ({ result }: { result: ResultType }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`${result.id}`)
  }

  return (
    <Styled.ResultCaseCard onClick={handleClick}>
      <h2>{result.case}</h2>
      {result.finished ? <h4>Finished</h4> : <h4>Not computed yet!</h4>}
    </Styled.ResultCaseCard>
  )
}
