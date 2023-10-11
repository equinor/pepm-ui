import { Button, Table } from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { ChangeEvent } from 'react';
import IconButton from '../../components/IconButton/IconButton';
import { FileUploader } from '../FileUploader/FileUploader';

type FileDisplay = { isVisible: boolean; toggle: () => void };

interface FileColumnProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  INI?: true;
  file?: File;
  fileDisplay?: FileDisplay;
}

const FileColumn = ({
  onChange,
  onDelete,
  INI,
  file,
  fileDisplay,
}: FileColumnProps) => {
  const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
    <IconButton icon={deleteIcon} title="delete" onClick={onDelete} />
  );

  function fileSize(size: number) {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size >= 1024 && size < 1048576) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size >= 1048576) {
      return `${(size / 1048576).toFixed(1)} MB`;
    }
  }

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
      <Table.Cell>{file ? fileSize(file.size) : '-'}</Table.Cell>
      <Table.Cell>{file && <DeleteButton onDelete={onDelete} />}</Table.Cell>
    </Table.Row>
  );
};

export const ModelInputFilesTable = ({
  fileDisplay,
  files,
  setFiles,
}: {
  fileDisplay: FileDisplay;
  files: { NC?: File; INI?: File };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      NC?: File | undefined;
      INI?: File | undefined;
    }>
  >;
}) => {
  function updateFileDisplay(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!e.target.files) return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
  }

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
          onChange={updateFileDisplay}
          onDelete={() => setFiles({ ...files, NC: undefined })}
        />
        <FileColumn
          INI
          file={files?.INI}
          onChange={updateFileDisplay}
          onDelete={() => setFiles({ ...files, INI: undefined })}
          fileDisplay={fileDisplay}
        />
      </Table.Body>
    </Table>
  );
};
