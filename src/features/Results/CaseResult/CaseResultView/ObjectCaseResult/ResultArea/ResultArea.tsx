/* eslint-disable max-lines-per-function */

import {
  Button,
  Divider,
  Icon,
  Label,
  Switch,
  Typography,
} from '@equinor/eds-core-react';
import { multiline_chart as lineChart } from '@equinor/eds-icons';
import { ChangeEvent, useState } from 'react';
import { ResultPlotDialog } from '../ResultPlotDialog/ResultPlotDialog';
import * as Styled from './ResultArea.styled';
import { ResultCaseMetadata } from './ResultCaseMetadata/ResultCaseMetadata';
import {
  GetObjectResultsDto,
  ResultStatus,
  UpdateObjectResultCommandBody,
} from '../../../../../../api/generated';
import { usePepmContextStore } from '../../../../../../stores/GlobalStore';
import { useIsOwnerOrAdmin } from '../../../../../../hooks/useIsOwnerOrAdmin';
import { useMutateObjectResult } from '../../../../../../hooks/useMutateResults';
export const ResultArea = ({
  computeMethod,
  modelArea,
  data,
}: {
  computeMethod?: string;
  modelArea: string;
  data: GetObjectResultsDto;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { analogueModel, updateObjectResult } = usePepmContextStore();
  const isOwner = useIsOwnerOrAdmin();
  const mutateObjectResult = useMutateObjectResult();

  const putUpdateobject = async (status: ResultStatus) => {
    const requestBody: UpdateObjectResultCommandBody = { status: status };

    const objectUpdate = await mutateObjectResult.mutateAsync({
      id: analogueModel.analogueModelId,
      objectId: data.objectResultId,
      requestBody: requestBody,
    });

    if (objectUpdate.data?.success) {
      updateObjectResult({ ...data, status: status });
    }
  };

  const toggleOpen = () => {
    setOpen(!open);
  };
  const xCoordinate = data.box?.filter((b) => b.m === 0)[0];
  const yCoordinate = data.box?.filter((b) => b.m === 1)[0];

  const xLength = () => {
    if (xCoordinate && yCoordinate) return yCoordinate?.x - xCoordinate?.x;
  };

  const yLength = () => {
    if (xCoordinate && yCoordinate) {
      const value = yCoordinate?.y - xCoordinate?.y;
      return value;
    }
  };

  /* Make numbers nice to read
   * This code was sponsored by artificial intelligence :P
   */
  const formatter = new Intl.NumberFormat('en-US', {
    useGrouping: true,
  }).format;
  const formatNumber = (num: number): string =>
    formatter(num).replace(/,/g, ' ');

  const formattedXLength = () => {
    const value = xLength();
    return value ? formatNumber(value) : undefined;
  };

  const formattedYLength = () => {
    const value = yLength();
    return value ? formatNumber(value) : undefined;
  };

  const area = () => {
    const x = xLength();
    const y = yLength();

    if (x && y) return formatNumber(x * y) + ' m²';
  };

  const updateStatus = (checked: boolean) => {
    if (checked) {
      putUpdateobject(ResultStatus.PUBLISH);
    } else {
      putUpdateobject(ResultStatus.DRAFT);
    }
  };

  const checkedStatus = () => {
    if (data.status === ResultStatus.PUBLISH) return true;
    return false;
  };

  return (
    <>
      <Styled.Wrapper>
        <Styled.ResultHeader>
          <ResultCaseMetadata
            computeMethod={computeMethod}
            modelArea={modelArea}
          />
          <div className="actions">
            <Button variant="outlined" onClick={toggleOpen}>
              <Icon data={lineChart} title={'Open plot for case results.'} />
              Show plot
            </Button>

            <Switch
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateStatus(e.target.checked);
              }}
              checked={checkedStatus()}
              label="Published"
              disabled={!isOwner}
            ></Switch>
          </div>
        </Styled.ResultHeader>

        <Divider variant="small" style={{ width: '100%' }} />

        <Styled.CoordinateDiv>
          <Styled.RowElement className="area">
            <Label label="Area size"></Label>
            <Typography className="value">{area() ? area() : '-'}</Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="X start"></Label>
            <Typography className="value">
              {modelArea === 'Whole model'
                ? '-'
                : formatNumber(xCoordinate?.x) + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="X length"></Label>
            <Typography className="value">
              {modelArea === 'Whole model' ? '-' : formattedXLength() + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="Y start"></Label>
            <Typography className="value">
              {modelArea === 'Whole model'
                ? '-'
                : formatNumber(yCoordinate?.x) + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.RowElement>
            <Label label="Y length"></Label>
            <Typography className="value">
              {modelArea === 'Whole model' ? '-' : formattedYLength() + ' m'}
            </Typography>
          </Styled.RowElement>
        </Styled.CoordinateDiv>
      </Styled.Wrapper>
      <ResultPlotDialog
        open={open}
        toggleOpen={toggleOpen}
        computeMethod={computeMethod}
        modelArea={modelArea}
        data={data}
      />
    </>
  );
};
