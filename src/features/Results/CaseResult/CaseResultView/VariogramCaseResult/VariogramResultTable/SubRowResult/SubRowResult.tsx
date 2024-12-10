/* eslint-disable max-lines-per-function */
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { bar_chart as barChart } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  GetVariogramResultsDto,
  GetVariogramResultsVariogramResultFileDto,
} from '../../../../../../../api/generated';
import { ImageResult } from '../../ImageResult/ImageResult';
import { ResultObjectType } from '../TanStackTable/TanStackTable';
import * as Styled from './SubRowResult.styled';
import { SubRowResultItem } from './SubRowResultItem';

export const SubRowResult = ({
  resultRows,
  resultList,
}: {
  resultRows: ResultObjectType[];
  resultList: GetVariogramResultsDto[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [resultImages, setResultImages] = useState<
    GetVariogramResultsVariogramResultFileDto[]
  >([]);

  const handleImageDialog = () => {
    const resultFiles: Array<GetVariogramResultsVariogramResultFileDto> = [];
    resultRows.forEach((row) =>
      row.variogramResultFiles.forEach((file) => {
        const values = resultFiles.map((a) => a.fileName);
        const has = values.find((str) => str === file.fileName);

        if (!has) resultFiles.push(file);
      }),
    );

    if (resultFiles && resultFiles.length > 0) setResultImages(resultFiles);
    setOpen(!open);
  };
  return (
    <>
      <Styled.SubRowDiv>
        <Styled.SubRowInfo>
          <Typography>Variogram model details</Typography>
          <Button variant="outlined" onClick={handleImageDialog}>
            <Icon data={barChart} title={'Open plot for case results.'} />
            Show plot
          </Button>
        </Styled.SubRowInfo>
        <Styled.TableList>
          <SubRowResultItem resultList={resultRows}></SubRowResultItem>
        </Styled.TableList>
      </Styled.SubRowDiv>
      <ImageResult
        resultImages={resultImages}
        open={open}
        setOpen={setOpen}
      ></ImageResult>
    </>
  );
};
