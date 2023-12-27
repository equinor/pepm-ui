/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RadixJobDto } from './RadixJobDto';

export type UpdateChannelEstimationStatusCommand = {
    name: string;
    started?: string | null;
    ended?: string | null;
    status: string;
    jobStatuses?: Array<RadixJobDto> | null;
};

