/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { ComputeCase } from './ComputeCase';
import type { JobStatus } from './JobStatus';
import type { JobType } from './JobType';
import type { Upload } from './Upload';

export type Job = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    jobId?: string;
    name?: string | null;
    analogueModelId?: string;
    analogueModel?: AnalogueModel;
    jobStatus?: JobStatus;
    jobType?: JobType;
    uploads?: Array<Upload> | null;
    computeCases?: Array<ComputeCase> | null;
};

