/* eslint-disable max-lines-per-function */
import {
  Button,
  Card,
  CircularProgress,
  Icon,
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
import { download } from '@equinor/eds-icons';
import {
  GetFetchIniFileAxios,
  GetFetchNcFileAxios,
  GetFetchResqmlFileAxios,
} from '../../../hooks/useFetchFile';
import { useState } from 'react';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';

export const ModelFilesView = () => {
  const { analogueModel } = usePepmContextStore();
  const [isLoadingNc, setIsLoadingNc] = useState<number | undefined>(undefined);
  const [isLoadingIni, setIsLoadingIni] = useState<number | undefined>(
    undefined,
  );
  const [isLoadingResqml, setIsLoadingResqml] = useState<number | undefined>(
    undefined,
  );
  const isOwnerOrAdmin = useIsOwnerOrAdmin();

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  const downloadFile = async (fileType: UploadFileType) => {
    switch (fileType) {
      case UploadFileType.NET_CDF:
        setIsLoadingNc(0);
        await GetFetchNcFileAxios(analogueModel, setIsLoadingNc);
        setIsLoadingNc(undefined);
        break;
      case UploadFileType.INI_DATA:
        setIsLoadingIni(0);
        await GetFetchIniFileAxios(analogueModel, setIsLoadingIni);
        setIsLoadingIni(undefined);
        break;
      case UploadFileType.RES_QML_DATA:
        setIsLoadingResqml(0);
        await GetFetchResqmlFileAxios(analogueModel, setIsLoadingResqml);
        setIsLoadingResqml(undefined);
        break;
    }
    return;
  };

  const iconButtons = (fileType: UploadFileType) => {
    if (isLoadingNc !== undefined && fileType === UploadFileType.NET_CDF)
      return (
        <Styled.ProgressWrapper>
          <CircularProgress
            color="primary"
            size={24}
            value={isLoadingNc}
            variant="determinate"
          />
          <p>{isLoadingNc}%</p>
        </Styled.ProgressWrapper>
      );
    if (isLoadingIni !== undefined && fileType === UploadFileType.INI_DATA)
      return (
        <Styled.ProgressWrapper>
          <CircularProgress
            color="primary"
            size={24}
            value={isLoadingIni}
            variant="determinate"
          />
          <p>{isLoadingIni}%</p>
        </Styled.ProgressWrapper>
      );
    if (
      isLoadingResqml !== undefined &&
      fileType === UploadFileType.RES_QML_DATA
    )
      return (
        <Styled.ProgressWrapper>
          <CircularProgress
            color="primary"
            size={24}
            value={isLoadingResqml}
            variant="determinate"
          />
          <p>{isLoadingResqml}%</p>
        </Styled.ProgressWrapper>
      );

    return (
      <Button
        variant="ghost_icon"
        onClick={() => downloadFile(fileType)}
        disabled={!isOwnerOrAdmin}
      >
        <Icon data={download} title={'download'} />
      </Button>
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
