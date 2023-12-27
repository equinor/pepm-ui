/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateJobStatusDto } from './UpdateJobStatusDto';

export type UpdateJobStatusCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<UpdateJobStatusDto>;
};

