/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrepareChunkedUploadDto } from './PrepareChunkedUploadDto';

export type PrepareChunkedUploadCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: PrepareChunkedUploadDto;
};

