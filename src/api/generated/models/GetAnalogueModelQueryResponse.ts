/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModelDetail } from './AnalogueModelDetail';

export type GetAnalogueModelQueryResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: AnalogueModelDetail;
};
