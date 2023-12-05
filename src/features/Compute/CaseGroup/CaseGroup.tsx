import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

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
              />
            ))}
          </Styled.CaseList>
        </CaseCardComponent>
      ))}
    </>
  );
};
