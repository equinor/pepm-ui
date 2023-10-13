import { CaseResultList } from '../../../features/Results/CaseResult/CaseResultList/CaseResultList';
import { NoResults } from '../../../features/Results/NoResults/NoResults';

export type ResultType = {
  id: string;
  case: string;
  finished: boolean;
};
export const Results = () => {
  const loaded = true;
  const results: ResultType[] = [
    { id: '1', case: 'Variogramcase 1', finished: true },
    { id: '2', case: 'Variogramcase 2', finished: false },
  ];

  return (
    <>
      {loaded && results ? <CaseResultList results={results} /> : <NoResults />}
    </>
  );
};
