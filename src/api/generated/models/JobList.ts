/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JobListUploadsDto } from './JobListUploadsDto';
import type { JobStatus } from './JobStatus';
import type { JobType } from './JobType';

export type JobList = {
  jobId?: string;
  name?: string | null;
  jobStatus?: JobStatus;
  jobType?: JobType;
  updated?: string;
  uploads?: Array<JobListUploadsDto> | null;
};
