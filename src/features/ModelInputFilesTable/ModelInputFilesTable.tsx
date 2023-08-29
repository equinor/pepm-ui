import { Button, Table } from '@equinor/eds-core-react'
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons'
import IconButton from '../../components/IconButton/IconButton'
import { FileUploader } from '../FileUploader/FileUploader'

// TODO: Temporary type
export type File = { name: string; size: number; onDelete: () => void }

type FileDisplay = { isVisible: boolean; toggle: () => void }

const FileColumn = ({
  file,
  fileDisplay,
}: {
  file?: File
  fileDisplay?: FileDisplay
}) => {
  const isINI = fileDisplay !== undefined

  const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
    <IconButton icon={deleteIcon} title="delete" onClick={onDelete} />
  )

  return (
    <Table.Row className={`${isINI ? 'ini' : 'nc'}-file`}>
      <Table.Cell>
        <FileUploader INI={isINI} file={file} />
      </Table.Cell>
      <Table.Cell>
        {file && isINI && (
          <Button variant="outlined" onClick={fileDisplay?.toggle}>
            {fileDisplay?.isVisible ? 'Hide' : 'Show'}
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>{file ? `${file.size} GB` : '-'}</Table.Cell>
      <Table.Cell>
        {file && <DeleteButton onDelete={file.onDelete} />}
      </Table.Cell>
    </Table.Row>
  )
}

export const ModelInputFilesTable = ({
  files,
  fileDisplay,
}: {
  files: { NC?: File; INI?: File }
  fileDisplay: FileDisplay
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
        <FileColumn file={files.NC} />
        <FileColumn file={files.INI} fileDisplay={fileDisplay} />
      </Table.Body>
    </Table>
  )
}
