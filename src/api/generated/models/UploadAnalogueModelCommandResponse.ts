/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadAnalogueModelDto } from './UploadAnalogueModelDto';

export type UploadAnalogueModelCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: UploadAnalogueModelDto;
};

