import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchObjectResults } from '../../../../hooks/useFetchChannelResults';
import { usePepmContextStore } from '../../../../hooks/GlobalState';
import { useEffect } from 'react';

export const ObjectResult = () => {
  const { computeCases, objectResults, setObjectEstimationResults } =
    usePepmContextStore();
  const { data, isLoading } = useFetchObjectResults();

  useEffect(() => {
    if (data) setObjectEstimationResults(data.data);
  }, [data, setObjectEstimationResults]);

  if (isLoading) return <>Loading ...</>;

  return (
    <>
      {objectResults !== undefined && objectResults.length > 0 ? (
        <CaseResultView
          channelResultList={objectResults}
          computeCases={computeCases}
          type="Object"
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
