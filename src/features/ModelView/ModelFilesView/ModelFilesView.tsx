/* eslint-disable max-lines-per-function */
import { CircularProgress, Table, Typography } from '@equinor/eds-core-react';
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
import { useState } from 'react';

export const ModelFilesView = () => {
  const { analogueModel } = usePepmContextStore();
  const [isLoadingNc, setIsLoadingNc] = useState<boolean>(false);
  const [isLoadingIni, setIsLoadingIni] = useState<boolean>(false);
  const [isLoadingResqml, setIsLoadingResqml] = useState<boolean>(false);

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  const downloadFile = async (fileType: UploadFileType) => {
    switch (fileType) {
      case UploadFileType.NET_CDF:
        setIsLoadingNc(true);
        await getFetchNcFileAxios(analogueModel);
        setIsLoadingNc(false);
        break;
      case UploadFileType.INI_DATA:
        setIsLoadingIni(true);
        await getFetchIniFileAxios(analogueModel);
        setIsLoadingIni(false);
        break;
      case UploadFileType.RES_QMLDATA:
        setIsLoadingResqml(true);
        await getFetchResqmlFileAxios(analogueModel);
        setIsLoadingResqml(false);
        break;
    }
    return;
  };

  const iconButtons = (fileType: UploadFileType) => {
    if (isLoadingNc && fileType === UploadFileType.NET_CDF)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={100}
          variant="indeterminate"
        />
      );
    if (isLoadingIni && fileType === UploadFileType.INI_DATA)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={100}
          variant="indeterminate"
        />
      );
    if (isLoadingResqml && fileType === UploadFileType.RES_QMLDATA)
      return (
        <CircularProgress
          color="primary"
          size={24}
          value={100}
          variant="indeterminate"
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
                <Table.Cell>{iconButtons(file.uploadFileType)}</Table.Cell>
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
              <Table.Cell>{iconButtons(UploadFileType.RES_QMLDATA)}</Table.Cell>
            </Table.Row>
          ) : (
            <></>
          )}
        </Table.Body>
      </Styled.FileTable>
    </Styled.TableWrapper>
  );
};
