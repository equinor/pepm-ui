/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeType } from './ComputeType';
import type { CoordinateDto } from './CoordinateDto';
import type { GetObjectResultsFileDto } from './GetObjectResultsFileDto';
import type { ObjectEstimationResultDto } from './ObjectEstimationResultDto';
import type { ObjectHeightDto } from './ObjectHeightDto';
import type { ResultStatus } from './ResultStatus';

export type GetObjectResultsDto = {
    objectResultId: string;
    computeCaseId: string;
    type: ComputeType;
    status: ResultStatus;
    objectResultFiles: Array<GetObjectResultsFileDto>;
    segmentWidth: ObjectEstimationResultDto;
    width: ObjectEstimationResultDto;
    length: ObjectEstimationResultDto;
    segmentHeight: ObjectEstimationResultDto;
    height: ObjectHeightDto;
    box: Array<CoordinateDto>;
};

