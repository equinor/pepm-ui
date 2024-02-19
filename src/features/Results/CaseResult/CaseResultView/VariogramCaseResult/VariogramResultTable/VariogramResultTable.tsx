/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useState } from 'react';
import { GetVariogramResultsDto } from '../../../../../../api/generated';
import { useFetchCases } from '../../../../../../hooks/useFetchCases';
import { ImageResult } from '../ImageResult/ImageResult';
import * as Styled from './VariogramResultTable.styled';

interface ResultObjectType {
  computeCaseId: string;
  method: string;
  parameter: string;
  archelFilter: string;
  modelArea: string;
  variogramModel: string;
  quality: string | number;
}

const NumberOfDecimals = 3;

export const VariogramResultTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState('');

  const caseList = useFetchCases();
  const roundResultString = (value: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    } else return value;
  };

  const resultElementsList: ResultObjectType[] = resultList.map((e) => {
    const method = caseList.data?.data.filter(
      (c) => c.computeCaseId === e.computeCaseId,
    )[0].computeMethod.name;
    let parameter = '';
    if (method === 'Indicator') {
      parameter = e.indicator ? e.indicator : '';
    } else if (method === 'Net-To-Gross') {
      parameter = e.customIndicator ? e.customIndicator : '';
    } else if (method === 'ContiniousParameter') {
      parameter = e.attribute ? e.attribute : '';
    }

    const modelArea = caseList.data?.data.filter(
      (c) => c.computeCaseId === e.computeCaseId,
    )[0].modelArea.name;

    const element: ResultObjectType = {
      computeCaseId: e.computeCaseId,
      method: method ? method : '',
      parameter: parameter,
      archelFilter: e.archelFilter ? e.archelFilter : '',
      modelArea: modelArea ? modelArea : '',
      variogramModel: e.family ? e.family : '',
      quality: roundResultString(e.quality)
        ? roundResultString(e.quality)
        : e.quality,
    };
    return element;
  });

  const handleImageDialog = (id: string) => {
    const resultRow = resultList.find((e) => e.computeCaseId === id);
    const resultFile = resultRow?.variogramResultFiles.find((x) =>
      x.fileName.includes('variogram_slices_'),
    );

    const imageId = resultFile ? resultFile.variogramResultFileId : '';
    setImageId(imageId);
    setOpen(!open);
  };

  return (
    <>
      <Styled.Table>
        <EdsDataGrid
          enableSorting
          enablePagination
          emptyMessage="No results to show"
          columnResizeMode="onChange"
          rows={resultElementsList}
          pageSize={50}
          columns={[
            {
              accessorKey: 'method',
              header: 'Compute method',
              id: 'method',
            },
            {
              accessorKey: 'parameter',
              header: 'Parameter',
              id: 'parameter',
            },
            {
              accessorKey: 'archelFilter',
              header: 'Archel Filter',
              id: 'archelFilter',
            },
            {
              accessorKey: 'modelArea',
              header: 'Archel Filter',
              id: 'modelArea',
            },
            {
              accessorKey: 'variogramModel',
              header: 'Variogram model',
              id: 'variogramModel',
              cell: ({ row }) => (
                <div>
                  <Typography
                    onClick={() =>
                      handleImageDialog(row.original.computeCaseId)
                    }
                    link
                  >
                    {row.original.variogramModel}
                  </Typography>
                </div>
              ),
            },
            {
              accessorKey: 'quality',
              header: 'Quality factor',
              id: 'quality',
            },
            // {
            //   accessorKey: 'img',
            //   header: 'Image',
            //   id: 'img',
            //   cell: ({ row }) => (
            //     <div>
            //       <Button
            //         variant="outlined"
            //         onClick={() =>
            //           handleImageDialog(row.original.computeCaseId)
            //         }
            //       >
            //         View image
            //       </Button>
            //     </div>
            //   ),
            // },
          ]}
        />
      </Styled.Table>
      <ImageResult
        imageId={imageId}
        open={open}
        setOpen={setOpen}
      ></ImageResult>
    </>
  );
};
