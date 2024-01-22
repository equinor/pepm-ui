import { Table, Typography } from '@equinor/eds-core-react';
import { UploadList } from '../../../api/generated';
import { useFetchModel } from '../../../hooks/useFetchModel';
import * as Styled from './ModelSourceView.styled';

export const ModelSourceView = () => {
  const { isLoading, data } = useFetchModel();

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  return (
    <Styled.FileTable>
      <Typography variant="h3">Source</Typography>
      <p>Uploaded by ABCD@equinor.com on Sep 13, 2023</p>
      <Table>
        <Table.Head>
          <Table.Row className="table-row">
            <Table.Cell className="table-first-col">
              Model input files
            </Table.Cell>
            <Table.Cell>Size</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.success &&
          (data.data.fileUploads?.length === undefined ||
            data.data.fileUploads?.length > 0) ? (
            data.data.fileUploads?.map((file: UploadList) => (
              <Table.Row key={file.uploadId} className="table-row">
                <Table.Cell className="table-first-col">
                  {file.originalFileName}
                </Table.Cell>
                <Table.Cell>**Size**</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>No files uploaded</Table.Cell>
              <Table.Cell>--</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Styled.FileTable>
  );
};
