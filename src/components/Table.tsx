import { DataTable } from '@equinor/apollo-components'
import { Chip } from '@equinor/eds-core-react'

export const Table = () => {
  const models = [
    {
      id: 0,
      analogue: 'Roda',
      field: 'Heidrun',
      isApproved: true,
      formation: 'Ile',
      status: 0.3,
      modified: Date.now(),
    },
    {
      id: 1,
      analogue: 'Roda',
      field: 'Tor',
      isApproved: false,
      formation: 'Ile',
      status: 0.5,
      modified: Date.now(),
    },
  ]

  return (
    <DataTable
      sorting={{ enableSorting: true }}
      tableCaption={'Analogue Models Table'}
      data={models}
      columns={[
        { accessorFn: (row) => row.id, accessorKey: 'Model ID' },
        {
          accessorFn: (row) => row.isApproved,
          accessorKey: 'isApproved',
          header: 'Result',
          cell: (cell) =>
            cell.row.original.isApproved && <Chip>{'Approved'}</Chip>,
        },
        { accessorFn: (row) => row.modified, accessorKey: 'Last Modified' },
        {
          accessorFn: (row) => row.analogue,
          accessorKey: 'analogue',
          header: 'Analogue',
          cell: (context) => <div>{context.row.original.analogue}</div>,
        },
        { accessorFn: (row) => row.formation, accessorKey: 'Formation' },
        { accessorFn: (row) => row.field, accessorKey: 'Field' },
        {
          accessorFn: (row) => (row.status * 100).toFixed() + '%',
          accessorKey: 'Status',
        },
      ]}
    ></DataTable>
  )
}
