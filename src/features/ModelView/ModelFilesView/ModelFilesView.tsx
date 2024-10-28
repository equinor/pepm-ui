import { Table, Typography } from '@equinor/eds-core-react';
import { UploadList } from '../../../api/generated';
import * as Styled from './ModelFilesView.styled';
import { usePepmContextStore } from '../../../hooks/GlobalState';

export const ModelFilesView = () => {
  const { analogueModel } = usePepmContextStore();

  if (!analogueModel) return <p>Loading ...</p>;

  return (
    <Styled.TableWrapper>
      <Typography variant="h3" as="h2">
        Files
      </Typography>
      <Styled.FileTable>
        <Table.Head>
          <Table.Row className="table-row">
            <Table.Cell>Model input files</Table.Cell>
            <Table.Cell>Size</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {analogueModel &&
          (analogueModel.fileUploads?.length === undefined ||
            analogueModel.fileUploads?.length > 0) ? (
            analogueModel.fileUploads?.map((file: UploadList) => (
              <Table.Row key={file.uploadId} className="table-row">
                <Table.Cell>{file.originalFileName}</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>No files uploaded</Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Styled.FileTable>
    </Styled.TableWrapper>
  );
};
