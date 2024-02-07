/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCase } from './ComputeCase';
import type { Job } from './Job';

export type ComputeJob = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    computeCaseId?: string;
    jobId?: string;
    isLatest?: boolean;
    computeCase?: ComputeCase;
    job?: Job;
};

