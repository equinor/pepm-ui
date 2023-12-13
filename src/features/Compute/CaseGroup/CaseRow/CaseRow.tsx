/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { ModelAreaDto } from '../../../../api/generated';
import { ParameterList } from '../../../../api/generated/models/ParameterList';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import optionTypes from '../CaseGroup';
import { ObjectOptionSelect } from '../CaseOptionSelects/ObjectOptionSelect';
import { VariogramOptionSelect } from '../CaseOptionSelects/VariogramOptionSelect';
import * as Styled from './CaseRow.Styled';

export const CaseRow = ({
  caseType,
  id,
  runCase,
  removeCase,
  modelAreas,
}: {
  caseType: string;
  id: string;
  runCase?: () => void;
  removeCase: (id: string) => void;
  modelAreas?: ModelAreaDto[];
}) => {
  // const modelAreas: optionTypes[] = [
  //   { id: 10, name: 'Proximal' },
  //   { id: 11, name: 'Left' },
  //   { id: 12, name: 'Distal' },
  //   { id: 17, name: 'Whole model' },
  // ];

  const modelOptions: optionTypes[] = [
    { id: 4, name: 'Spherical' },
    { id: 5, name: 'Gaussian' },
    { id: 6, name: 'Exponential' },
    { id: 7, name: 'General exponential' },
  ];

  const [selectedGrainSize, setGrainSize] = useState<optionTypes[]>();
  const [selectedParameters, setParameters] = useState<ParameterList[]>();
  const [selectedVariogramModels, setVariogramModels] =
    useState<optionTypes[]>();
  const [selectedModelArea, setModelArea] = useState<ModelAreaDto[]>();

  return (
    <Styled.Case>
      <Styled.CaseRow>
        {caseType === 'Net-to-gross' && (
          <VariogramOptionSelect
            modelAreas={modelAreas}
            caseType={'Net-to-gross'}
            selectedModelArea={selectedModelArea}
            setModelArea={setModelArea}
            setGrainSize={setGrainSize}
            selectedGrainSize={selectedGrainSize}
            selectedParameters={selectedParameters}
            setParameters={setParameters}
            modelOptions={modelOptions}
            setVariogramModels={setVariogramModels}
            selectedVariogramModels={selectedVariogramModels}
          />
        )}

        {caseType === 'Continuous parameter' && (
          <VariogramOptionSelect
            modelAreas={modelAreas}
            caseType={'Continuous parameter'}
            selectedModelArea={selectedModelArea}
            setModelArea={setModelArea}
            selectedParameters={selectedParameters}
            setParameters={setParameters}
            modelOptions={modelOptions}
            setVariogramModels={setVariogramModels}
            selectedVariogramModels={selectedVariogramModels}
          />
        )}

        {caseType === 'Channel' && (
          <ObjectOptionSelect
            modelAreas={modelAreas}
            setModelArea={setModelArea}
          />
        )}
        <CaseButtons id={id} runCase={runCase} removeCase={removeCase} />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
