/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';
import { FileRow } from '../FileRow/FileRow';

type FileDisplay = { isVisible: boolean; toggle: () => void };

export const ModelInputFilesTable = ({
  fileDisplay,
  files,
  setFiles,
  fileChange,
}: {
  fileDisplay: FileDisplay;
  files: { INI?: File; NC?: File };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      NC?: File | undefined;
      INI?: File | undefined;
    }>
  >;
  fileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Model input files</Table.Cell>
          <Table.Cell />
          <Table.Cell>Size</Table.Cell>
          <Table.Cell />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <FileRow
          file={files?.NC}
          onChange={fileChange}
          onDelete={() => setFiles({ ...files, NC: undefined })}
          fileSize={files.NC?.size}
        />
        <FileRow
          INI
          file={files?.INI}
          onChange={fileChange}
          onDelete={() => setFiles({ ...files, INI: undefined })}
          fileDisplay={fileDisplay}
          fileSize={files.INI?.size}
        />
      </Table.Body>
    </Table>
  );
};
