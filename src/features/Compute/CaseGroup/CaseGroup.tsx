import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AnalogueModelsService } from '../../../api/generated';
import { CaseCardComponent } from '../../../components/CaseCardComponent/CaseCardComponent';
import { CaseGroupType } from '../../../pages/ModelPages/Compute/ComputeVariogram/ComputeVariogram';

export default interface optionTypes {
  id: number;
  name: string;
  size?: string;
}

export const CaseGroup = ({
  caseGroup,
  removeCase,
  runCase,
}: {
  caseGroup: CaseGroupType[];
  removeCase: (id: string) => void;
  runCase?: () => void;
}) => {
  const { modelId } = useParams<{ modelId: string }>();

  const { data } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
  });
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
              />
            ))}
          </Styled.CaseList>
        </CaseCardComponent>
      ))}
    </>
  );
};
