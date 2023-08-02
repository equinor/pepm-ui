import { Button, Table } from '@equinor/eds-core-react'
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons'
import IconButton from '../../components/IconButton/IconButton'

interface ModelInputFilesTableProps {
  inputFiles: { name: string; size: number }[]
  onDeleteFile: () => void
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
        <Table.Row>
          {inputFiles.map((file) => (
            <>
              <Table.Cell>{file.name}</Table.Cell>
              <Table.Cell>
                <Button variant="outlined">Hide</Button>
              </Table.Cell>
              <Table.Cell>{`${file.size} GB`}</Table.Cell>
              <Table.Cell>
                <IconButton
                  icon={deleteIcon}
                  title="delete"
                  onClick={onDeleteFile}
                />
              </Table.Cell>
            </>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
