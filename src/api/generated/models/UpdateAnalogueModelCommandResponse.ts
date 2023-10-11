/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateAnalogueModelDto } from './UpdateAnalogueModelDto';

export type UpdateAnalogueModelCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: UpdateAnalogueModelDto;
};
