/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';
import { FileColumn } from '../FileColumn/FileColumn';

type FileDisplay = { isVisible: boolean; toggle: () => void };

export const ModelInputFilesTable = ({
  fileDisplay,
  files,
  setFiles,
  fileSize,
  fileChange,
}: {
  fileDisplay: FileDisplay;
  files: { NC?: File; INI?: File };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      NC?: File | undefined;
      INI?: File | undefined;
    }>
  >;
  fileSize: number;
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
        <FileColumn
          file={files?.NC}
          onChange={fileChange}
          onDelete={() => setFiles({ ...files, NC: undefined })}
          fileSize={fileSize}
        />
        <FileColumn
          INI
          file={files?.INI}
          onChange={fileChange}
          onDelete={() => setFiles({ ...files, INI: undefined })}
          fileDisplay={fileDisplay}
        />
      </Table.Body>
    </Table>
  );
};
