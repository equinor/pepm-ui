/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConvertAnalogueModelDto } from './ConvertAnalogueModelDto';

export type ConvertAnalogueModelCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: ConvertAnalogueModelDto;
};
