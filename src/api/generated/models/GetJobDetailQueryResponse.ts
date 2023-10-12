/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JobDetail } from './JobDetail';

export type GetJobDetailQueryResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: JobDetail;
};
