import { useFetchLog } from '../../Hooks/useFetchLog';
import { StyledSideSheet, StyledTextField } from './LogSideSheet.styled';

export const LogSideSheet = ({
  toggle,
  setToggle,
  computeCaseId,
}: {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  computeCaseId: string;
}) => {
  const { data } = useFetchLog(computeCaseId);
  console.log('Log data:', data?.data);

  return (
    <StyledSideSheet
      open={toggle}
      onClose={() => setToggle(!toggle)}
      title="Log file"
    >
      {data?.data ? (
        <StyledTextField
          id={computeCaseId}
          multiline
          readOnly
          rowsMax={40}
          value={data.data as string}
        ></StyledTextField>
      ) : (
        <StyledTextField
          id={computeCaseId}
          readOnly
          value={'Could not load log file'}
        ></StyledTextField>
      )}
    </StyledSideSheet>
  );
};
