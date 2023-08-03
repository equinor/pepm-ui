import { Button, Icon, Table } from '@equinor/eds-core-react'
import {
  subdirectory_arrow_right as arrowIcon,
  delete_to_trash as deleteIcon,
} from '@equinor/eds-icons'
import IconButton from '../../components/IconButton/IconButton'
import { theme } from '../../tokens/theme'
import * as Styled from './ModelInputFiles.styled'

// Temporary type
type File = { name: string; size: number }

interface ModelInputFilesTableProps {
  inputFiles: File[]
  // NC file:
  modelFile?: File
  // INI file:
  parameterFile?: File
  onDeleteFile: () => void
}

const FileColumn = ({
  file,
  deleteFile,
  className,
}: {
  file?: File
  deleteFile: () => void
  className?: string
}) => {
  return (
    <Table.Row className={className}>
      {file ? (
        // INI file
        <>
          <Table.Cell>{file.name}</Table.Cell>
          <Table.Cell>
            <Button variant="outlined">Hide</Button>
          </Table.Cell>
          <Table.Cell>{`${file.size} GB`}</Table.Cell>
          <Table.Cell>
            <IconButton icon={deleteIcon} title="delete" onClick={deleteFile} />
          </Table.Cell>
        </>
      ) : (
        // Upload INI file
        <>
          <Styled.TableCell>
            <Icon
              fill={theme.light.text.staticIconsTertiary}
              data={arrowIcon}
            />
            <a href="/">Select parameter INI file</a> (optional)
          </Styled.TableCell>
          <Table.Cell />
          <Table.Cell>-</Table.Cell>
          <Table.Cell />
        </>
      )}
    </Table.Row>
  )
}

export const ModelInputFilesTable = ({
  inputFiles,
  onDeleteFile,
}: ModelInputFilesTableProps) => {
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
          className="nc-file"
          deleteFile={onDeleteFile}
          file={inputFiles[0]}
        />
        <FileColumn
          className="ini-file"
          deleteFile={onDeleteFile}
          file={inputFiles[1]}
        />
      </Table.Body>
    </Table>
  )
}
