/* eslint-disable react-hooks/rules-of-hooks */
import {
  ComputeCaseDto,
  ListComputeSettingsModelDto,
  ModelAreaDto,
} from '../../../../../../api';

export const validateIndicator = async (
  addError: (message: string) => void,
  setIndicatorParams: (bool: boolean) => void,
  setIndicatorVariogramModel: (bool: boolean) => void,
  selectedIndicatorParameters: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = false;

  if (selectedIndicatorParameters?.length === 0) {
    addError('Indicator parameters not selected!');
    setIndicatorParams(true);
    ret = true;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Indicator variogram model not selected!');
    setIndicatorVariogramModel(true);
    ret = true;
  }
  return ret;
};

export const validateNetToGross = async (
  addError: (message: string) => void,
  setNetToGrossGrain: (bool: boolean) => void,
  setNetToGrossVariogramModel: (bool: boolean) => void,
  selectedGrainSize: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = false;

  if (selectedGrainSize?.length === 0) {
    addError('Net-to-gross grain size not selected!');
    setNetToGrossGrain(true);
    ret = true;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Net-to-gross variogram model not selected!');
    setNetToGrossVariogramModel(true);
    ret = true;
  }
  return ret;
};

export const validateContiniousParameter = async (
  addError: (message: string) => void,
  setContParamParameters: (bool: boolean) => void,
  setContParamArchel: (bool: boolean) => void,
  setContParamVariogramModel: (bool: boolean) => void,
  selectedContiniousParameters: ListComputeSettingsModelDto[] | undefined,
  selectedArchelFilter: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = false;

  if (selectedContiniousParameters?.length === 0) {
    addError('Continious parameter parameters not selected!');
    setContParamParameters(true);
    ret = true;
  }
  if (selectedArchelFilter?.length === 0) {
    addError('Continious parameter archel filter not selected!');
    setContParamArchel(true);
    ret = true;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Continious parameter variogram model not selected!');
    setContParamVariogramModel(true);
    ret = true;
  }

  return ret;
};

export const checkDuplicateType = async (
  addError: (message: string) => void,
  setFunc: (bool: boolean) => void,
  caseList: ComputeCaseDto[],
  selectedModelArea: ModelAreaDto[] | undefined,
  caseType: string,
) => {
  if (selectedModelArea && selectedModelArea.length > 0) {
    const checkDuplicateType = caseList
      .filter((c) => c.modelArea !== null)
      .filter((cl) => cl.modelArea.name === selectedModelArea[0].modelAreaType);

    if (caseType === 'Object' && checkDuplicateType.length > 0) {
      addError('Duplicate Object case, model area1');
      setFunc(true);
      return true;
    }

    return false;
  }

  return true;
};

export const validateModelArea = async (
  addError: (message: string) => void,
  setFunc: (bool: boolean) => void,
  selectedModelArea: ModelAreaDto[] | undefined,
) => {
  if (selectedModelArea === undefined || selectedModelArea.length === 0) {
    addError('You must select a model area');
    setFunc(true);
    return true;
  }
  return false;
};
