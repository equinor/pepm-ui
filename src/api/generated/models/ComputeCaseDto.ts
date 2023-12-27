/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCaseComputeMethodDto } from './ComputeCaseComputeMethodDto';
import type { ComputeCaseInputSettingsDto } from './ComputeCaseInputSettingsDto';
import type { ComputeCaseModelAreaDto } from './ComputeCaseModelAreaDto';

export type ComputeCaseDto = {
  computeCaseId: string;
  computeMethod: ComputeCaseComputeMethodDto;
  modelArea: ComputeCaseModelAreaDto;
  inputSettings: Array<ComputeCaseInputSettingsDto>;
};
