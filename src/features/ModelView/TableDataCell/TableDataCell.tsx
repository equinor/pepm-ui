import { Table, Typography } from '@equinor/eds-core-react';
import { AnalogueModelDetail } from '../../../api/generated';

export const TableDataCell = ({
  data,
  type,
}: {
  data: AnalogueModelDetail;
  type: string;
}) => {
  return (
    <Table.Cell className="table-second-col">
      {type === 'Analouge' ? (
        data.analogues && data.analogues.length > 0 ? (
          data.analogues.map((m) => (
            <Typography key={m.analogueId}>{m.name}</Typography>
          ))
        ) : (
          <Typography> - </Typography>
        )
      ) : data.metadata?.filter((m) => m.metadataType === type).length ? (
        data.metadata
          ?.filter((m) => m.metadataType === type)
          .map((m) => (
            <Typography key={m.metadataId}>{m.value + ', '}</Typography>
          ))
      ) : (
        <Typography> - </Typography>
      )}
    </Table.Cell>
  );
};
