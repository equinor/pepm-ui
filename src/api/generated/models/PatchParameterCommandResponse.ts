/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatchParameterDto } from './PatchParameterDto';

export type PatchParameterCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: PatchParameterDto;
};
