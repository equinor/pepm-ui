import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { usePepmContextStore } from '../../../../hooks/GlobalState';
import { useFetchVariogramResults } from '../../../../hooks/useFetchVariogramResults';

export const VariogramResults = () => {
  const { data, isLoading } = useFetchVariogramResults();
  const { computeCases } = usePepmContextStore();
  const variogramResults = data?.data;

  if (isLoading) return <>Loading ...</>;

  return (
    <>
      {variogramResults !== undefined && variogramResults?.length > 0 ? (
        <CaseResultView
          variogramResultList={variogramResults}
          computeCases={computeCases}
          type="Variogram"
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
