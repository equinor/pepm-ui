import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'

import { Button, Table, Typography } from '@equinor/eds-core-react'
import { ModelType } from '../../../pages/Model/Model'

import * as Styled from './ModelMetadataView.styled'

export const ModelMetadataView = () => {
  const [model, setModel] = useState<ModelType>()
  const { id } = useParams()
  const { fetchModel } = useAnalogueModels()

  useEffect(() => {
    async function getModel() {
      return await fetchModel({
        params: { path: { id: id ?? '' } },
      })
        .then((response) => response?.data)
        .then((model) => model && setModel(model as ModelType))
    }
    if (!model) {
      getModel()
    }
  }, [id, model, fetchModel])

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
        </p>
      )}
      <Styled.TableWrapper>
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
      </Styled.TableWrapper>

      <Button variant="outlined" className="edit-metadata-button">
        Edit description and metadata
      </Button>
    </div>
  )
}
