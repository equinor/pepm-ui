import { Autocomplete, Icon, Table, Typography } from '@equinor/eds-core-react';
import { usePepmContextStore } from '../../../../stores/GlobalStore';
import { arrow_forward } from '@equinor/eds-icons';
import { ConfigurationArchelDto, GeologicalStandardDto } from '../../../../api';
import { CustomPutArchelRequest } from '../types/CustomPutArchelRequest';
import { styled } from 'styled-components';
import React from 'react';
import { spacings } from '../../../../tokens/spacings';
/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
Icon.add({ arrow_forward });

// requested by PO. Reduces SMDA archel list to given SMDA archel codes. Extend or Expand as wanted
const filteredArchelList = [
  10, 12, 16, 43, 48, 51, 52, 60, 61, 62, 63, 64, 65, 72, 75, 81, 87,
];
const StyledTable = styled(Table)`
  white-space: nowrap;
`;

const StyledCell = styled(Table.Cell)`
  display: flex;
  column-gap: ${spacings.SMALL};
  align-items: center;
  justify-content: space-between;
`;

export const ModelArchelMapSelectTable = ({
  selectedArchelMaps,
  setSelectedArchelMaps,
}: {
  selectedArchelMaps: CustomPutArchelRequest[];
  setSelectedArchelMaps: React.Dispatch<
    React.SetStateAction<CustomPutArchelRequest[]>
  >;
}) => {
  const { analogueModel, geologyStandards } = usePepmContextStore();

  function initialSelect(archel: ConfigurationArchelDto) {
    const initialSelection = geologyStandards.find(
      (s) =>
        s.geologicalStandardId ===
        archel.analogueModelComputeSettingArchelMap?.smdaGeologyStandardId,
    );
    if (initialSelection === undefined) return [] as GeologicalStandardDto[];
    return [initialSelection];
  }

  function onSelectOptionChange(
    archel: ConfigurationArchelDto,
    geologyStandard?: GeologicalStandardDto,
  ) {
    const putRequest: CustomPutArchelRequest = {
      archelId: archel.analogueModelConfigurationArchelId!,
      geologyStandardId: geologyStandard
        ? geologyStandard.geologicalStandardId
        : null,
    };
    const archelExists = selectedArchelMaps.find(
      (x) => x.archelId === archel.analogueModelConfigurationArchelId,
    );
    if (!archelExists) {
      setSelectedArchelMaps([...selectedArchelMaps, putRequest]);
    } else {
      const newArchelList = selectedArchelMaps.filter(
        (x) => x.archelId !== archel.analogueModelConfigurationArchelId,
      );
      newArchelList.push(putRequest);
      setSelectedArchelMaps(newArchelList);
    }
  }

  return (
    <StyledTable>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Delft3D</Table.Cell>
          <Table.Cell>SMDA</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {analogueModel.iniParameters.archels
          .filter((a) => a.value !== '0')
          .map((a) => {
            return (
              <Table.Row key={a.analogueModelConfigurationArchelId}>
                <StyledCell>
                  <Typography group="table" variant="cell_text">
                    {' '}
                    {a.value} - {a.name}
                  </Typography>
                  <Icon data={arrow_forward} />
                </StyledCell>
                <Table.Cell>
                  <Autocomplete
                    options={geologyStandards
                      .filter((g) => g.geologyGroup === 'ArchitecturalElement')
                      .filter((g) => filteredArchelList.includes(g.equinorCode))
                      .slice()
                      .sort((a, b) => a.equinorCode - b.equinorCode)}
                    label={undefined}
                    optionLabel={(opt) =>
                      `${opt.equinorCode} - ${opt.identifier}`
                    }
                    initialSelectedOptions={initialSelect(a)}
                    onOptionsChange={(changes) =>
                      onSelectOptionChange(a, changes.selectedItems[0])
                    }
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </StyledTable>
  );
};
