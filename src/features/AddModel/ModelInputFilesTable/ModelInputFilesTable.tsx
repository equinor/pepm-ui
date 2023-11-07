/* eslint-disable max-lines-per-function */
import { Button, Table } from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { ChangeEvent } from 'react';
import IconButton from '../../../components/IconButton/IconButton';
import { FileUploader } from '../FileUploader/FileUploader';

type FileDisplay = { isVisible: boolean; toggle: () => void };

interface FileColumnProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  INI?: true;
  file?: File;
  fileDisplay?: FileDisplay;
  fileSize?: number;
}

const FileColumn = ({
  onChange,
  onDelete,
  INI,
  file,
  fileDisplay,
  fileSize,
}: FileColumnProps) => {
  const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
    <IconButton icon={deleteIcon} title="delete" onClick={onDelete} />
  );

  return (
    <Table.Row className={`${INI ? 'ini' : 'nc'}-file`}>
      <Table.Cell>
        <FileUploader
          onChange={onChange}
          file={file}
          acceptType={INI ? 'INI' : 'NC'}
        />
      </Table.Cell>
      <Table.Cell>
        {file && INI && (
          <Button variant="outlined" onClick={fileDisplay?.toggle}>
            {fileDisplay?.isVisible ? 'Hide' : 'Show'}
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>{file ? fileSize : '-'}</Table.Cell>
      <Table.Cell>{file && <DeleteButton onDelete={onDelete} />}</Table.Cell>
    </Table.Row>
  );
};

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
