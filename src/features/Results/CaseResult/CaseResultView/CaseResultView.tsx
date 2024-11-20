/* eslint-disable max-lines-per-function */
import * as Styled from './CaseResultView.styled';

import { Typography } from '@equinor/eds-core-react';
import {
  ComputeCaseDto,
  GetObjectResultsDto,
  GetVariogramResultsDto,
} from '../../../../api/generated';
import { ChannelResult } from './ObjectCaseResult/ChannelResult';
import { TanStackTable } from './VariogramCaseResult/VariogramResultTable/TanStackTable/TanStackTable';

export const CaseResultView = ({
  channelResultList,
  variogramResultList,
  computeCases,
  type,
}: {
  channelResultList?: GetObjectResultsDto[];
  variogramResultList?: GetVariogramResultsDto[];
  computeCases?: ComputeCaseDto[];
  type: string;
}) => {
  return (
    <Styled.CaseResultView>
      <Typography variant="h2">{type} results</Typography>
      <Styled.CaseResultList>
        {variogramResultList && (
          <TanStackTable resultList={variogramResultList}></TanStackTable>
        )}
        {channelResultList &&
          channelResultList.map((obj) => (
            <ChannelResult
              key={obj.computeCaseId}
              data={obj}
              computeCase={
                computeCases && computeCases.length > 0
                  ? computeCases.filter(
                      (c) => c.computeCaseId === obj.computeCaseId,
                    )
                  : []
              }
            ></ChannelResult>
          ))}
      </Styled.CaseResultList>
    </Styled.CaseResultView>
  );
};
