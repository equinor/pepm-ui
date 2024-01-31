import { GetResultDto } from '../../../../../api/generated';
import { CaseCardComponent } from '../../../../../components/CaseCardComponent/CaseCardComponent';
import { ImageView } from '../../../../../components/ImageView/ImageView';
import * as Styled from './VariogramCaseResult.styled';
import { VariogramResultTable } from './VariogramResultTable';

export const VariogramCaseResult = ({
  resultList,
  img,
}: {
  resultList: GetResultDto[];
  img: string;
}) => {
  return (
    <>
      {resultList.map((item) => (
        <CaseCardComponent key={item.computeCaseId} title={item.resultType}>
          <Styled.CaseResultCard>
            <ImageView text="run" img={img} altText="run"></ImageView>
            <Styled.CaseLeftDiv>
              <VariogramResultTable data={item}></VariogramResultTable>
            </Styled.CaseLeftDiv>
          </Styled.CaseResultCard>
        </CaseCardComponent>
      ))}
    </>
  );
};
