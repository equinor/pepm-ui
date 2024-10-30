/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import {
  ColumnDef,
  EdsDataGrid,
  ExpandedState,
} from '@equinor/eds-data-grid-react';
import { useState } from 'react';
import { GetVariogramResultsDto } from '../../../../../../api/generated';
import { useFetchCases } from '../../../../../../hooks/useFetchCases';
import { ImageResult } from '../ImageResult/ImageResult';
import * as Styled from './VariogramResultTable.styled';
interface ResultObjectType {
  variogramResultId: string;
  computeCaseId: string;
  method: string;
  parameter: string;
  archelFilter: string;
  modelArea: string;
  variogramModel: string;
  quality: string | number;
}

const NumberOfDecimals = 3;

// const expandCell = ({ row, getValue }: { row: any; getValue: any }) => {
//   console.log(row.getCanExpand());

//   return row.getCanExpand() ? (
//     <>EXPAND</>
//   ) : (
//     // <>
//     //   <div
//     //     style={{
//     //       display: 'flex',
//     //       alignItems: 'center',
//     //     }}
//     //   >
//     //     {row.getCanExpand() && (
//     //       <Button
//     //         variant={'ghost_icon'}
//     //         style={{
//     //           cursor: 'pointer',
//     //         }}
//     //         onClick={row.getToggleExpandedHandler()}
//     //       >
//     //         <Icon data={row.getIsExpanded() ? DOWN : RIGHT} size={18} />
//     //         hallo
//     //       </Button>
//     //     )}
//     //     {' HALLO '}
//     //     {getValue()}
//     //   </div>
//     // </>
//     'NOT POSSIBLE'
//   );
// };

export const VariogramResultTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState('');
  const [expansionState, setExpansionState] = useState<ExpandedState>({});
  const caseList = useFetchCases();

  const roundResultString = (value: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    } else return value;
  };

  const handleImageDialog = (id: string, variogramResultId: string) => {
    const computeCaseResults = resultList.filter((e) => e.computeCaseId === id);
    const resultFile = computeCaseResults
      .find((r) => r.variogramResultId === variogramResultId)!
      .variogramResultFiles.find((x) =>
        x.fileName.includes('variogram_slices_'),
      );

    const imageId = resultFile ? resultFile.variogramResultFileId : '';
    setImageId(imageId);
    setOpen(!open);
  };

  const columns: ColumnDef<ResultObjectType>[] = [
    {
      id: 'expand',
      header: () => null,
      // cell: () => expandCell,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' },
            }}
          >
            {row.getIsExpanded() ? '👇' : '👉'}
          </button>
        ) : (
          '🔵'
        );
      },
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'method',
      header: () => <Styled.Column>Compute method</Styled.Column>,
      cell: ({ row, getValue }) => (
        <div
          style={{
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          {getValue<string>()}
        </div>
      ),
      id: 'method',
    },
    {
      accessorKey: 'parameter',
      header: () => <Styled.Column>Parameter</Styled.Column>,
      id: 'parameter',
    },
    {
      accessorKey: 'archelFilter',
      header: () => <Styled.Column>Archel Filter</Styled.Column>,
      id: 'archelFilter',
    },
    {
      accessorKey: 'modelArea',
      header: () => <Styled.Column>Model Area</Styled.Column>,
      id: 'modelArea',
    },
    {
      accessorKey: 'variogramModel',
      header: () => <Styled.Column>Variogram model</Styled.Column>,
      id: 'variogramModel',
      cell: ({ row }) => (
        <div>
          <Typography
            onClick={() =>
              handleImageDialog(
                row.original.computeCaseId,
                row.original.variogramResultId,
              )
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
      header: () => <Styled.Column>Quality factor</Styled.Column>,
      id: 'quality',
      enableColumnFilter: false,
      cell: ({ row }) => (
        <Styled.Quality>{row.original.quality}</Styled.Quality>
      ),
    },
  ];

  const getSubRows = (row: ResultObjectType) => {
    console.log(row);

    const subRowArray: ResultObjectType[] = [];
    if (row === undefined) return subRowArray;

    resultList
      .filter((c) => c.computeCaseId === row.computeCaseId)
      .map((e) => {
        const method = caseList.data?.data.filter(
          (c) => c.computeCaseId === e.computeCaseId,
        )[0]?.computeMethod?.name;

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
        )[0]?.modelArea;

        const element: ResultObjectType = {
          variogramResultId: e.variogramResultId,
          computeCaseId: e.computeCaseId,
          method: method ? method : '',
          parameter: parameter,
          archelFilter: e.archelFilter ? e.archelFilter : '',
          modelArea: modelArea ? modelArea.name : '',
          variogramModel: e.family ? e.family : '',
          quality: roundResultString(e.quality)
            ? roundResultString(e.quality)
            : e.quality,
        };

        subRowArray.push(element);
      });

    console.log(subRowArray);

    return subRowArray;
  };

  const getRows = () => {
    const rowArray: ResultObjectType[] = [];

    resultList.map((e) => {
      const res = rowArray.some(
        (element) => element.computeCaseId === e.computeCaseId,
      );
      // console.log(res);

      if (res) return;

      const method = caseList.data?.data.filter(
        (c) => c.computeCaseId === e.computeCaseId,
      )[0]?.computeMethod?.name;
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
      )[0]?.modelArea;

      const element: ResultObjectType = {
        variogramResultId: e.variogramResultId,
        computeCaseId: e.computeCaseId,
        method: method ? method : '',
        parameter: parameter,
        archelFilter: e.archelFilter ? e.archelFilter : '',
        modelArea: modelArea ? modelArea.name : '',
        variogramModel: e.family ? e.family : '',
        quality: roundResultString(e.quality)
          ? roundResultString(e.quality)
          : e.quality,
      };
      rowArray.push(element);
    });
    console.log(rowArray);

    return rowArray;
  };

  return (
    <>
      <Styled.Table>
        <EdsDataGrid
          columns={columns}
          rows={getRows()}
          expansionState={expansionState}
          setExpansionState={setExpansionState}
          // getSubRows={(row) => {
          //   console.log('test');
          //   const res = getSubRows(row);
          //   console.log(res);
          // }}
          getSubRows={(row) => getSubRows(row)}
          enableSorting
          enableColumnFiltering
          enablePagination
          emptyMessage="No results to show"
          columnResizeMode="onChange"
          pageSize={20}
          // enableVirtual
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
