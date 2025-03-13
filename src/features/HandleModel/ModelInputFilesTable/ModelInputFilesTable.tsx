/* eslint-disable max-lines-per-function */
import { Table } from '@equinor/eds-core-react';
import { FileRow } from '../FileRow/FileRow';
import { useAddModelStore } from '../../../pages/AddModel/stores/AddModelStore';

type FileDisplay = { isVisible: boolean; toggle: () => void };

export const ModelInputFilesTable = ({
  fileDisplay,
}: {
  fileDisplay: FileDisplay;
}) => {
  const { files, setFiles } = useAddModelStore();

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (
      !e.target.files[0].name.endsWith('.nc') &&
      !e.target.files[0].name.endsWith('.ini')
    )
      return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
  };
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
