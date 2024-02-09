/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateDto } from './CoordinateDto';
import type { GetVariogramResultsVariogramResultFileDto } from './GetVariogramResultsVariogramResultFileDto';

export type GetVariogramResultsDto = {
    computeCaseId?: string;
    variogramResultId?: string;
    identifier?: number;
    variogramResultFiles?: Array<GetVariogramResultsVariogramResultFileDto> | null;
    rmajor?: number;
    rminor?: number;
    azimuth?: number;
    rvertical?: number;
    sigma?: number;
    quality?: number;
    family?: string | null;
    archelFilter?: string | null;
    indicator?: string | null;
    attribute?: string | null;
    box?: Array<CoordinateDto> | null;
};

