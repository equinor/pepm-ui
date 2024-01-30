/* eslint-disable max-lines-per-function */
import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import { useFetchResults } from '../../../../hooks/useFetchResults';

export const VariogramResults = () => {
  const { data } = useFetchResults();
  const cases = useFetchCases();

  const variogramResults = data?.filter(
    (res) => res.resultType === 'Variogram',
  );

  return (
    <>
      {variogramResults !== undefined && variogramResults?.length > 0 ? (
        <CaseResultView
          resultList={variogramResults}
          computeCases={cases.data?.data}
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
