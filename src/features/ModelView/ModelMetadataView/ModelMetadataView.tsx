import { Button, Table, Typography } from '@equinor/eds-core-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ModelType } from '../../../pages/ModelPages/Model/Model'

export const ModelMetadataView = () => {
  const { id } = useParams()
  const model = useQuery(['models', 'token', { analogueModelId: id }], {
    enabled: !!id,
  }) as ModelType

  if (!model) return <p>Loading ...</p>

  // TODO
  // Map rows to model data

  return (
    <div className="metadata-view">
      <Typography variant="h3">Description and metadata</Typography>
      {model.description && (
        <p>
          {model.description}
          <br />
          <p>
            ** Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            bibendum ex at venenatis gravida. Sed id tempor dui. Nunc a posuere
            ligula. Pellentesque pulvinar varius neque nec molestie. Aliquam
            erat volutpat. Nunc pulvinar varius scelerisque. Suspendisse
            iaculis, elit id fringilla semper, justo felis luctus felis, et
            malesuada augue sapien a sem. Donec varius, sapien quis varius
            blandit, justo ex pellentesque nisl, eu placerat magna nisi et odio.
            Donec laoreet est quam, id fringilla magna semper in. Duis non massa
            euismod, ultrices tortor et, ultricies ante. Vivamus quis dignissim
            sem. Quisque purus dui, euismod eu lacus sed, mollis sagittis arcu.
            Curabitur vitae mauris ornare, elementum massa suscipit, congue leo.
            Sed fermentum imperdiet dapibus. Aliquam non ligula in felis laoreet
            suscipit. **
          </p>
        </p>
      )}
      <div>
        <Table>
          <Table.Body>
            <Table.Row className="table-row">
              <Table.Cell className="table-first-col">Field</Table.Cell>
              <Table.Cell>**Tor**</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Fomation</Table.Cell>
              <Table.Cell>**Tor**</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Analouge</Table.Cell>
              <Table.Cell>**Tor**</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-first-col">Zone</Table.Cell>
              <Table.Cell>**Tor**</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Button variant="outlined" className="edit-metadata-button">
        Edit description and metadata
      </Button>
    </div>
  )
}
