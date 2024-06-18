/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeType } from './ComputeType';
import type { CoordinateDto } from './CoordinateDto';
import type { GetObjectResultsFileDto } from './GetObjectResultsFileDto';
import type { ObjectEstimationResultDto } from './ObjectEstimationResultDto';
import type { ObjectHeightDto } from './ObjectHeightDto';

export type GetObjectResultsDto = {
    objectResultId: string;
    computeCaseId: string;
    type: ComputeType;
    objectResultFiles: Array<GetObjectResultsFileDto>;
    segmentWidth: ObjectEstimationResultDto;
    width: ObjectEstimationResultDto;
    segmentHeight: ObjectEstimationResultDto;
    height: ObjectHeightDto;
    box: Array<CoordinateDto>;
};

