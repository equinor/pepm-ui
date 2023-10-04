/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import * as Styled from './CaseCard.styled'
import { CaseCardButtons } from './CaseCardButtons/CaseCardButtons'
import { CaseCardInputs } from './CaseCardInputs/CaseCardInputs'
import { CaseCardParameters } from './CaseCardParameters/CaseCardParameters'
export default interface optionTypes {
  id: number
  name: string
  size?: string
}

export const CaseCard = ({
  name,
  id,
  removeCase,
}: {
  name: string
  id: string
  removeCase: (id: string) => void
}) => {
  const [selectedModelArea, setModelArea] = useState<optionTypes>()
  const [selectedComputeMethod, setComputeMethod] = useState<optionTypes>()
  const [selectedGrainSize, setGrainSize] = useState<optionTypes>()
  const [selectedVariogramModels, setVariogramModels] =
    useState<optionTypes[]>()
  const [selectedParameters, setParameters] = useState<optionTypes[]>()

  const grainOptions: optionTypes[] = [
    { id: 1, name: 'Silt', size: '0.044mm' },
    { id: 2, name: 'Very fine sand', size: '0.088mm' },
    { id: 3, name: 'Fine sand', size: '0.177mm' },
  ]

  const modelOptions: optionTypes[] = [
    { id: 4, name: 'Spherical' },
    { id: 5, name: 'Gaussian' },
    { id: 6, name: 'Exponential' },
    { id: 7, name: 'General exponential' },
  ]

  const parameterOptions: optionTypes[] = [
    { id: 8, name: 'Porosity' },
    { id: 9, name: 'Permeability' },
  ]

  const modelAreas: optionTypes[] = [
    { id: 10, name: 'Proximal' },
    { id: 11, name: 'Left' },
    { id: 12, name: 'Distal' },
  ]
  const computeMethods: optionTypes[] = [
    { id: 13, name: 'Net-to-gross' },
    { id: 14, name: 'Continuous parameter' },
  ]
  const runCase = () => {
    console.log(selectedModelArea)
    console.log(selectedComputeMethod)
    console.log(selectedGrainSize)
    console.log(selectedVariogramModels)
    console.log(selectedParameters)
  }

  return (
    <Styled.Wrapper>
      <Styled.Case>
        <Typography variant="h4">{name}</Typography>
        <Styled.CaseCard>
          <CaseCardInputs
            modelAreas={modelAreas}
            computeMethods={computeMethods}
            setModelArea={setModelArea}
            setComputeMethod={setComputeMethod}
          />
          <CaseCardButtons id={id} runCase={runCase} removeCase={removeCase} />
        </Styled.CaseCard>
      </Styled.Case>
      <div>
        {selectedModelArea && selectedComputeMethod ? (
          <Styled.Parameters>
            {selectedComputeMethod.name === 'Net-to-gross' && (
              <CaseCardParameters
                label={'From grain size'}
                type={'grainSize'}
                options={grainOptions}
                selectedGrainSize={selectedGrainSize}
                setGrainSize={setGrainSize}
              />
            )}
            {selectedComputeMethod.name === 'Continuous parameter' && (
              <CaseCardParameters
                label={'Parameter'}
                type={'parameters'}
                options={parameterOptions}
                selectedParameters={selectedParameters}
                setParameters={setParameters}
              />
            )}
            <CaseCardParameters
              label={'Variogram model'}
              type={'variogramModels'}
              options={modelOptions}
              selectedVariogramModels={selectedVariogramModels}
              setVariogramModels={setVariogramModels}
            />
          </Styled.Parameters>
        ) : (
          <Styled.Parameters>
            <Typography>
              Select model area and compute method to see available parameters.
            </Typography>
          </Styled.Parameters>
        )}
      </div>
    </Styled.Wrapper>
  )
}
