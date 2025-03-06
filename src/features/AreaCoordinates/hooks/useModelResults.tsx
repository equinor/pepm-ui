import { ComputeCaseDto, ComputeJobStatus } from '../../../api/generated';

export const useModelResults = (
  activeArea: string,
  cases: ComputeCaseDto[] | undefined,
) => {
  const activeAreaResultList =
    cases &&
    cases
      .filter((c) => c.modelArea !== null)
      .filter((ca) => ca.modelArea.name === activeArea)
      .filter(
        (c) =>
          c.jobStatus === ComputeJobStatus.RUNNING ||
          c.jobStatus === ComputeJobStatus.SUCCEEDED ||
          c.jobStatus === ComputeJobStatus.WAITING,
      );

  return { activeAreaResultList };
};
