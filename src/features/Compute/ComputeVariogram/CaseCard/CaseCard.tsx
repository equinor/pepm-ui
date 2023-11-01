/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ParameterList } from '../../../../api/generated/models/ParameterList';
import { ParametersService } from '../../../../api/generated/services/ParametersService';
import * as Styled from './CaseCard.styled';
import { CaseCardButtons } from './CaseCardButtons/CaseCardButtons';
import { ObjectCaseCardInputs } from './CaseCardInputs/ObjectCaseCardInputs';
import { VariogramCaseCardInputs } from './CaseCardInputs/VariogramCaseCardInputs';
import { ModelSelect } from './CaseCardParameters/ModelSelect/ModelSelect';

import { GrainSizeSelect } from './CaseCardParameters/GrainSizeSelect/GrainSizeSelect';
import { ParameterSelect } from './CaseCardParameters/ParameterSelect/ParameterSelect';

import { CaseCardComponent } from '../../../../components/CaseCardComponent/CaseCardComponent';

export default interface optionTypes {
  id: number;
  name: string;
  size?: string;
}

export const CaseCard = ({
  name,
  id,
  removeCase,
  caseType,
}: {
  name: string;
  id: string;
  removeCase: (id: string) => void;
  caseType: string;
}) => {
  const [selectedModelArea, setModelArea] = useState<optionTypes>();
  const [selectedComputeMethod, setComputeMethod] = useState<optionTypes>();
  const [selectedGrainSize, setGrainSize] = useState<optionTypes[]>();
  const [selectedVariogramModels, setVariogramModels] =
    useState<optionTypes[]>();
  const [selectedParameters, setParameters] = useState<ParameterList[]>();

  const { isLoading, data } = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => ParametersService.getApiParameters(),
  });

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  const grainOptions: optionTypes[] = [
    { id: 1, name: 'Silt', size: '0.044mm' },
    { id: 2, name: 'Very fine sand', size: '0.088mm' },
    { id: 3, name: 'Fine sand', size: '0.177mm' },
  ];

  const modelOptions: optionTypes[] = [
    { id: 4, name: 'Spherical' },
    { id: 5, name: 'Gaussian' },
    { id: 6, name: 'Exponential' },
    { id: 7, name: 'General exponential' },
  ];

  const modelAreas: optionTypes[] = [
    { id: 10, name: 'Proximal' },
    { id: 11, name: 'Left' },
    { id: 12, name: 'Distal' },
  ];
  const variogramComputeMethods: optionTypes[] = [
    { id: 13, name: 'Net-to-gross' },
    { id: 14, name: 'Continuous parameter' },
  ];
  const objectComputeMethods: optionTypes[] = [{ id: 15, name: 'Channel' }];

  const runCase = () => {
    // eslint-disable-next-line no-console
    console.log(selectedModelArea);
    // eslint-disable-next-line no-console
    console.log(selectedComputeMethod);
    // eslint-disable-next-line no-console
    console.log(selectedGrainSize);
    // eslint-disable-next-line no-console
    console.log(selectedVariogramModels);
    // eslint-disable-next-line no-console
    console.log(selectedParameters);
  };

  return (
    <CaseCardComponent title={name}>
      <Styled.Case>
        <Styled.CaseCard>
          {caseType === 'variogram' ? (
            <VariogramCaseCardInputs
              modelAreas={modelAreas}
              computeMethods={variogramComputeMethods}
              setModelArea={setModelArea}
              setComputeMethod={setComputeMethod}
            />
          ) : (
            <ObjectCaseCardInputs
              modelAreas={modelAreas}
              computeMethods={objectComputeMethods}
              setModelArea={setModelArea}
              setComputeMethod={setComputeMethod}
            />
          )}
          <CaseCardButtons id={id} runCase={runCase} removeCase={removeCase} />
        </Styled.CaseCard>
      </Styled.Case>
      <div>
        {caseType === 'variogram' &&
          selectedComputeMethod &&
          selectedModelArea && (
            <Styled.Parameters>
              {caseType === 'variogram' &&
                selectedComputeMethod.name === 'Net-to-gross' && (
                  <GrainSizeSelect
                    label={'From grain size'}
                    type={'grainSize'}
                    options={grainOptions}
                    selectedGrainSize={selectedGrainSize}
                    setGrainSize={setGrainSize}
                  />
                )}
              {selectedComputeMethod.name === 'Continuous parameter' && (
                <ParameterSelect
                  label={'Parameter'}
                  type={'parameters'}
                  options={data.data}
                  selectedParameters={selectedParameters}
                  setParameters={setParameters}
                />
              )}
              {caseType === 'variogram' && (
                <ModelSelect
                  label={'Variogram model'}
                  type={'variogramModels'}
                  options={modelOptions}
                  selectedVariogramModels={selectedVariogramModels}
                  setVariogramModels={setVariogramModels}
                />
              )}
            </Styled.Parameters>
          )}
        {caseType === 'object' && (
          <Styled.Parameters>
            <Typography>This compute method has no parameters.</Typography>
          </Styled.Parameters>
        )}

        {!selectedComputeMethod && caseType === 'variogram' && (
          <Styled.Parameters>
            <Typography>
              Select model area and compute method to see available parameters.
            </Typography>
          </Styled.Parameters>
        )}
      </div>
    </CaseCardComponent>
  );
};
