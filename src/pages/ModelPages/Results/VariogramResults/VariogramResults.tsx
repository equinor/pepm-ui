import { useEffect } from 'react';
import { CaseResultView } from '../../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../../features/Results/NoResults/NoResults';
import { usePepmContextStore } from '../../../../stores/GlobalStore';
import { useFetchVariogramResults } from '../../../../hooks/useFetchVariogramResults';
import { CircularProgress, Typography } from '@equinor/eds-core-react';
import * as Styled from '../../Model/Model.styled';

export const VariogramResults = () => {
  const { data, isLoading } = useFetchVariogramResults();
  const { computeCases, variogramResults, setVariogramResults } =
    usePepmContextStore();

  useEffect(() => {
    if (data) setVariogramResults(data.data);
  }, [data, setVariogramResults]);

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
