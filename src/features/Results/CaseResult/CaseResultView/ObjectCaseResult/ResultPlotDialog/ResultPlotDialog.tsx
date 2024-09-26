import { Button, Dialog } from '@equinor/eds-core-react';
import { GetObjectResultsDto } from '../../../../../../api/generated';
import { GraphPlot } from '../GraphPlot/GraphPlot';
import { ResultCaseMetadata } from '../ResultArea/ResultCaseMetadata/ResultCaseMetadata';
import * as Styled from './ResultPlotDialog.styled';

export const ResultPlotDialog = ({
  open,
  computeMethod,
  modelArea,
  data,
  toggleOpen,
}: {
  open: boolean;
  computeMethod?: string;
  modelArea: string;
  data: GetObjectResultsDto;
  toggleOpen: () => void;
}) => {
  return (
    <>
      <Styled.GraphDialog open={open}>
        <Dialog.Header>
          <Dialog.Title></Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <ResultCaseMetadata
            computeMethod={computeMethod}
            modelArea={modelArea}
          />
          <>
            <GraphPlot />
          </>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="outlined" onClick={toggleOpen}>
            Close
          </Button>
        </Dialog.Actions>
      </Styled.GraphDialog>
    </>
  );
};
