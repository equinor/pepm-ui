/* eslint-disable max-lines-per-function */
import { Table, Typography } from '@equinor/eds-core-react';
import { UploadFileType, UploadList } from '../../../api/generated';
import * as Styled from './ModelFilesView.styled';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../hooks/GlobalState';
import IconButton from '../../../components/IconButton/IconButton';
import { download } from '@equinor/eds-icons';
import {
  getFetchIniFileAxios,
  getFetchNcFileAxios,
  getFetchResqmlFileAxios,
} from '../../../hooks/useFetchFile';

export const ModelFilesView = () => {
  const { analogueModel } = usePepmContextStore();

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  const downloadFile = (fileType: UploadFileType) => {
    switch (fileType) {
      case UploadFileType.NET_CDF:
        getFetchNcFileAxios(analogueModel);
        break;
      case UploadFileType.INI_DATA:
        getFetchIniFileAxios(analogueModel);
        break;
      case UploadFileType.RES_QMLDATA:
        getFetchResqmlFileAxios(analogueModel);
        break;
    }
    return;
  };

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
            <Table.Cell>Download</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {analogueModel !== analogueModelDefault &&
          (analogueModel.fileUploads?.length === undefined ||
            analogueModel.fileUploads?.length > 0) ? (
            analogueModel.fileUploads?.map((file: UploadList) => (
              <Table.Row key={file.uploadId} className="table-row">
                <Table.Cell>{file.originalFileName}</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>
                  <IconButton
                    icon={download}
                    title="download"
                    onClick={() => downloadFile(file.uploadFileType)}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>No files uploaded</Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>
          )}
          {analogueModel !== analogueModelDefault &&
          analogueModel.isProcessed === true ? (
            <Table.Row>
              <Table.Cell>Resqml.zip</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>
                {' '}
                <IconButton
                  icon={download}
                  title="download"
                  onClick={() => downloadFile(UploadFileType.RES_QMLDATA)}
                />
              </Table.Cell>
            </Table.Row>
          ) : (
            <></>
          )}
        </Table.Body>
      </Styled.FileTable>
    </Styled.TableWrapper>
  );
};
