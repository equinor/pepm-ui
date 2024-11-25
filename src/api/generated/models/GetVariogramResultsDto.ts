/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateDto } from './CoordinateDto';
import type { GetVariogramResultsVariogramResultFileDto } from './GetVariogramResultsVariogramResultFileDto';
import type { ResultStatus } from './ResultStatus';

export type GetVariogramResultsDto = {
    computeCaseId: string;
    variogramResultId: string;
    identifier: number;
    status: ResultStatus;
    variogramResultFiles: Array<GetVariogramResultsVariogramResultFileDto>;
    rmajor: number;
    rminor: number;
    azimuth: number;
    rvertical: number;
    sigma: number;
    quality: number;
    qualityX: number;
    qualityY: number;
    qualityZ: number;
    family: string;
    archelFilter?: string | null;
    indicator?: string | null;
    customIndicator?: string | null;
    attribute?: string | null;
    box: Array<CoordinateDto>;
};

