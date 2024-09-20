import { Button, Dialog } from '@equinor/eds-core-react';
import { GetObjectResultsDto } from '../../../../../../api/generated';
import { ResultCaseMetadata } from '../ResultArea/ResultCaseMetadata/ResultCaseMetadata';

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
      <Dialog open={open}>
        <Dialog.Header>
          <Dialog.Title></Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <ResultCaseMetadata
            computeMethod={computeMethod}
            modelArea={modelArea}
          />
          {data.type}
        </Dialog.Content>

        <Dialog.Actions>
          <Button variant="outlined" onClick={toggleOpen}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
