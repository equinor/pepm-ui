/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Snackbar } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnalogueModelComputeCasesService } from '../../../../api/generated';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import * as Styled from '../Compute.styled';

export interface CaseInfoTyoe {
  type: string;
  title: string;
  info: string;
  addText: string;
  runText: string;
}

const variogramCaseInfo: CaseInfoTyoe = {
  type: 'Variogram',
  title: 'Variogram cases',
  info: 'You can add multiple cases for the different areas in your model.',
  addText: 'Add Variogram case',
  runText: 'Run all variograms',
};

export const ComputeVariogram = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const [showAlert, setAlert] = useState<string>();

  function clearStatus() {
    setAlert(undefined);
  }

  const { data } = useQuery({
    queryKey: ['model-cases', modelId],
    queryFn: () =>
      AnalogueModelComputeCasesService.getApiAnalogueModelsComputeCases(
        modelId as string,
      ),
    enabled: !!token,
  });

  const methodFilter = (name: string) => {
    return data?.data.filter((method) => method.computeMethod.name === name);
  };
  const Indicator = methodFilter('Indicator');
  const NetToGross = methodFilter('Net-to-Gross');
  const ContiniousParameter = methodFilter('ContiniusParameter');

  const saveCaseAlert = () => {
    setAlert('New object case saved');
  };

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={variogramCaseInfo} />

        <CaseGroup
          caseList={
            Indicator !== undefined && Indicator.length > 0 ? Indicator : []
          }
          methodName="Indicator"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          // localCaseList={localIndicatorCaseList}
          saveCaseAlert={saveCaseAlert}
        />
        <CaseGroup
          caseList={
            NetToGross !== undefined && NetToGross.length > 0 ? NetToGross : []
          }
          methodName="Net-to-Gross"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          // localCaseList={localNTGCaseList}
          saveCaseAlert={saveCaseAlert}
        />

        <CaseGroup
          caseList={
            ContiniousParameter !== undefined && ContiniousParameter.length > 0
              ? ContiniousParameter
              : []
          }
          methodName="ContiniousParameter"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          saveCaseAlert={saveCaseAlert}
        />
      </Styled.Case>
      <Snackbar
        open={!!showAlert}
        autoHideDuration={3000}
        onClose={clearStatus}
      >
        {showAlert}
      </Snackbar>
    </>
  );
};
