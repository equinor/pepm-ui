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
  const [imageId, setImageId] = useState('');

  const handleImageDialog = () => {
    const computeCaseResults = resultList.filter(
      (e) => e.computeCaseId === resultRows[0].computeCaseId,
    );
    // const resultFile = computeCaseResults
    //   .find((r) => r.variogramResultId === resultRows[0].variogramResultId)!
    //   .variogramResultFiles.find((x) =>
    //     x.fileName.includes('variogram_slices_'),
    //   );

    const resultObject = computeCaseResults.find(
      (r) => r.variogramResultId === resultRows[0].variogramResultId,
    );
    const resultFiles = resultObject && resultObject.variogramResultFiles;
    const variogramSlices =
      resultFiles &&
      resultFiles.find((x) => x.fileName.includes('variogram_slices_'));

    console.log(resultFiles);

    const variogramSlicesImageId = variogramSlices
      ? variogramSlices.variogramResultFileId
      : '';
    setImageId(variogramSlicesImageId);
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
          {resultRows.map((r) => (
            <SubRowResultItem
              key={r.computeCaseId + r.quality}
              resultItem={r}
            ></SubRowResultItem>
          ))}
        </Styled.TableList>
      </Styled.SubRowDiv>
      <ImageResult
        imageId={imageId}
        resultImages={resultImages}
        open={open}
        setOpen={setOpen}
      ></ImageResult>
    </>
  );
};
