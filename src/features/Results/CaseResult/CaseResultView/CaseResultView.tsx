import * as Styled from './CaseResultView.styled';

import { Typography } from '@equinor/eds-core-react';
import { ComputeCaseDto, GetResultDto } from '../../../../api/generated';
import { ChannelResultTable } from './ObjectCaseResult/ChannelResultTable';
import { VariogramCaseResult } from './VariogramCaseResult/VariogramCaseResult';
import ResultIMG from './vargrest_output-0-_variogram_slices_.png';

export const CaseResultView = ({
  resultList,
  computeCases,
}: {
  resultList: GetResultDto[];
  computeCases?: ComputeCaseDto[];
}) => {
  const caseType = resultList[0].resultType;

  return (
    <Styled.CaseResultView>
      <Typography variant="h2">{caseType} results</Typography>
      <Styled.CaseResultList>
        {caseType === 'Variogram' && (
          <VariogramCaseResult
            caseList={[]}
            img={ResultIMG}
          ></VariogramCaseResult>
        )}

        {caseType === 'Object' &&
          resultList.map((obj) => (
            <ChannelResultTable
              key={obj.computeCaseId}
              data={obj}
              computeCase={
                computeCases && computeCases.length > 0
                  ? computeCases.filter(
                      (c) => c.computeCaseId === obj.computeCaseId,
                    )
                  : []
              }
            ></ChannelResultTable>
          ))}
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};
