import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchObjectResults } from '../../../../hooks/useFetchChannelResults';
import { usePepmContextStore } from '../../../../hooks/GlobalState';

export const ObjectResult = () => {
  const { computeCases } = usePepmContextStore();
  const { data, isLoading } = useFetchObjectResults();
  const objectResults = data?.data;

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
