/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { OutcropDto } from './OutcropDto';

export type GetOutcropsCommandResponse = {
  success?: boolean;
  count?: number | null;
  message?: string | null;
  validationErrors?: Array<string> | null;
  data: Array<OutcropDto>;
};
