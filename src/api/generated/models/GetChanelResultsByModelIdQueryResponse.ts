/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetChannelResultsDto } from './GetChannelResultsDto';

export type GetChanelResultsByModelIdQueryResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<GetChannelResultsDto>;
};

