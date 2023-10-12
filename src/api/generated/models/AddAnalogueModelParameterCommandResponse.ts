/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddAnalogueModelParameterDto } from './AddAnalogueModelParameterDto';

export type AddAnalogueModelParameterCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: AddAnalogueModelParameterDto;
};
