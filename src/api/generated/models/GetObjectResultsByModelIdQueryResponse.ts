/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetObjectResultsDto } from './GetObjectResultsDto';

export type GetObjectResultsByModelIdQueryResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<GetObjectResultsDto>;
};

