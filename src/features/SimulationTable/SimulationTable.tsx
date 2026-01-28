/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, EdsProvider, Icon } from '@equinor/eds-core-react';
import { view_column } from '@equinor/eds-icons';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import type { VisibilityState } from '@tanstack/react-table';
import { useFetchScenarios } from '../../hooks/useFetchScenarios';
import { ProgressCell } from './ProgressCell';
import * as Styled from './SimulationTable.styled';

// Helper function to parse JSON scenario data
const parseScenarioData = (jsonData: string | null | undefined) => {
  if (!jsonData) {
    return {
      template: '-',
      basinSlope: '-',
      composition: '-',
      riverLength: '-',
      simStopTime: '-',
      channelWidth: '-',
      subsidenceSea: '-',
      waveDirection: '-',
      waveHeightFin: '-',
      waveHeightIni: '-',
      outputInterval: '-',
      subsidenceLand: '-',
      tidalAmplitude: '-',
      riverDischargeFin: '-',
      riverDischargeIni: '-',
    };
  }

  try {
    const data = JSON.parse(jsonData);
    return {
      template: data.template?.value || '-',
      basinSlope:
        data.basinslope?.value !== undefined ? data.basinslope.value : '-',
      composition: data.composition?.value || '-',
      riverLength:
        data.riverlength?.value !== undefined ? data.riverlength.value : '-',
      simStopTime:
        data.simstoptime?.value !== undefined ? data.simstoptime.value : '-',
      channelWidth:
        data.channelwidth?.value !== undefined ? data.channelwidth.value : '-',
      subsidenceSea:
        data.subsidencesea?.value !== undefined
          ? data.subsidencesea.value
          : '-',
      waveDirection:
        data.wavedirection?.value !== undefined
          ? data.wavedirection.value
          : '-',
      waveHeightFin:
        data.waveheightfin?.value !== undefined
          ? data.waveheightfin.value
          : '-',
      waveHeightIni:
        data.waveheightini?.value !== undefined
          ? data.waveheightini.value
          : '-',
      outputInterval:
        data.outputinterval?.value !== undefined
          ? data.outputinterval.value
          : '-',
      subsidenceLand:
        data.subsidenceland?.value !== undefined
          ? data.subsidenceland.value
          : '-',
      tidalAmplitude:
        data.tidalamplitude?.value !== undefined
          ? data.tidalamplitude.value
          : '-',
      riverDischargeFin:
        data.riverdischargefin?.value !== undefined
          ? data.riverdischargefin.value
          : '-',
      riverDischargeIni:
        data.riverdischargeini?.value !== undefined
          ? data.riverdischargeini.value
          : '-',
    };
  } catch {
    return {
      template: '-',
      basinSlope: '-',
      composition: '-',
      riverLength: '-',
      simStopTime: '-',
      channelWidth: '-',
      subsidenceSea: '-',
      waveDirection: '-',
      waveHeightFin: '-',
      waveHeightIni: '-',
      outputInterval: '-',
      subsidenceLand: '-',
      tidalAmplitude: '-',
      riverDischargeFin: '-',
      riverDischargeIni: '-',
    };
  }
};

export const SimulationTable = () => {
  const navigate = useNavigate();
  const { data: scenarios = [], isLoading } = useFetchScenarios();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    template: true,
    basinSlope: true,
    composition: true,
    riverLength: false,
    simStopTime: false,
    channelWidth: false,
    subsidenceSea: false,
    waveDirection: false,
    waveHeightFin: false,
    waveHeightIni: false,
    outputInterval: false,
    subsidenceLand: false,
    tidalAmplitude: false,
    riverDischargeFin: false,
    riverDischargeIni: false,
    orchestration_status: true,
    created_at: true,
  });
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleNavigateToSimulation = (scenarioId: string | undefined) => {
    if (scenarioId) {
      navigate(`/simulations/${scenarioId}`);
    }
  };

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  if (isLoading) return <p>Loading scenarios...</p>;

  return (
    <>
      <Styled.Table>
        <Styled.ColumnsButton>
          <Button
            ref={anchorRef}
            variant="outlined"
            onClick={() => setIsSideSheetOpen(!isSideSheetOpen)}
            aria-label="Toggle columns"
          >
            Toggle columns&nbsp;
            <Icon data={view_column} />
          </Button>
        </Styled.ColumnsButton>
        <EdsDataGrid
          enableSorting
          emptyMessage="No scenarios found"
          columnResizeMode="onChange"
          rows={scenarios}
          scrollbarHorizontal
          stickyHeader
          width="100%"
          columnVisibility={columnVisibility}
          columns={[
            {
              header: 'Template',
              id: 'template',
              size: 180,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).template;
              },
            },
            {
              header: 'Basin slope',
              id: 'basinSlope',
              size: 120,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).basinSlope;
              },
            },
            {
              header: 'Sediment classes',
              id: 'composition',
              size: 150,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).composition;
              },
            },
            {
              header: 'River length',
              id: 'riverLength',
              size: 130,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).riverLength;
              },
            },
            {
              header: 'Simulation time',
              id: 'simStopTime',
              size: 140,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).simStopTime;
              },
            },
            {
              header: 'Channel width',
              id: 'channelWidth',
              size: 130,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).channelWidth;
              },
            },
            {
              header: 'Subsidence at seaward',
              id: 'subsidenceSea',
              size: 180,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).subsidenceSea;
              },
            },
            {
              header: 'Wave direction',
              id: 'waveDirection',
              size: 130,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).waveDirection;
              },
            },
            {
              header: 'Final wave height',
              id: 'waveHeightFin',
              size: 150,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).waveHeightFin;
              },
            },
            {
              header: 'Initial wave height',
              id: 'waveHeightIni',
              size: 150,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).waveHeightIni;
              },
            },
            {
              header: 'Output interval',
              id: 'outputInterval',
              size: 140,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).outputInterval;
              },
            },
            {
              header: 'Subsidence at landward',
              id: 'subsidenceLand',
              size: 180,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).subsidenceLand;
              },
            },
            {
              header: 'Tidal amplitude',
              id: 'tidalAmplitude',
              size: 140,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).tidalAmplitude;
              },
            },
            {
              header: 'Final river discharge',
              id: 'riverDischargeFin',
              size: 170,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).riverDischargeFin;
              },
            },
            {
              header: 'Initial river discharge',
              id: 'riverDischargeIni',
              size: 180,
              cell: ({ row }) => {
                const jsonData = (row.original as any).json_scenario_data;
                return parseScenarioData(jsonData).riverDischargeIni;
              },
            },
            {
              accessorKey: 'orchestration_status',
              header: 'Status',
              id: 'orchestration_status',
              size: 120,
            },
            {
              accessorKey: 'created_at',
              header: 'Created',
              id: 'created_at',
              size: 180,
              cell: ({ row }) =>
                row.original.created_at
                  ? new Date(row.original.created_at).toLocaleString()
                  : '-',
            },
            {
              accessorKey: 'created_by',
              header: 'Created By',
              id: 'created_by',
              size: 150,
            },
            {
              header: 'Actions',
              id: 'actions',
              enableColumnFilter: false,
              enableResizing: false,
              enableSorting: false,
              minSize: 280,
              cell: ({ row }) => {
                const scenario = row.original as any;
                const isRunning = scenario.orchestration_status === 'Running';

                return (
                  <Styled.ActionButtons>
                    <ProgressCell
                      orchestrationId={scenario.orchestration_id}
                      isRunning={isRunning}
                    />
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleNavigateToSimulation(scenario.scenario_id)
                      }
                    >
                      View
                    </Button>
                  </Styled.ActionButtons>
                );
              },
            },
          ]}
        />
      </Styled.Table>

      <Styled.StyledSideSheet
        open={isSideSheetOpen}
        onClose={() => setIsSideSheetOpen(false)}
        title="Toggle Columns"
      >
        <Styled.SideSheetContent>
          <Styled.SideSheetTitle variant="overline">
            Columns
          </Styled.SideSheetTitle>
          <EdsProvider density="compact">
            <Styled.CheckboxColumn>
              <Checkbox label="Template" checked={true} disabled />
              <Checkbox
                label="Basin slope"
                checked={columnVisibility.basinSlope}
                onChange={() => toggleColumn('basinSlope')}
              />
              <Checkbox
                label="Sediment classes"
                checked={columnVisibility.composition}
                onChange={() => toggleColumn('composition')}
              />
              <Checkbox
                label="River length"
                checked={columnVisibility.riverLength}
                onChange={() => toggleColumn('riverLength')}
              />
              <Checkbox
                label="Simulation time"
                checked={columnVisibility.simStopTime}
                onChange={() => toggleColumn('simStopTime')}
              />
              <Checkbox
                label="Channel width"
                checked={columnVisibility.channelWidth}
                onChange={() => toggleColumn('channelWidth')}
              />
              <Checkbox
                label="Subsidence at seaward"
                checked={columnVisibility.subsidenceSea}
                onChange={() => toggleColumn('subsidenceSea')}
              />
              <Checkbox
                label="Wave direction"
                checked={columnVisibility.waveDirection}
                onChange={() => toggleColumn('waveDirection')}
              />
              <Checkbox
                label="Final wave height"
                checked={columnVisibility.waveHeightFin}
                onChange={() => toggleColumn('waveHeightFin')}
              />
              <Checkbox
                label="Initial wave height"
                checked={columnVisibility.waveHeightIni}
                onChange={() => toggleColumn('waveHeightIni')}
              />
              <Checkbox
                label="Output interval"
                checked={columnVisibility.outputInterval}
                onChange={() => toggleColumn('outputInterval')}
              />
              <Checkbox
                label="Subsidence at landward"
                checked={columnVisibility.subsidenceLand}
                onChange={() => toggleColumn('subsidenceLand')}
              />
              <Checkbox
                label="Tidal amplitude"
                checked={columnVisibility.tidalAmplitude}
                onChange={() => toggleColumn('tidalAmplitude')}
              />
              <Checkbox
                label="Final river discharge"
                checked={columnVisibility.riverDischargeFin}
                onChange={() => toggleColumn('riverDischargeFin')}
              />
              <Checkbox
                label="Initial river discharge"
                checked={columnVisibility.riverDischargeIni}
                onChange={() => toggleColumn('riverDischargeIni')}
              />
              <Checkbox
                label="Status"
                checked={columnVisibility.orchestration_status}
                onChange={() => toggleColumn('orchestration_status')}
              />
              <Checkbox
                label="Created"
                checked={columnVisibility.created_at}
                onChange={() => toggleColumn('created_at')}
              />
            </Styled.CheckboxColumn>
          </EdsProvider>
        </Styled.SideSheetContent>
      </Styled.StyledSideSheet>
    </>
  );
};
