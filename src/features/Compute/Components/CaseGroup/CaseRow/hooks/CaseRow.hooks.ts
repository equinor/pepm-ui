/* eslint-disable react-hooks/rules-of-hooks */
import {
  ComputeCaseDto,
  ListComputeSettingsModelDto,
  ModelAreaDto,
} from '../../../../../../api';
// import { useCaseRowStore } from '../../../../../../stores/CaseRowStore';

export const validateIndicator = (
  addError: (message: string) => void,
  setIndicatorParams: (bool: boolean) => void,
  setIndicatorVariogramModel: (bool: boolean) => void,
  selectedIndicatorParameters: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = true;
  setIndicatorParams(true);
  setIndicatorVariogramModel(true);

  if (selectedIndicatorParameters?.length === 0) {
    addError('Indicator parameters not selected!');
    setIndicatorParams(false);
    ret = false;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Indicator variogram model not selected!');
    setIndicatorVariogramModel(false);
    ret = false;
  }
  return ret;
};

export const validateNetToGross = (
  addError: (message: string) => void,
  setNetToGrossGrain: (bool: boolean) => void,
  setNetToGrossVariogramModel: (bool: boolean) => void,
  selectedGrainSize: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = true;
  setNetToGrossGrain(true);
  setNetToGrossVariogramModel(true);

  if (selectedGrainSize?.length === 0) {
    addError('Net-to-gross grain size not selected!');
    setNetToGrossGrain(false);
    ret = false;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Net-to-gross variogram model not selected!');
    setNetToGrossVariogramModel(false);
    ret = false;
  }
  return ret;
};

export const validateContiniousParameter = (
  addError: (message: string) => void,
  setContParamParameters: (bool: boolean) => void,
  setContParamArchel: (bool: boolean) => void,
  setContParamVariogramModel: (bool: boolean) => void,
  selectedContiniousParameters: ListComputeSettingsModelDto[] | undefined,
  selectedArchelFilter: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  let ret = true;
  setContParamParameters(true);
  setContParamArchel(true);
  setContParamVariogramModel(true);

  if (selectedContiniousParameters?.length === 0) {
    addError('Continious parameter parameters not selected!');
    setContParamParameters(false);
    ret = false;
  }
  if (selectedArchelFilter?.length === 0) {
    addError('Continious parameter archel filter not selected!');
    setContParamArchel(false);
    ret = false;
  }
  if (selectedVariogramModels?.length === 0) {
    addError('Continious parameter variogram model not selected!');
    setContParamVariogramModel(false);
    ret = false;
  }

  return ret;
};

export const checkDuplicateType = (
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
      setFunc(false);
      return false;
    }

    return true;
  }

  return false;
};

export const validateModelArea = (
  addError: (message: string) => void,
  setFunc: (bool: boolean) => void,
  selectedModelArea: ModelAreaDto[] | undefined,
) => {
  if (selectedModelArea === undefined || selectedModelArea.length === 0) {
    addError('You must select a model area');
    setFunc(false);
    return false;
  }
  return true;
};
