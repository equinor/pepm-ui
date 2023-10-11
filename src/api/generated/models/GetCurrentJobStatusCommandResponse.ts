/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetCurrentJobStatusDto } from './GetCurrentJobStatusDto';

export type GetCurrentJobStatusCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: GetCurrentJobStatusDto;
};
