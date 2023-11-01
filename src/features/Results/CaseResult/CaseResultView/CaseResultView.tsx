import * as Styled from './CaseResultView.styled';

import { Typography } from '@equinor/eds-core-react';
import {
  ObjectResultType,
  VariogramResultListType,
} from '../../../../pages/ModelPages/Results/Results';
import { ObjectCaseResult } from './ObjectCaseResult/ObjectCaseResult';
import { VariogramCaseResult } from './VariogramCaseResult/VariogramCaseResult';
import ResultIMG from './vargrest_output-0-_variogram_slices_.png';

export const CaseResultView = ({
  caseList,
  objectList,
}: {
  caseList: VariogramResultListType[];
  objectList: ObjectResultType[];
}) => {
  return (
    <Styled.CaseResultView>
      <Typography variant="h2">Compute results</Typography>
      <Styled.CaseResultList>
        <VariogramCaseResult
          caseList={caseList}
          img={ResultIMG}
        ></VariogramCaseResult>
        {objectList.map((obj) => (
          <ObjectCaseResult key={obj.identifier} data={obj}></ObjectCaseResult>
        ))}
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};
