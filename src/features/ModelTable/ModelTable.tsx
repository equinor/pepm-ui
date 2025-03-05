/* eslint-disable max-lines */
/* eslint-disable no-empty-pattern */
/* eslint-disable max-lines-per-function */
import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Checkbox,
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

export enum ModelStatus {
  UNKNOWN = 'Unknown',

  TRANSFORMING = 'Transforming ...',
  SUCCEEDED = 'Succeeded',
  FAILED_UPLOADING = 'Uploading failed',
  FAILED_TRANSFORMING = 'Transforming failed',
}

export const ModelTable = () => {
  const {
    addExportModel,
    deleteExportModel,
    exportModels,
    countryFilterList,
    setCountryFilterList,
    outcropFilterList,
    setOutcropFilterList,
    fieldFilterList,
    setFieldFilterList,
    stratColFilterList,
    setStratColFilterList,
    groupFilterList,
    setGroupFilterList,
  } = usePepmContextStore();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () =>
      AnalogueModelsService.getApiV1AnalogueModels(
        'outcrops, stratigraphicgroups',
      ),
    enabled: !!token,
    refetchInterval: 60000,
  });

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

  useEffect(() => {
    if (data?.data !== undefined) {
      setCountryFilterList(
        data.data
          .map((i) => i.stratigraphicGroups.map((s) => s.country.identifier))
          .flat(),
      );
      setOutcropFilterList(
        data.data.map((i) => i.outcrops.map((i) => i.name)).flat(),
      );
      setFieldFilterList(
        data.data
          .map((i) => i.stratigraphicGroups.map((s) => s.field.identifier))
          .flat(),
      );
      setStratColFilterList(
        data.data
          .map((i) =>
            i.stratigraphicGroups.map((s) => s.stratColumn.identifier),
          )
          .flat(),
      );
      setGroupFilterList(
        data.data
          .map((i) =>
            getRowGroup(i.stratigraphicGroups).map((s) => s.identifier),
          )
          .flat(),
      );
    }
  }, [
    data,
    setCountryFilterList,
    setFieldFilterList,
    setGroupFilterList,
    setOutcropFilterList,
    setStratColFilterList,
  ]);

  if (isLoading || !data?.success) return <p>Loading...</p>;

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

  const headerComponent = (
    header: HeaderContext<AnalogueModelList, any>,
    title: string,
    options: string[],
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
          {title}
        </Typography>
        <FilterWrapper
          column={header.column}
          CustomComponent={({ onChange, value }) =>
            SelectFilterComponent({ onChange, value }, options)
          }
        />
      </div>
    );
  };

  const SelectFilterComponent = (
    {
      onChange,
      value,
    }: {
      onChange: (value: unknown) => void;
      value: unknown;
    },
    options: string[],
  ) => {
    const values = value as string[];
    // This is always the correct List, but the properties should usually be different - need a new context?
    const [selectedValues, setSelectedValues] = useState(
      (values as string[]) || [],
    );

    useEffect(() => {
      setSelectedValues(values || []); // Update selectedValues when value prop changes
    }, [values]);

    const handleSelections = (e: AutocompleteChanges<string>) => {
      setSelectedValues(e.selectedItems);
      onChange(e.selectedItems);
    };

    return (
      <Autocomplete
        label="Select multiple labels"
        options={options}
        multiple
        initialSelectedOptions={selectedValues}
        onOptionsChange={handleSelections}
      />
    );
  };

  const filterFunction = (filterValue: string[], data: string[]) => {
    if (!filterValue || filterValue.length === 0) return true;

    let arr: string[] = [];
    filterValue.forEach((item: string) => {
      if (item === '') return;
      arr = arr.concat(
        data.filter((key: string) =>
          key.toLowerCase().includes(item.toLowerCase()),
        ),
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
            enableSorting: false,
            header: function () {
              <Styled.List>{<Checkbox></Checkbox>}</Styled.List>;
            },
            id: 'expand',
            size: 80,
            cell: ({ row }) => (
              <>
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
              </>
            ),
          },
          { accessorKey: 'name', header: 'Model name', id: 'name', size: 200 },
          {
            id: 'outcrops',
            header: (header) =>
              headerComponent(header, 'Outcrop', outcropFilterList),
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
            header: (header) =>
              headerComponent(header, 'Country', countryFilterList),
            // filterFn: 'arrIncludes',
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
            header: (header) =>
              headerComponent(header, 'Field', fieldFilterList),
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
            header: (header) =>
              headerComponent(
                header,
                'Stratigraphic column',
                stratColFilterList,
              ),
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
            header: (header) =>
              headerComponent(header, 'Level 1 (group)', groupFilterList),
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
