import { Autocomplete, TextField, Typography } from '@equinor/eds-core-react'
import * as Styled from './Metadata.styled'

export const Metadata = () => {
  const fields = [{ name: 'Tor' }]
  return (
    <Styled.Metadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <TextField
        id="model-description"
        className="model-description"
        label="Model description (optional)"
        multiline
      />
      <Autocomplete label="Field" options={fields}></Autocomplete>
      <Autocomplete label="Formation" options={fields}></Autocomplete>
      <Autocomplete label="Analogue (optional)" options={fields}></Autocomplete>
      <Autocomplete label="Zone (optional)" options={fields}></Autocomplete>
    </Styled.Metadata>
  )
}
