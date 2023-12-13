/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListComputeSettingsDto } from './ListComputeSettingsDto';

export type ListComputeSettingsQueryResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<ListComputeSettingsDto>;
};

