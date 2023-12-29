import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import {
  copy as COPY,
  delete_to_trash as DELETE,
  play as PLAY,
  save as SAVE,
} from '@equinor/eds-icons';
import * as Styled from './CaseButtons.styled';

export const CaseButtons = ({
  disableRun,
  caseType,
  saveCase,
  runCase,
}: {
  disableRun: boolean;
  caseType: string;
  saveCase: () => void;
  runCase?: () => void;
}) => {
  return (
    <Styled.ButtonDiv>
      <Tooltip title={'Functionality not implemented yet.'}>
        <Button
          disabled
          variant="ghost_icon"
          // eslint-disable-next-line no-console
          onClick={() => console.log('Delete')}
          aria-label="remove"
        >
          <Icon data={DELETE} size={24}></Icon>
        </Button>
      </Tooltip>
      {caseType === 'Variogram' && (
        <Button
          variant="ghost_icon"
          aria-label="duplicate"
          // eslint-disable-next-line no-console
          onClick={() => console.log('Duplicate')}
        >
          <Icon data={COPY} size={24}></Icon>
        </Button>
      )}

      <Button variant="outlined" onClick={disableRun ? runCase : saveCase}>
        {disableRun ? (
          <>
            <Icon data={PLAY} size={18}></Icon>
            Run
          </>
        ) : (
          <>
            <Icon data={SAVE} size={18}></Icon>
            Save
          </>
        )}
      </Button>
    </Styled.ButtonDiv>
  );
};
