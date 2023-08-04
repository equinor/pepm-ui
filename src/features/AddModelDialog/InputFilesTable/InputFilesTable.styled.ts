import { Table } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'

const StyledTableCell = styled(Table.Cell)`
  display: flex;
  align-items: center;
  padding-left: ${spacings.MEDIUM};
  gap: ${spacings.X_SMALL};
`

export { StyledTableCell as TableCell }
