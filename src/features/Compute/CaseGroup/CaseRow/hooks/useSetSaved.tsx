import { useEffect, useState } from 'react';
import { ComputeCaseDto } from '../../../../../api/generated';

export const useSetSaved = (
  id: string,
  allCasesList: ComputeCaseDto[],
  caseList: ComputeCaseDto[],
) => {
  const [saved, setSaved] = useState<boolean>(true);

  useEffect(() => {
    function setNotSaved(r: ComputeCaseDto) {
      if (r.computeCaseId === id && r.computeMethod.name === 'Channel') {
        setSaved(false);
      }
    }

    allCasesList
      .filter((c) => !caseList.includes(c))
      .forEach((r) => setNotSaved(r));
  }, [caseList, allCasesList, id, saved]);

  useEffect(() => {
    function setNotSavedVariogram(r: ComputeCaseDto, type: string) {
      if (r.computeMethod.name === type) {
        setSaved(false);
      }
    }

    allCasesList.forEach((r) => setNotSavedVariogram(r, 'Indicator'));
    allCasesList.forEach((r) => setNotSavedVariogram(r, 'Net-To-Gross'));
    allCasesList.forEach((r) => setNotSavedVariogram(r, 'ContiniousParameter'));
  }, [caseList, allCasesList, saved]);

  return { saved };
};
