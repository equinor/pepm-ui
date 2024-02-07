/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetVariogramResultsDto } from './GetVariogramResultsDto';

export type GetVariogramResultsByModelIdQueryResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<GetVariogramResultsDto>;
};

