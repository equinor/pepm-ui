/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateDto } from './CoordinateDto';
import type { GetVariogramResultsVariogramResultFileDto } from './GetVariogramResultsVariogramResultFileDto';

export type GetVariogramResultsDto = {
  computeCaseId: string;
  variogramResultId: string;
  identifier: number;
  variogramResultFiles: Array<GetVariogramResultsVariogramResultFileDto>;
  rmajor: number;
  rminor: number;
  azimuth: number;
  rvertical: number;
  sigma: number;
  quality: number;
  family?: string;
  archelFilter?: string;
  indicator?: string;
  customIndicator?: string;
  attribute?: string;
  box: Array<CoordinateDto>;
};
