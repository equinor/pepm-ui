/* eslint-disable max-lines-per-function */
import * as Styled from './CaseResultView.styled';

import { Typography } from '@equinor/eds-core-react';
import {
  ComputeCaseDto,
  GetChannelResultsDto,
  GetVariogramResultsDto,
} from '../../../../api/generated';
import { ChannelResult } from './ObjectCaseResult/ChannelResult';
import { VariogramResultTable } from './VariogramCaseResult/VariogramResultTable/VariogramResultTable';

export const CaseResultView = ({
  channelResultList,
  variogramResultList,
  computeCases,
}: {
  channelResultList?: GetChannelResultsDto[];
  variogramResultList?: GetVariogramResultsDto[];
  computeCases?: ComputeCaseDto[];
}) => {
  const channelType =
    channelResultList !== undefined && channelResultList[0].type
      ? channelResultList[0].type
      : '';
  const variogramType = variogramResultList !== undefined ? 'Variogram' : '';

  return (
    <Styled.CaseResultView>
      <Typography variant="h2">
        {channelType !== ''
          ? channelType
          : variogramType !== ''
          ? variogramType
          : ''}{' '}
        results
      </Typography>
      <Styled.CaseResultList>
        {variogramResultList && (
          <VariogramResultTable
            resultList={variogramResultList}
          ></VariogramResultTable>
        )}
        {channelResultList &&
          channelResultList.map((obj, index) => (
            <Styled.Wrapper key={obj.computeCaseId}>
              <ChannelResult
                data={obj}
                computeCase={
                  computeCases && computeCases.length > 0
                    ? computeCases.filter(
                        (c) => c.computeCaseId === obj.computeCaseId,
                      )
                    : []
                }
              ></ChannelResult>
              {index < channelResultList.length - 1 && (
                <Styled.StyledDivider
                  variant="small"
                  color="medium"
                ></Styled.StyledDivider>
              )}
            </Styled.Wrapper>
          ))}
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};
