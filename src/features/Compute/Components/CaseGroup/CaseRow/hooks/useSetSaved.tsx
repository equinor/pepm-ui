import { useEffect, useState } from 'react';
import { ComputeCaseDto, ComputeMethod } from '../../../../../../api/generated';

export const useSetSaved = (
  id: string,
  allCasesList: ComputeCaseDto[],
  caseList: ComputeCaseDto[],
) => {
  const [saved, setSaved] = useState<boolean>(true);

  useEffect(() => {
    function setNotSaved(r: ComputeCaseDto) {
      if (r.computeCaseId === id && r.computeMethod === ComputeMethod.CHANNEL) {
        setSaved(false);
      }
      if (
        r.computeCaseId === id &&
        r.computeMethod === ComputeMethod.MOUTHBAR
      ) {
        setSaved(false);
      }
    }

    allCasesList
      .filter((c) => !caseList.includes(c))
      .forEach((r) => setNotSaved(r));
  }, [caseList, allCasesList, id, saved]);

  useEffect(() => {
    function setNotSavedVariogram(r: ComputeCaseDto, type: string) {
      if (r.computeMethod === type) {
        setSaved(false);
      }
    }

    allCasesList.forEach((r) =>
      setNotSavedVariogram(r, ComputeMethod.INDICATOR),
    );
    allCasesList.forEach((r) =>
      setNotSavedVariogram(r, ComputeMethod.NET_TO_GROSS),
    );
    allCasesList.forEach((r) =>
      setNotSavedVariogram(r, ComputeMethod.CONTINIOUS_PARAMETER),
    );
  }, [caseList, allCasesList, saved]);

  return { saved };
};
