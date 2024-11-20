/* eslint-disable max-lines */
/* eslint-disable sort-imports */
/* eslint-disable max-lines-per-function */
import { Fragment } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import {
  chevron_down as DOWN,
  chevron_right as RIGHT,
} from '@equinor/eds-icons';
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { GetVariogramResultsDto } from '../../../../../../../api/generated';
import { usePepmContextStore } from '../../../../../../../hooks/GlobalState';
import { SubRowResult } from '../SubRowResult/SubRowResult';
import * as Styled from './TanStackTable.styled';

const NumberOfDecimals = 3;

export interface ResultObjectType {
  variogramResultId: string;
  computeCaseId: string;
  rmajor: number;
  rminor: number;
  azimuth: number;
  rvertical: number;
  sigma: number;
  quality: string | number;
  qualityX: number;
  qualityY: number;
  qualityZ: number;
  method: string;
  parameter: string;
  archelFilter: string;
  modelArea: string;
  variogramModel: string;
  subRows?: ResultObjectType[];
}

type TableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand: (row: Row<TData>) => boolean;
};

function Table({
  data,
  columns,
  renderSubComponent,
  getRowCanExpand,
}: TableProps<ResultObjectType>): JSX.Element {
  const table = useReactTable<ResultObjectType>({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <tr>
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
}

export const TanStackTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const { computeCases } = usePepmContextStore();

  const getSubRows = (computeCaseId: string) => {
    const subRowArray: ResultObjectType[] = [];
    if (computeCaseId === undefined || resultList === undefined)
      return subRowArray;

    resultList
      .filter((c) => c.computeCaseId === computeCaseId)
      .forEach((e) => {
        const method = computeCases.filter(
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

        const modelArea = computeCases.filter(
          (c) => c.computeCaseId === e.computeCaseId,
        )[0]?.modelArea;

        const element: ResultObjectType = {
          variogramResultId: e.variogramResultId,
          computeCaseId: e.computeCaseId,
          rmajor: roundResultString(e.rmajor),
          rminor: roundResultString(e.rminor),
          azimuth: roundResultString(e.azimuth),
          rvertical: roundResultString(e.rvertical),
          sigma: roundResultString(e.sigma),
          qualityX: roundResultString(e.qualityX),
          qualityY: roundResultString(e.qualityY),
          qualityZ: roundResultString(e.qualityZ),
          method: method ? method : '',
          parameter: parameter,
          archelFilter: e.archelFilter ? e.archelFilter : '',
          modelArea: modelArea ? modelArea.name : '',
          variogramModel: e.family ? e.family : '',
          quality: roundResultString(e.quality),
        };

        subRowArray.push(element);
      });

    return subRowArray;
  };

  const renderSubComponent = ({ row }: { row: Row<ResultObjectType> }) => {
    const sub = getSubRows(row.original.computeCaseId);
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SubRowResult resultRows={sub} resultList={resultList}></SubRowResult>
      </div>
    );
  };

  const columns: ColumnDef<ResultObjectType>[] = [
    {
      id: 'expand',
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <Button variant="ghost" onClick={row.getToggleExpandedHandler()}>
            <Icon data={row.getIsExpanded() ? DOWN : RIGHT} size={18} />
          </Button>
        ) : (
          '🔵'
        );
      },
    },
    {
      accessorKey: 'method',
      header: () => <div>Compute method</div>,
      cell: ({ row, getValue }) => <div>{getValue<string>()}</div>,
      id: 'method',
    },
    {
      accessorKey: 'parameter',
      header: () => <div>Parameter</div>,
      id: 'parameter',
    },
    {
      accessorKey: 'archelFilter',
      header: () => <div>Archel Filter</div>,
      id: 'archelFilter',
    },
    {
      accessorKey: 'modelArea',
      header: () => <div>Model Area</div>,
      id: 'modelArea',
    },
    {
      accessorKey: 'variogramModel',
      header: () => <div>Variogram model</div>,
      id: 'variogramModel',
      cell: ({ row }) => (
        <div>
          <Typography>{row.original.variogramModel}</Typography>
        </div>
      ),
    },
    {
      accessorKey: 'quality',
      header: () => <div>Quality factor</div>,
      id: 'quality',
      enableColumnFilter: false,
      cell: ({ row }) => <div>{row.original.quality}</div>,
    },
  ];

  const roundResultString = (value: number) => {
    if (value) {
      const res: string = value.toFixed(NumberOfDecimals);
      return Number(res);
    } else return value;
  };

  const getRows = () => {
    const rowArray: ResultObjectType[] = [];

    resultList.forEach((e) => {
      const res = rowArray.some(
        (element) => element.computeCaseId === e.computeCaseId,
      );

      if (res) return;

      const method = computeCases.filter(
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

      const modelArea = computeCases.filter(
        (c) => c.computeCaseId === e.computeCaseId,
      )[0]?.modelArea;

      const element: ResultObjectType = {
        variogramResultId: e.variogramResultId,
        computeCaseId: e.computeCaseId,
        rmajor: roundResultString(e.rmajor),
        rminor: roundResultString(e.rminor),
        azimuth: roundResultString(e.azimuth),
        rvertical: roundResultString(e.rvertical),
        sigma: roundResultString(e.sigma),
        qualityX: roundResultString(e.qualityX),
        qualityY: roundResultString(e.qualityY),
        qualityZ: roundResultString(e.qualityZ),
        method: method ? method : '',
        parameter: parameter,
        archelFilter: e.archelFilter ? e.archelFilter : '',
        modelArea: modelArea ? modelArea.name : '',
        variogramModel: e.family ? e.family : '',
        quality: roundResultString(e.quality),
      };
      rowArray.push(element);
    });

    return rowArray;
  };

  return (
    <Styled.TableWrapper>
      <Table
        data={getRows()}
        columns={columns}
        getRowCanExpand={() => true}
        renderSubComponent={renderSubComponent}
      />
    </Styled.TableWrapper>
  );
};
