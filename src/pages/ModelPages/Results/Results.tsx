/* eslint-disable max-lines-per-function */
import { CaseResultView } from '../../../features/Results/CaseResult/CaseResultView/CaseResultView';
import { NoResults } from '../../../features/Results/NoResults/NoResults';

export interface VariogramResultListType {
  caseId: number;
  title: string;
  resultList: VariogramResultType[];
}

export interface VariogramResultType {
  identifier: number;
  family: string;
  computeMethod: string;
  modelArea: string;
  attribute: string;
  quality: GLfloat;
  sigma: GLfloat;
  approved: string;
}

export interface ObjectResultType {
  identifier: number;
  family: string;
  CWMean: GLfloat;
  CHMean: GLfloat;
  CWSD: GLfloat;
  CHSD: GLfloat;
  CWCount: GLfloat;
  CHCount: GLfloat;
  approved: string;
}

export type ResultType = {
  caseId: string;
  case: string;
  finished: boolean;
};
export const Results = () => {
  const loaded = true;
  const caseList: VariogramResultListType[] = [
    {
      caseId: 1,
      title: 'Variogram Case 1',
      resultList: [
        {
          identifier: 0,
          family: 'exponential',
          computeMethod: 'Net-to-gross',
          modelArea: 'Left',
          attribute: 'Porosity',
          quality: 0.6427819811789964,
          sigma: 0.06967589201242001,
          approved: 'rejected',
        },
        {
          identifier: 1,
          family: 'gaussian',
          computeMethod: 'Net-to-gross',
          modelArea: 'Proximal',
          attribute: 'Porosity',
          quality: 0.5432924009373808,
          sigma: 0.0670758033212357,
          approved: 'pending',
        },
      ],
    },
    {
      caseId: 3,
      title: 'Variogram Case 3',
      resultList: [
        {
          identifier: 2,
          family: 'general_exponential',
          computeMethod: 'Indicator / Architectural Element (AE)',
          modelArea: 'Distal',
          attribute: 'Porosity',
          quality: 0.5580294305723851,
          sigma: 0.0678988627745677,
          approved: 'approved',
        },
      ],
    },
  ];

  const objectList: ObjectResultType[] = [
    {
      identifier: 3,
      family: 'channel',
      CWMean: 190.15,
      CHMean: 1.94,
      CWSD: 68.69,
      CHSD: 0.68,
      CWCount: 863,
      CHCount: 863,
      approved: 'approved',
    },
    {
      identifier: 4,
      family: 'channel',
      CWMean: 134.47,
      CHMean: 1.76,
      CWSD: 59.93,
      CHSD: 0.73,
      CWCount: 754,
      CHCount: 754,
      approved: 'approved',
    },
  ];

  return (
    <>
      {loaded && (caseList.length !== 0 || objectList.length !== 0) ? (
        <CaseResultView caseList={caseList} objectList={objectList} />
      ) : (
        <NoResults />
      )}
    </>
  );
};
