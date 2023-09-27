import { Table, Typography } from '@equinor/eds-core-react'
import { useParams } from 'react-router-dom'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'

export const ModelSourceView = () => {
  const { id } = useParams()
  const { model } = useAnalogueModels(id)

  if (!model) return <p>Loading ...</p>

  // TODO
  // Add uploaded by and upload time

  return (
    <div className="source-view">
      <Typography variant="h3">Source</Typography>
      <p>Uploaded by ABCD@equinor.com on Sep 13, 2023</p>
      <Table>
        <Table.Head>
          <Table.Row className="table-row">
            <Table.Cell className="table-first-col">
              Model input files
            </Table.Cell>
            <Table.Cell>Size</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {model.fileUploads?.length === undefined ||
          model.fileUploads?.length > 0 ? (
            model.fileUploads?.map((file: any) => (
              <Table.Row key={file.uploadId} className="table-row">
                <Table.Cell className="table-first-col">
                  {file.originalFileName}
                </Table.Cell>
                <Table.Cell>**Size**</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>No files uploaded</Table.Cell>
              <Table.Cell>--</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
