import { ComputeCaseDto } from '../../../api/generated';

export const useModelResults = (
  activeArea: string,
  cases: ComputeCaseDto[] | undefined,
) => {
  const activeAreaResultList =
    cases &&
    cases
      .filter((c) => c.modelArea !== null)
      .filter((ca) => ca.modelArea.name === activeArea);

  return { activeAreaResultList };
};
