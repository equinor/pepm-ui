/* eslint-disable no-empty-pattern */
/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  AnalogueModelsService,
  CountryDto,
  FieldDto,
  OpenAPI,
  StratColumnDto,
  StratigraphicGroupDto,
  StratUnitDto,
} from '../../api/generated';
import { useAccessToken } from '../../hooks/useAccessToken';
import * as Styled from './ModelTable.styled';

export const ModelTable = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models'],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
    enabled: !!token,
    refetchInterval: 60000,
  });

  if (isLoading || !data?.success) return <p>Loading...</p>;

  const getRowCountries = (stratGroupList: StratigraphicGroupDto[]) => {
    const countryList: CountryDto[] = [];

    if (stratGroupList.length > 0) {
      stratGroupList.forEach((i) => {
        if (
          countryList.filter((item) => item.countryId === i.country.countryId)
            .length <= 0
        )
          countryList.push(i.country);
      });
    }
    return countryList;
  };

  const getRowField = (stratGroupList: StratigraphicGroupDto[]) => {
    const fieldList: FieldDto[] = [];

    if (stratGroupList.length > 0) {
      stratGroupList.forEach((i) => {
        if (
          fieldList.filter((item) => item.fieldId === i.field.fieldId).length <=
          0
        )
          fieldList.push(i.field);
      });
    }
    return fieldList;
  };

  const getRowStratCol = (stratGroupList: StratigraphicGroupDto[]) => {
    const stratColList: StratColumnDto[] = [];

    if (stratGroupList.length > 0) {
      stratGroupList.forEach((i) => {
        if (
          stratColList.filter(
            (item) => item.stratColumnId === i.stratColumn.stratColumnId,
          ).length <= 0
        )
          stratColList.push(i.stratColumn);
      });
    }
    return stratColList;
  };

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

  return (
    <Styled.Table>
      <EdsDataGrid
        enableSorting
        enablePagination
        enableColumnFiltering
        emptyMessage="Empty :("
        columnResizeMode="onChange"
        rows={data.data}
        pageSize={10}
        columns={[
          { accessorKey: 'name', header: 'Model name', id: 'name' },
          {
            accessorKey: 'analogues',
            id: 'analogues',
            header: 'Analogue',
            enableColumnFilter: false,
            size: 100,
            cell: ({ row }) => (
              <Styled.List>
                {row.original.analogues.length > 0 ??
                  row.original.analogues.map((a) => (
                    <p key={a.analogueId}>{a.name + ', '}</p>
                  ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'country',
            id: 'country',
            header: 'Country',
            enableColumnFilter: false,
            size: 120,
            cell: ({ row }) => (
              <Styled.List>
                {getRowCountries(row.original.stratigraphicGroups).map((i) => (
                  <p key={i.countryId}>{i.identifier}, </p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'field',
            id: 'field',
            header: 'Field',
            enableColumnFilter: false,
            size: 120,
            cell: ({ row }) => (
              <Styled.List>
                {getRowField(row.original.stratigraphicGroups).map((i) => (
                  <p key={i.fieldId}>{i.identifier}, </p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'stratigraphicColumn',
            id: 'stratigraphicColumn',
            header: 'Stratigraphic column',
            enableColumnFilter: false,
            size: 230,
            cell: ({ row }) => (
              <Styled.List>
                {getRowStratCol(row.original.stratigraphicGroups).map((i) => (
                  <p key={i.stratColumnId}>{i.identifier}, </p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'group',
            id: 'group',
            header: 'Level 1 (group)',
            enableColumnFilter: false,
            size: 150,
            cell: ({ row }) => (
              <Styled.List>
                {getRowGroup(row.original.stratigraphicGroups).map((i) => (
                  <p key={i.stratUnitId}>{i.identifier}, </p>
                ))}
              </Styled.List>
            ),
          },
          {
            accessorKey: 'isProcessed',
            id: 'isProcessed',
            header: 'Status',
            enableColumnFilter: false,
            size: 100,
            cell: ({ row }) => (
              <>{row.original.isProcessed ? 'Success' : 'Failed'}</>
            ),
          },

          {
            accessorKey: 'navigate',
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
