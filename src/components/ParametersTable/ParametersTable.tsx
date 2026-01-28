import { Table, Typography } from '@equinor/eds-core-react';
import { ReactNode } from 'react';

interface ParametersTableProps {
  sectionName?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const ParametersTable = ({
  sectionName,
  children,
  style,
}: ParametersTableProps) => {
  return (
    <Table style={{ marginBottom: '16px', width: '100%', ...style }}>
      {sectionName && (
        <Table.Caption>
          <Typography
            style={{
              marginBottom: '10px',
            }}
            variant="body_short_bold"
          >
            {sectionName}
          </Typography>
        </Table.Caption>
      )}
      <Table.Head>
        <Table.Row>
          <Table.Cell style={{ width: '440px' }}>
            <Typography variant="body_short_bold">Parameter name</Typography>
            <Typography variant="meta" style={{ marginLeft: '8px' }}>
              (min - max range)
            </Typography>
          </Table.Cell>
          <Table.Cell style={{ width: '140px' }}>
            <Typography variant="body_short_bold">Value</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant="body_short_bold">Unit</Typography>
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table>
  );
};

export default ParametersTable;
