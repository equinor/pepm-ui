import { Typography } from '@equinor/eds-core-react';
import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from '../ModelMetadataView/ModelMetadataView.styled';
export const TableDataCell = ({
  data,
  type,
}: {
  data: AnalogueModelDetail;
  type: string;
}) => {
  return (
    <Styled.DataCell>
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
    </Styled.DataCell>
  );
};
