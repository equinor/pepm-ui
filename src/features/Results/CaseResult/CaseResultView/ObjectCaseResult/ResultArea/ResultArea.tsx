/* eslint-disable max-lines-per-function */

import {
  Button,
  Divider,
  Icon,
  Label,
  Switch,
  Typography,
} from '@equinor/eds-core-react';
import { bar_chart as barChart } from '@equinor/eds-icons';
import { ChangeEvent, useState } from 'react';
import { GetObjectResultsDto } from '../../../../../../api/generated/models/GetObjectResultsDto';
import { ResultPlotDialog } from '../ResultPlotDialog/ResultPlotDialog';
import * as Styled from './ResultArea.styled';
import { ResultCaseMetadata } from './ResultCaseMetadata/ResultCaseMetadata';
import {
  ResultStatus,
  UpdateObjectResultCommandBody,
} from '../../../../../../api/generated';
import { usePepmContextStore } from '../../../../../../hooks/GlobalState';
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

    if (objectUpdate.success) {
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

  const area = () => {
    const x = xLength();
    const y = yLength();

    if (x && y) return x * y + ' m^2';
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
          <Styled.CenterElements>
            <Button variant="outlined" onClick={toggleOpen}>
              <Icon data={barChart} title={'Open plot for case results.'} />
              Show plot
            </Button>

            <Label style={{ paddingTop: '0.5rem' }} label="Status"></Label>
            <Switch
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateStatus(e.target.checked);
              }}
              checked={checkedStatus()}
              label={data.status}
              disabled={!isOwner}
            ></Switch>
          </Styled.CenterElements>
        </Styled.ResultHeader>

        <Styled.Divider>
          <Divider color="medium" variant="medium" size="1" />
        </Styled.Divider>
        <Styled.CoordinateDiv>
          <Styled.RowElement>
            <Label label="Area size"></Label>
            <Typography>{area() ? area() : '-'}</Typography>
          </Styled.RowElement>
          <Styled.VerticalDivider />
          <Styled.RowElement>
            <Label label="X start"></Label>
            <Typography>
              {modelArea === 'Whole model' ? '-' : xCoordinate?.x + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.VerticalDivider />
          <Styled.RowElement>
            <Label label="X length"></Label>
            <Typography>
              {modelArea === 'Whole model' ? '-' : xLength() + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.VerticalDivider />
          <Styled.RowElement>
            <Label label="Y start"></Label>
            <Typography>
              {modelArea === 'Whole model' ? '-' : yCoordinate?.x + ' m'}
            </Typography>
          </Styled.RowElement>
          <Styled.VerticalDivider />
          <Styled.RowElement>
            <Label label="Y length"></Label>
            <Typography>
              {modelArea === 'Whole model' ? '-' : yLength() + ' m'}
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
