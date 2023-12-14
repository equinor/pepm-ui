/* eslint-disable max-lines-per-function */
import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelsService,
  ComputeSettingsService,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../api/generated';
import { CaseCardComponent } from '../../../components/CaseCardComponent/CaseCardComponent';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { CaseGroupType } from '../../../pages/ModelPages/Compute/ComputeVariogram/ComputeVariogram';

export const CaseGroup = ({
  caseGroup,
  removeCase,
}: {
  caseGroup: CaseGroupType[];
  removeCase: (id: string) => void;
}) => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const { data } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
    enabled: !!token,
  });

  const computeSettingsResponse = useQuery({
    queryKey: ['compute-settings'],
    queryFn: () => ComputeSettingsService.getApiComputeSettings(),
    enabled: !!token,
  });

  const runCase = (
    selectedModelArea?: ModelAreaDto[],
    selectedIndicatorParameters?: ListComputeSettingsInputValueDto[],
    selectedGrainSize?: ListComputeSettingsInputValueDto[],
    selectedArchelFilter?: ListComputeSettingsInputValueDto[],
    selectedParameters?: ListComputeSettingsInputValueDto[],
    selectedVariogramModels?: ListComputeSettingsInputValueDto[],
  ) => {
    console.log(selectedModelArea);
    console.log(selectedIndicatorParameters);
    console.log(selectedGrainSize);
    console.log(selectedArchelFilter);
    console.log(selectedParameters);
    console.log(selectedVariogramModels);
  };

  return (
    <>
      {caseGroup.map((c) => (
        <CaseCardComponent title={c.type} key={c.id}>
          <Styled.CaseList>
            {c.cases.map((ca) => (
              <CaseRow
                caseType={c.type}
                key={ca.id}
                id={ca.id}
                removeCase={removeCase}
                runCase={runCase}
                modelAreas={data && data.data.modelAreas}
                caseSettings={
                  computeSettingsResponse && computeSettingsResponse.data?.data
                }
              />
            ))}
          </Styled.CaseList>
        </CaseCardComponent>
      ))}
    </>
  );
};
