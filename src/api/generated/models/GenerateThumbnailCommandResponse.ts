/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenerateThumbnailDto } from './GenerateThumbnailDto';

export type GenerateThumbnailCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: GenerateThumbnailDto;
};

