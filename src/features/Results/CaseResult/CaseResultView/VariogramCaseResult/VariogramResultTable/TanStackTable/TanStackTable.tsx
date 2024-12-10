/* eslint-disable max-lines */
/* eslint-disable sort-imports */
/* eslint-disable max-lines-per-function */
import { Fragment } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
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
import {
  GetVariogramResultsDto,
  GetVariogramResultsVariogramResultFileDto,
} from '../../../../../../../api/generated';
import { usePepmContextStore } from '../../../../../../../hooks/GlobalState';
import { roundResultString } from '../../../../../../../utils/RoundResultString';
import { SubRowResult } from '../SubRowResult/SubRowResult';
import * as Styled from './TanStackTable.styled';

export interface ResultObjectType {
  variogramResultId: string;
  variogramResultFiles: Array<GetVariogramResultsVariogramResultFileDto>;
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
  identifier: number;
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
    </div>
  );
}

export const TanStackTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const { computeCases } = usePepmContextStore();

  const getSubRows = (computeCaseId: string, identifier: number) => {
    const subRowArray: ResultObjectType[] = [];
    if (computeCaseId === undefined || resultList === undefined)
      return subRowArray;

    resultList
      .filter((c) => c.computeCaseId === computeCaseId)
      .filter((c) => c.identifier === identifier)
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
          variogramResultFiles: e.variogramResultFiles,
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
          identifier: e.identifier,
        };

        subRowArray.push(element);
      });

    return subRowArray;
  };

  const renderSubComponent = ({ row }: { row: Row<ResultObjectType> }) => {
    const sub = getSubRows(row.original.computeCaseId, row.original.identifier);
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
        return (
          row.getCanExpand() && (
            <Button variant="ghost" onClick={row.getToggleExpandedHandler()}>
              <Icon data={row.getIsExpanded() ? DOWN : RIGHT} size={18} />
            </Button>
          )
        );
      },
    },
    {
      accessorKey: 'method',
      header: () => <div>Compute method</div>,
      cell: ({ getValue }) => <div>{getValue<string>()}</div>,
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
  ];

  const getRows = () => {
    const rowArray: ResultObjectType[] = [];

    resultList.forEach((e) => {
      const res = rowArray.some(
        (element) =>
          element.computeCaseId === e.computeCaseId &&
          element.identifier === e.identifier,
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
        variogramResultFiles: e.variogramResultFiles,
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
        identifier: e.identifier,
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
