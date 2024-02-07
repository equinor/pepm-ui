/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateM } from './CoordinateM';
import type { VariogramResultFile } from './VariogramResultFile';

export type GetVariogramResultsDto = {
    computeCaseId?: string;
    variogramResultId?: string;
    identifier?: number;
    variogramResultFiles?: Array<VariogramResultFile> | null;
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
    box?: Array<CoordinateM> | null;
};

