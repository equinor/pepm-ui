/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AnalogueModelsService } from '../../../api/generated';
import { CaseResultView } from '../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../features/Results/NoResults/NoResults';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { useFetchCases } from '../../../hooks/useFetchCases';

export interface VariogramResultListType {
  caseId: number;
  title: string;
  resultList: VariogramResultType[];
}

export interface VariogramResultType {
  identifier: number;
  family: string;
  computeMethod: string;
  modelArea: string;
  attribute: string;
  quality: GLfloat;
  sigma: GLfloat;
  approved: string;
}

export const Results = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const { data } = useQuery({
    queryKey: ['model-results', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModelsResults(modelId as string),
    enabled: !!token,
  });

  const cases = useFetchCases();

  const objectResults = data?.filter((res) => res.resultType === 'Object');

  return (
    <>
      {objectResults !== undefined && objectResults?.length > 0 ? (
        <CaseResultView
          objectList={objectResults}
          computeCases={cases.data?.data}
        />
      ) : (
        <NoResults />
      )}
    </>
  );
};
