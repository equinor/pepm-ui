import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { useFetchObjectResults } from '../../../../hooks/useFetchChannelResults';
import { usePepmContextStore } from '../../../../stores/GlobalStore';
import { useEffect } from 'react';
import { CircularProgress, Typography } from '@equinor/eds-core-react';
import * as Styled from '../../Model/Model.styled';

export const ObjectResult = () => {
  const { computeCases, objectResults, setObjectEstimationResults } =
    usePepmContextStore();
  const { data, isLoading } = useFetchObjectResults();

  useEffect(() => {
    if (data) setObjectEstimationResults(data.data);
  }, [data, setObjectEstimationResults]);

  if (isLoading)
    return (
      <Styled.EmptyPage>
        <div className="loading">
          <CircularProgress
            color="primary"
            size={24}
            value={100}
            variant="indeterminate"
          />
          <Typography variant="body_short">Loading, please wait…</Typography>
        </div>
      </Styled.EmptyPage>
    );

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
