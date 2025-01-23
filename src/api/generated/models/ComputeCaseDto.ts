/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCaseInputSettingsDto } from './ComputeCaseInputSettingsDto';
import type { ComputeCaseModelAreaDto } from './ComputeCaseModelAreaDto';
import type { ComputeJobStatus } from './ComputeJobStatus';
import type { ComputeMethod } from './ComputeMethod';
import type { ComputeType } from './ComputeType';

export type ComputeCaseDto = {
    computeCaseId: string;
    modelArea: ComputeCaseModelAreaDto;
    computeMethod: ComputeMethod;
    computeType: ComputeType;
    inputSettings: Array<ComputeCaseInputSettingsDto>;
    jobStatus: ComputeJobStatus;
};

