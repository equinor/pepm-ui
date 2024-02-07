import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import { useFetchVariogramResults } from '../../../../hooks/useFetchVariogramResults';

export const VariogramResults = () => {
  const { data } = useFetchVariogramResults();
  const cases = useFetchCases();
  const variogramResults = data?.data;

  return (
    <>
      {variogramResults !== undefined && variogramResults?.length > 0 ? (
        <CaseResultView
          variogramResultList={variogramResults}
          computeCases={cases.data?.data}
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
