import * as Styled from './CaseResultView.styled';

import { Typography } from '@equinor/eds-core-react';
import { ComputeCaseDto, GetResultDto } from '../../../../api/generated';
import { ChannelResultTable } from './ObjectCaseResult/ChannelResultTable';
import { VariogramCaseResult } from './VariogramCaseResult/VariogramCaseResult';
import ResultIMG from './vargrest_output-0-_variogram_slices_.png';

export const CaseResultView = ({
  objectList,
  computeCases,
}: {
  objectList?: GetResultDto[];
  computeCases?: ComputeCaseDto[];
}) => {
  return (
    <Styled.CaseResultView>
      <Typography variant="h2">Compute results</Typography>
      <Styled.CaseResultList>
        <VariogramCaseResult
          caseList={[]}
          img={ResultIMG}
        ></VariogramCaseResult>
        {objectList &&
          objectList.map((obj) => (
            <ChannelResultTable
              key={obj.computeCaseId}
              data={obj}
              computeCase={
                computeCases &&
                computeCases.filter(
                  (c) => c.computeCaseId === obj.computeCaseId,
                )
              }
            ></ChannelResultTable>
          ))}
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};
