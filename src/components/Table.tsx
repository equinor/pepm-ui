import { DataTable } from '@equinor/apollo-components'
import { Chip } from '@equinor/eds-core-react'
import { useGetAnalogueModels } from '../hooks/useGetAnalogueModels'

export const Table = () => {
  const { data: models } = useGetAnalogueModels()

  if (!models) return <p>Loading...</p>

  return (
    <DataTable
      sorting={{ enableSorting: true }}
      tableCaption={'Analogue Models Table'}
      data={models}
      columns={[
        {
          accessorFn: (model) => model.analogueModelId,
          accessorKey: 'Model ID',
        },
        {
          accessorFn: (model) => model.name,
          accessorKey: 'Name',
        },
        {
          accessorFn: (model) => model.description,
          accessorKey: 'Description',
        },
        {
          accessorFn: (model) => model, // model.isApproved
          accessorKey: 'isApproved',
          header: 'Result',
          cell: () => <Chip>{'Approved'}</Chip>,
          // cell: (cell) => cell.row.original.isApproved && <Chip>{'Approved'}</Chip>,
        },
        {
          accessorFn: (model) => model,
          accessorKey: 'Last Modified',
          header: 'Last Modified',
          cell: () => <div>{'<Last Modified>'}</div>,
        },
        {
          accessorFn: (model) => model, // model.analogue
          accessorKey: 'analogue',
          header: 'Analogue',
          cell: () => <div>{'<Analogue>'}</div>, // (context) => <div>{context.row.original.analogue}</div>
        },
        {
          accessorFn: (model) => model,
          accessorKey: 'Formation',
          header: 'Formation',
          cell: () => <div>{'<Formation>'}</div>,
        },
        {
          accessorFn: (model) => model,
          accessorKey: 'Field',
          header: 'Field',
          cell: () => <div>{'<Formation>'}</div>,
        },
        {
          accessorFn: () => (0.43 * 100).toFixed() + '%', // (model) => (model.status * 100).toFixed() + '%',
          accessorKey: 'Status',
        },
      ]}
    />
  )
}
