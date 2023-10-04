import { Button, Table, Typography } from '@equinor/eds-core-react'
import { useParams } from 'react-router-dom'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'

export const ModelMetadataView = () => {
  const { id } = useParams<{ id: string }>()
  const { model } = useAnalogueModels(id!)

  if (model.isLoading) <p>Loading.....</p>

  return (
    <div className="metadata-view">
      <Typography variant="h3">Description and metadata</Typography>
      {!model.isLoadingError &&
        model.isFetched &&
        model.data.data.description && (
          <p>
            {model.data.data.description}
            <br />
            <p>
              ** Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas bibendum ex at venenatis gravida. Sed id tempor dui. Nunc
              a posuere ligula. Pellentesque pulvinar varius neque nec molestie.
              Aliquam erat volutpat. Nunc pulvinar varius scelerisque.
              Suspendisse iaculis, elit id fringilla semper, justo felis luctus
              felis, et malesuada augue sapien a sem. Donec varius, sapien quis
              varius blandit, justo ex pellentesque nisl, eu placerat magna nisi
              et odio. Donec laoreet est quam, id fringilla magna semper in. **
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
