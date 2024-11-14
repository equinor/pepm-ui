import { Button, Table } from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { ChangeEvent } from 'react';
import IconButton from '../../../components/IconButton/IconButton';
import { FileUploader } from '../FileUploader/FileUploader';
import * as Styled from './FileRow.styled';

type FileDisplay = { isVisible: boolean; toggle: () => void };

interface FileColumnProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  INI?: true;
  file?: File;
  fileDisplay?: FileDisplay;
  fileSize?: number;
}
export const FileRow = ({
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

  function humanFileSize(bytes: number, si = true, dp = 2) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + ' ' + units[u];
  }

  return (
    <Table.Row className={`${INI ? 'ini' : 'nc'}-file`}>
      <Styled.UploadCell>
        <FileUploader
          onChange={onChange}
          file={file}
          acceptType={INI ? 'INI' : 'NC'}
        />
      </Styled.UploadCell>
      <Table.Cell>
        {file && INI && (
          <Button variant="outlined" onClick={fileDisplay?.toggle}>
            {fileDisplay?.isVisible ? 'Hide' : 'Show'}
          </Button>
        )}
      </Table.Cell>
      <Styled.FilesizeCell>
        {fileSize ? humanFileSize(fileSize) : '-'}
      </Styled.FilesizeCell>
      <Styled.DeleteCell>
        {file && <DeleteButton onDelete={onDelete} />}
      </Styled.DeleteCell>
    </Table.Row>
  );
};
