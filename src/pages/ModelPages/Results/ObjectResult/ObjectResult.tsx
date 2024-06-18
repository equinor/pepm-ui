import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import { useFetchObjectResults } from '../../../../hooks/useFetchChannelResults';

export const ObjectResult = () => {
  const cases = useFetchCases();
  const { data, isLoading } = useFetchObjectResults();
  const objectResults = data?.data;

  if (isLoading) return <>Loading ...</>;

  return (
    <>
      {objectResults !== undefined && objectResults.length > 0 ? (
        <CaseResultView
          channelResultList={objectResults}
          computeCases={cases.data?.data}
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
