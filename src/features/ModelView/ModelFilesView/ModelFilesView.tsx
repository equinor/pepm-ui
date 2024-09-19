import { Table, Typography } from '@equinor/eds-core-react';
import { UploadList } from '../../../api/generated';
import { useFetchModel } from '../../../hooks/useFetchModel';
import * as Styled from './ModelFilesView.styled';

export const ModelFilesView = () => {
  const { isLoading, data } = useFetchModel();

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  return (
    <Styled.TableWrapper>
      <Typography variant="h3">Files</Typography>
      <Styled.FileTable>
        <Table.Head>
          <Table.Row className="table-row">
            <Table.Cell>Model input files</Table.Cell>
            <Table.Cell>Size</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.success &&
          (data.data.fileUploads?.length === undefined ||
            data.data.fileUploads?.length > 0) ? (
            data.data.fileUploads?.map((file: UploadList) => (
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
