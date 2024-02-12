import { GetVariogramResultsDto } from '../../../../../api/generated';
import { CaseCardComponent } from '../../../../../components/CaseCardComponent/CaseCardComponent';
import { ImageResult } from './ImageResult/ImageResult';
import * as Styled from './VariogramCaseResult.styled';
import { VariogramResultTable } from './VariogramResultTable';

export const VariogramCaseResult = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  console.log(resultList);

  return (
    <>
      {resultList.map((item) => (
        <CaseCardComponent key={item.variogramResultId} title="Variogram">
          <Styled.CaseResultCard>
            <Styled.CaseLeftDiv>
              <VariogramResultTable data={item}></VariogramResultTable>
            </Styled.CaseLeftDiv>
            <ImageResult resultFiels={item.variogramResultFiles}></ImageResult>
          </Styled.CaseResultCard>
        </CaseCardComponent>
      ))}
    </>
  );
};
