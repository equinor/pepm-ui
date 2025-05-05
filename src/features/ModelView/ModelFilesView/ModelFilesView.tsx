/* eslint-disable max-lines-per-function */
import {
  Card,
  CircularProgress,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import {
  UploadFileType,
  UploadList,
  UploadStatus,
} from '../../../api/generated';
import * as Styled from './ModelFilesView.styled';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../stores/GlobalStore';
import IconButton from '../../../components/IconButton/IconButton';
import { download } from '@equinor/eds-icons';
import {
  GetFetchIniFileAxios,
  GetFetchNcFileAxios,
  GetFetchResqmlFileAxios,
} from '../../../hooks/useFetchFile';
import { useState } from 'react';

export const ModelFilesView = () => {
  const { analogueModel } = usePepmContextStore();
  const [isLoadingNc, setIsLoadingNc] = useState<number>(0);
  const [isLoadingIni, setIsLoadingIni] = useState<number>(0);
  const [isLoadingResqml, setIsLoadingResqml] = useState<number>(0);

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  const downloadFile = async (fileType: UploadFileType) => {
    switch (fileType) {
      case UploadFileType.NET_CDF:
        await GetFetchNcFileAxios(analogueModel, setIsLoadingNc);
        setIsLoadingNc(0);
        break;
      case UploadFileType.INI_DATA:
        await GetFetchIniFileAxios(analogueModel, setIsLoadingIni);
        setIsLoadingIni(0);
        break;
      case UploadFileType.RES_QML_DATA:
        await GetFetchResqmlFileAxios(analogueModel, setIsLoadingResqml);
        setIsLoadingResqml(0);
        break;
    }
    return;
  };

  const iconButtons = (fileType: UploadFileType) => {
    if (isLoadingNc !== 0 && fileType === UploadFileType.NET_CDF)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={isLoadingNc}
          variant="determinate"
        />
      );
    if (isLoadingIni !== 0 && fileType === UploadFileType.INI_DATA)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={isLoadingIni}
          variant="determinate"
        />
      );
    if (isLoadingResqml !== 0 && fileType === UploadFileType.RES_QML_DATA)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={isLoadingResqml}
          variant="determinate"
        />
      );

    return (
      <IconButton
        icon={download}
        title="download"
        onClick={() => downloadFile(fileType)}
      />
    );
  };

  return (
    <Styled.TableWrapper>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <Typography variant="h3" as="h2">
            Model Files
          </Typography>
          <Styled.FileTable>
            <Table.Head>
              <Table.Row className="table-row">
                <Table.Cell style={{ minWidth: '512px' }}>File name</Table.Cell>
                <Table.Cell>Size</Table.Cell>
                <Table.Cell>Download</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {analogueModel !== analogueModelDefault &&
              (analogueModel.fileUploads?.length === undefined ||
                analogueModel.fileUploads?.length > 0) ? (
                analogueModel.fileUploads
                  ?.filter(
                    (f) =>
                      f.uploadStatus !== UploadStatus.FAILED &&
                      f.uploadStatus !== UploadStatus.STARTED,
                  )
                  .map((file: UploadList) => (
                    <Table.Row key={file.uploadId} className="table-row">
                      <Styled.TableCell>
                        {file.originalFileName}
                      </Styled.TableCell>
                      <Table.Cell>-</Table.Cell>
                      <Table.Cell>
                        {iconButtons(file.uploadFileType)}
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
              analogueModel.isProcessed === true &&
              analogueModel.fileUploads.filter(
                (x) =>
                  x.uploadFileType === UploadFileType.INI_DATA &&
                  x.uploadStatus === UploadStatus.COMPLETED,
              ).length !== 0 ? (
                <Table.Row>
                  <Table.Cell>Resqml.zip</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>
                    {iconButtons(UploadFileType.RES_QML_DATA)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <></>
              )}
            </Table.Body>
          </Styled.FileTable>
        </Card.Content>
      </Card>
    </Styled.TableWrapper>
  );
};
