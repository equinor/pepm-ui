/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateObjectEstimationStatusDto } from './UpdateObjectEstimationStatusDto';

export type UpdateObjectEstimationStatusCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<UpdateObjectEstimationStatusDto>;
};

