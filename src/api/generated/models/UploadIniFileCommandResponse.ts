/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadIniFileDto } from './UploadIniFileDto';

export type UploadIniFileCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: UploadIniFileDto;
};

