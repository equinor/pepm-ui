/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateAnalogueModelDto } from './CreateAnalogueModelDto';

export type CreateAnalogueModelCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: CreateAnalogueModelDto;
};

