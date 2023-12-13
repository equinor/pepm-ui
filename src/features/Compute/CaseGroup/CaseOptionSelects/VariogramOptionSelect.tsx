/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ModelAreaDto, ParameterList } from '../../../../api/generated';
import { ParametersService } from '../../../../api/generated/services/ParametersService';
import { default as optionTypes } from '../CaseGroup';
import { GrainSizeSelect } from '../CaseOptionSelects/GrainSizeSelect/GrainSizeSelect';
import { ParameterSelect } from '../CaseOptionSelects/ParameterSelect/ParameterSelect';
import * as Styled from './CaseOptionSelects.styled';
import { ModelSelect } from './ModelSelect/ModelSelect';

const grainOptions: optionTypes[] = [
  { id: 1, name: 'Silt', size: '0.044mm' },
  { id: 2, name: 'Very fine sand', size: '0.088mm' },
  { id: 3, name: 'Fine sand', size: '0.177mm' },
];

const ArchitecturalElementsList: optionTypes[] = [
  { id: 1, name: 'None' },
  { id: 2, name: 'Mouth bar' },
  { id: 3, name: 'Channel fill' },
];
export const VariogramOptionSelect = ({
  modelAreas,
  caseType,
  setModelArea,
  selectedModelArea,
  selectedGrainSize,
  setGrainSize,
  setParameters,
  selectedParameters,
  modelOptions,
  setVariogramModels,
  selectedVariogramModels,
}: {
  modelAreas?: ModelAreaDto[];
  caseType: string;
  setModelArea: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
  selectedModelArea: ModelAreaDto[] | undefined;

  selectedGrainSize?: optionTypes[];
  setGrainSize?: React.Dispatch<
    React.SetStateAction<optionTypes[] | undefined>
  >;
  selectedParameters: ParameterList[] | undefined;
  setParameters: React.Dispatch<
    React.SetStateAction<ParameterList[] | undefined>
  >;
  modelOptions: optionTypes[];
  setVariogramModels: React.Dispatch<
    React.SetStateAction<optionTypes[] | undefined>
  >;
  selectedVariogramModels: optionTypes[] | undefined;
}) => {
  const { data } = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => ParametersService.getApiParameters(),
  });

  const [architecturalElements, setArchitecturalElements] =
    useState<optionTypes>();

  console.log(architecturalElements);

  return (
    <Styled.AutocompleteWrapper>
      <Autocomplete
        label="Model area"
        options={
          modelAreas
            ? modelAreas
            : [
                {
                  modelAreaId: '0',
                  modelAreaType: 'Not set',
                  coordinates: [],
                },
              ]
        }
        optionLabel={(modelArea) => modelArea.modelAreaType}
        onOptionsChange={(changes: AutocompleteChanges<ModelAreaDto>) =>
          setModelArea(changes.selectedItems)
        }
      ></Autocomplete>

      {setGrainSize && caseType === 'Net-to-gross' && (
        <GrainSizeSelect
          label={'From grain size'}
          type={'grainSize'}
          options={grainOptions}
          selectedGrainSize={selectedGrainSize}
          setGrainSize={setGrainSize}
        />
      )}
      {caseType === 'Continuous parameter' && (
        <ParameterSelect
          label={'Parameter'}
          type={'parameters'}
          options={data && data.data}
          selectedParameters={selectedParameters}
          setParameters={setParameters}
        />
      )}
      <Autocomplete
        label="Architectural elements filter"
        disabled={caseType === 'Net-to-gross'}
        options={ArchitecturalElementsList}
        optionLabel={(ArchitecturalElementsList) =>
          ArchitecturalElementsList.name
        }
        onOptionsChange={(changes: AutocompleteChanges<optionTypes>) =>
          setArchitecturalElements(changes.selectedItems[0])
        }
      ></Autocomplete>
      <ModelSelect
        label={'Variogram model'}
        type={'variogramModels'}
        options={modelOptions}
        selectedVariogramModels={selectedVariogramModels}
        setVariogramModels={setVariogramModels}
      />
    </Styled.AutocompleteWrapper>
  );
};
