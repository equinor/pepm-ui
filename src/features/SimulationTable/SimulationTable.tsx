/* eslint-disable camelcase */
import { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  EdsProvider,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import type { VisibilityState } from '@tanstack/react-table';
import {
  JobInspectionDialog,
  SimulationJob,
} from '../../components/JobInspectionDialog';
import * as Styled from './SimulationTable.styled';

interface SimulationTableProps {
  jobs: SimulationJob[];
  isLoading?: boolean;
}

export const SimulationTable = ({
  jobs,
  isLoading = false,
}: SimulationTableProps) => {
  const [selectedJob, setSelectedJob] = useState<SimulationJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    jobId: true,
    name: true,
    status: true,
    createdDate: true,
    completedDate: true,
    progress: true,
  });
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (job: SimulationJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Styled.Table>
        <Styled.Buttons
          style={{ marginBottom: '16px', justifyContent: 'flex-end' }}
        >
          <Button
            ref={anchorRef}
            variant="ghost_icon"
            onClick={() => setIsSideSheetOpen(!isSideSheetOpen)}
            aria-label="Toggle columns"
          >
            <Icon data={more_vertical} />
          </Button>
        </Styled.Buttons>
        <EdsDataGrid
          enableSorting
          emptyMessage="No simulation jobs found"
          columnResizeMode="onChange"
          rows={jobs}
          scrollbarHorizontal
          stickyHeader
          width="min(calc(100vw - 64px), 1400px)"
          columnVisibility={columnVisibility}
          columns={[
            {
              accessorKey: 'jobId',
              header: 'Job ID',
              id: 'jobId',
              size: 150,
            },
            {
              accessorKey: 'name',
              header: 'Job Name',
              id: 'name',
              size: 200,
            },
            {
              accessorKey: 'status',
              header: 'Status',
              id: 'status',
              size: 120,
            },
            {
              accessorKey: 'createdDate',
              header: 'Created',
              id: 'createdDate',
              size: 150,
              cell: ({ row }) =>
                row.original.createdDate
                  ? new Date(row.original.createdDate).toLocaleString()
                  : '-',
            },
            {
              accessorKey: 'completedDate',
              header: 'Completed',
              id: 'completedDate',
              size: 150,
              cell: ({ row }) =>
                row.original.completedDate
                  ? new Date(row.original.completedDate).toLocaleString()
                  : '-',
            },
            {
              accessorKey: 'progress',
              header: 'Progress',
              id: 'progress',
              size: 100,
              cell: ({ row }) =>
                row.original.progress !== undefined
                  ? `${row.original.progress}%`
                  : '-',
            },
            {
              header: 'Actions',
              id: 'actions',
              enableColumnFilter: false,
              enableResizing: false,
              enableSorting: false,
              maxSize: 120,
              cell: ({ row }) => (
                <Styled.Buttons>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(row.original)}
                  >
                    Inspect
                  </Button>
                </Styled.Buttons>
              ),
            },
          ]}
        />
      </Styled.Table>

      <JobInspectionDialog
        isOpen={isModalOpen}
        job={selectedJob}
        onClose={handleCloseModal}
      />

      <Styled.StyledSideSheet
        open={isSideSheetOpen}
        onClose={() => setIsSideSheetOpen(false)}
        title="Toggle Columns"
      >
        <div style={{ padding: '16px' }}>
          <Typography
            variant="overline"
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Input Parameters
          </Typography>
          <EdsProvider density="compact">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox
                label="Job ID"
                checked={columnVisibility.jobId}
                onChange={() => toggleColumn('jobId')}
              />
              <Checkbox
                label="Job Name"
                checked={columnVisibility.name}
                onChange={() => toggleColumn('name')}
              />
              <Checkbox
                label="Status"
                checked={columnVisibility.status}
                onChange={() => toggleColumn('status')}
              />
              <Checkbox
                label="Created"
                checked={columnVisibility.createdDate}
                onChange={() => toggleColumn('createdDate')}
              />
              <Checkbox
                label="Completed"
                checked={columnVisibility.completedDate}
                onChange={() => toggleColumn('completedDate')}
              />
              <Checkbox
                label="Progress"
                checked={columnVisibility.progress}
                onChange={() => toggleColumn('progress')}
              />
            </div>
          </EdsProvider>
        </div>
      </Styled.StyledSideSheet>
    </>
  );
};
