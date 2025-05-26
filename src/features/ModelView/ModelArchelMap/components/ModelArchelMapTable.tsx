import { Icon, Table } from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';
import { usePepmContextStore } from '../../../../stores/GlobalStore';
import { styled } from 'styled-components';
import { spacings } from '../../../../tokens/spacings';
/* eslint-disable camelcase */
Icon.add({ arrow_forward });

const StyledCell = styled(Table.Cell)`
  display: flex;
  column-gap: ${spacings.SMALL};
  align-items: center;
  justify-content: space-between;
`;

export const ModelArchelMapTable = () => {
  const { analogueModel } = usePepmContextStore();
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Delft3D</Table.Cell>
          <Table.Cell>SMDA</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {analogueModel.iniParameters.archels.map(
          (a) =>
            a.analogueModelComputeSettingArchelMap && (
              <Table.Row key={a.analogueModelConfigurationArchelId}>
                <StyledCell>
                  {a.value} - {a.name}
                  <Icon data={arrow_forward} />
                </StyledCell>
                <Table.Cell>
                  {a.analogueModelComputeSettingArchelMap.equinorCode} -{' '}
                  {a.analogueModelComputeSettingArchelMap.identifier}
                </Table.Cell>
              </Table.Row>
            ),
        )}
      </Table.Body>
    </Table>
  );
};
