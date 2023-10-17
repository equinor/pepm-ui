import { Table, Typography } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AnalogueModelsService, UploadList } from '../../../api/generated';

export const ModelSourceView = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models', id],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(id as string),
  });

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  // TODO
  // Add uploaded by and upload time
  return (
    <div className="source-view">
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
    </div>
  );
};
