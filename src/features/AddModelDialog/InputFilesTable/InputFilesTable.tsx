import { Button, Icon, Table } from '@equinor/eds-core-react'
import {
  subdirectory_arrow_right as arrowIcon,
  delete_to_trash as deleteIcon,
} from '@equinor/eds-icons'
import IconButton from '../../../components/IconButton/IconButton'
import { theme } from '../../../tokens/theme'
import * as Styled from './InputFilesTable.styled'

// Temporary type
type File = { name: string; size: number; onDelete: () => void }

type FileDisplay = { isVisible: boolean; toggle: () => void }

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <IconButton icon={deleteIcon} title="delete" onClick={onDelete} />
)

const ModelFileColumn = ({ file }: { file?: File }) => (
  <Table.Row className="nc-file">
    <Table.Cell>
      {file ? file.name : <a href="/">Select model NC file</a>}
    </Table.Cell>
    <Table.Cell />
    <Table.Cell>{file ? `${file.size} GB` : '-'}</Table.Cell>
    <Table.Cell>{file && <DeleteButton onDelete={file.onDelete} />}</Table.Cell>
  </Table.Row>
)

const ParameterFileColumn = ({
  file,
  fileDisplay,
}: {
  file?: File
  fileDisplay?: FileDisplay
}) => (
  <Table.Row className="ini-file">
    <Styled.TableCell>
      {file ? (
        file.name
      ) : (
        <>
          <Icon fill={theme.light.text.staticIconsTertiary} data={arrowIcon} />
          <a href="/">Select parameter INI file</a> (optional)
        </>
      )}
    </Styled.TableCell>
    <Table.Cell>
      {file && (
        <Button variant="outlined" onClick={fileDisplay?.toggle}>
          {fileDisplay?.isVisible ? 'Hide' : 'Show'}
        </Button>
      )}
    </Table.Cell>
    <Table.Cell>{file ? `${file.size} GB` : '-'}</Table.Cell>
    <Table.Cell>{file && <DeleteButton onDelete={file.onDelete} />}</Table.Cell>
  </Table.Row>
)

export const InputFilesTable = ({
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
        <ModelFileColumn file={files.NC} />
        <ParameterFileColumn file={files.INI} fileDisplay={fileDisplay} />
      </Table.Body>
    </Table>
  )
}
