/* eslint-disable max-lines */
/* eslint-disable no-empty-pattern */
/* eslint-disable max-lines-per-function */
import { ChangeEvent, CSSProperties } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  Button,
  Checkbox,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import {
  EdsDataGrid,
  FilterWrapper,
  HeaderContext,
} from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  AnalogueModelList,
  AnalogueModelsService,
  OpenAPI,
  StratigraphicGroupDto,
  StratUnitDto,
} from '../../api/generated';
import { useAccessToken } from '../../hooks/useAccessToken';
import * as Styled from './ModelTable.styled';
import { usePepmContextStore } from '../../hooks/GlobalState';

export const ModelTable = () => {
  const { addExportModel, deleteExportModel, exportModels } =
    usePepmContextStore();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  enum ModelStatus {
    UNKNOWN = 'Unknown',

    TRANSFORMING = 'Transforming ...',
    SUCCEEDED = 'Succeeded',
    FAILED_UPLOADING = 'Uploading failed',
    FAILED_TRANSFORMING = 'Transforming failed',
  }

  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
    enabled: !!token,
    refetchInterval: 60000,
  });

  if (isLoading || !data?.success) return <p>Loading...</p>;

  const getRowGroup = (stratGroupList: StratigraphicGroupDto[]) => {
    const groupList: StratUnitDto[] = [];

    if (stratGroupList.length > 0) {
      stratGroupList.forEach((column) => {
        column.stratUnits
          .filter((item) => item.level === 1)
          .forEach((i) => {
            if (
              groupList.filter((item) => i.stratUnitId === item.stratUnitId)
                .length <= 0
            )
              groupList.push(i);
          });
      });
    }
    return groupList;
  };

  const getModelStatus = (id: string) => {
    let status = ModelStatus.UNKNOWN;

    const model = data.data.find((m) => m.analogueModelId === id);
    const transforming =
      model && model.processingStatus ? model.processingStatus : undefined;
    const isProcessed = model ? model.isProcessed : undefined;

    if (isProcessed === true) {
      status = ModelStatus.SUCCEEDED;
    } else if (
      transforming === 'Created' ||
      transforming === 'Waiting' ||
      transforming === 'Running'
    ) {
      status = ModelStatus.TRANSFORMING;
    } else if (transforming === 'Failed') {
      status = ModelStatus.FAILED_TRANSFORMING;
    } else if (isProcessed === false) {
      status = ModelStatus.FAILED_UPLOADING;
    }

    return status;
  };

  const addModelToExport = (checked: boolean, modelId: string) => {
    if (checked) addExportModel(modelId);
    else deleteExportModel(modelId);
  };

  /* Make sure the header row in EdsDataGrid is vertically middle-aligned when filter icons are shown */
  const headerStyle = (): CSSProperties => ({ verticalAlign: 'middle' });

  const filterComponent = ({
    onChange,
    value,
  }: {
    onChange: (value: unknown) => void;
    value: unknown;
  }) => (
    <TextField
      label={'Custom filter'}
      id={'my-custom-filter'}
      value={(value as string) ?? ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.currentTarget.value)
      }
    />
  );

  const headerComponent = (
    title: HeaderContext<AnalogueModelList, any>,
    header: string,
  ) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant={'cell_header'} group={'table'}>
          {header}
        </Typography>
        <FilterWrapper
          column={title.column}
          CustomComponent={filterComponent}
        />
      </div>
    );
  };

  const filterFunction = (filterValue: string, data: string[]) => {
    if (!filterValue) return true;
    const value = filterValue.replaceAll(' ', '').split(',');

    let arr: string[] = [];
    value.forEach((item: string) => {
      if (item === '') return;
      arr = arr.concat(
        data.filter((key: string) => key.toLowerCase().includes(item)),
      );
    });

    if (arr && arr.length > 0) return true;
    return false;
  };

  return (
    <Styled.Table>
      <EdsDataGrid
        enableSorting
        enableColumnFiltering
        emptyMessage="Empty :("
        columnResizeMode="onChange"
        rows={data.data}
        columnPinState={{
          right: ['navigate'],
        }}
        scrollbarHorizontal
        stickyHeader
        headerStyle={headerStyle}
        width="min(calc(100vw - 64px), 1400px)"
        columns={[
          {
            accessorKey: 'analogueModelId',
            enableColumnFilter: false,
            header: function () {
              <Styled.List>{<Checkbox></Checkbox>}</Styled.List>;
            },
            id: 'expand',
            cell: ({ row }) => (
              <Styled.List>
                {
                  <Checkbox
                    checked={
                      exportModels.indexOf(row.original.analogueModelId) > -1
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      addModelToExport(
                        e.target.checked,
                        row.original.analogueModelId,
                      )
                    }
                  ></Checkbox>
                }
              </Styled.List>
            ),
          },
          { accessorKey: 'name', header: 'Model name', id: 'name', size: 200 },
          {
            id: 'outcrops',
            header: (header) => headerComponent(header, 'Outcrop'),
            filterFn: (row, columnId, filterValue) =>
              filterFunction(
                filterValue,
                row.original.outcrops.map((i) => i.name),
              ),
            size: 100,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.outcrops.map((a) => (
                  <p key={a.outcropId}>{a.name + ', '}</p>
                ))}
              </Styled.List>
            ),
          },
          {
            id: 'country',
            header: (header) => headerComponent(header, 'Country'),
            filterFn: (row, columnId, filterValue) =>
              filterFunction(
                filterValue,
                row.original.stratigraphicGroups.map(
                  (i) => i.country.identifier,
                ),
              ),
            size: 120,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.stratigraphicGroups.map((i) => (
                  <p key={i.country.countryId + i.stratigraphicGroupId}>
                    {i.country.identifier},{' '}
                  </p>
                ))}
              </Styled.List>
            ),
          },
          {
            id: 'field',
            header: (header) => headerComponent(header, 'Field'),
            filterFn: (row, columnId, filterValue) =>
              filterFunction(
                filterValue,
                row.original.stratigraphicGroups.map((i) => i.field.identifier),
              ),
            size: 120,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.stratigraphicGroups.map((i) => (
                  <p key={i.field.fieldId + i.stratigraphicGroupId}>
                    {i.field.identifier},{' '}
                  </p>
                ))}
              </Styled.List>
            ),
          },
          {
            id: 'stratigraphicColumn',
            header: (header) => headerComponent(header, 'Stratigraphic column'),
            filterFn: (row, columnId, filterValue) =>
              filterFunction(
                filterValue,
                row.original.stratigraphicGroups.map(
                  (i) => i.stratColumn.identifier,
                ),
              ),
            size: 230,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.stratigraphicGroups.map((i) => (
                  <p key={i.stratColumn.stratColumnId + i.stratigraphicGroupId}>
                    {i.stratColumn.identifier},{' '}
                  </p>
                ))}
              </Styled.List>
            ),
          },
          {
            id: 'group',
            header: (header) => headerComponent(header, 'Level 1 (group)'),
            filterFn: (row, columnId, filterValue) =>
              filterFunction(
                filterValue,
                getRowGroup(row.original.stratigraphicGroups).map(
                  (i) => i.identifier,
                ),
              ),
            size: 150,
            cell: ({ row }) => (
              <Styled.List>
                {getRowGroup(row.original.stratigraphicGroups).map((i) => (
                  <p key={i.stratUnitId + i.identifier}>{i.identifier}, </p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'isProcessed',
            id: 'isProcessed',
            header: 'Status',
            enableColumnFilter: false,
            size: 160,
            cell: ({ row }) => (
              <>{getModelStatus(row.original.analogueModelId)}</>
            ),
          },

          {
            header: 'Actions',
            id: 'navigate',
            enableColumnFilter: false,
            enableResizing: false,
            maxSize: 100,
            cell: ({ row }) => (
              <Styled.Buttons>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(`/${row.original.analogueModelId}/details`);
                  }}
                >
                  Open
                </Button>
              </Styled.Buttons>
            ),
          },
        ]}
      />
    </Styled.Table>
  );
};
