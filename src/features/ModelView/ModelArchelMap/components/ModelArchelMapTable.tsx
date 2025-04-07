import { Table } from '@equinor/eds-core-react';
import { usePepmContextStore } from '../../../../stores/GlobalStore';

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
                <Table.Cell>
                  {a.value} - {a.name}
                </Table.Cell>
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
