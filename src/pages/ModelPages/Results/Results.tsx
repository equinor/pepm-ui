import { NoResults } from '../../../features/Results/NoResults/NoResults';

export const Results = () => {
  const results = undefined;

  return <>{results ? <p>Results Here</p> : <NoResults />}</>;
};
