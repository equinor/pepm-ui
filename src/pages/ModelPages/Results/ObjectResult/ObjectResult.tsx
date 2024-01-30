/* eslint-disable max-lines-per-function */
import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import { useFetchResults } from '../../../../hooks/useFetchResults';

export const ObjectResult = () => {
  const cases = useFetchCases();
  const { data } = useFetchResults();
  const objectResults = data?.filter((res) => res.resultType === 'Object');

  return (
    <>
      {objectResults !== undefined && objectResults?.length > 0 ? (
        <CaseResultView
          resultList={objectResults}
          computeCases={cases.data?.data}
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
