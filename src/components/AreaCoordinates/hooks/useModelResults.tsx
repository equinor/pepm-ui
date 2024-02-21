import { useFetchCases } from '../../../hooks/useFetchCases';

export const useModelResults = (activeArea: string) => {
  const cases = useFetchCases();

  const activeAreaResultList =
    cases.data &&
    cases.data.data
      .filter((c) => c.modelArea !== null)
      .filter((ca) => ca.modelArea.name === activeArea);

  return { activeAreaResultList };
};
