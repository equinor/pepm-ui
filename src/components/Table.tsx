import { Chip } from '@equinor/eds-core-react'
import { EdsDataGrid } from '@equinor/eds-data-grid-react'
import { useGetAnalogueModels } from '../hooks/useGetAnalogueModels'

export const Table = () => {
  const { data: models } = useGetAnalogueModels()

  if (!models) return <p>Loading...</p>

  return (
    <EdsDataGrid
      enableSorting
      enablePagination
      emptyMessage="Empty :("
      rows={models}
      columns={[
        {
          accessorKey: 'analogueModelId',
          header: 'Model ID',
          id: 'analogueModelId',
        },
        { accessorKey: 'name', header: 'Name', id: 'name' },
        {
          accessorKey: 'description',
          header: 'Description',
          id: 'description',
        },
        {
          accessorKey: 'isApproved',
          header: 'Result',
          cell: () => <Chip>{'Approved'}</Chip>,
        },
        {
          accessorKey: 'modified',
          header: 'Last Modified',
          cell: () => <div>{'<Last Modified>'}</div>,
        },
        {
          accessorKey: 'analogue',
          header: 'Analogue',
          cell: () => <div>{'<Analogue>'}</div>,
        },
        {
          accessorKey: 'formation',
          header: 'Formation',
          cell: () => <div>{'<Formation>'}</div>,
        },
        {
          accessorKey: 'field',
          header: 'Field',
          cell: () => <div>{'<Field>'}</div>,
        },
        {
          accessorKey: 'isProcessed',
          header: 'Status',
          id: 'isProcessed',
        },
      ]}
    />
  )
}
