/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatchAnalogueModelDto } from './PatchAnalogueModelDto';

export type PatchAnalogueModelCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: PatchAnalogueModelDto;
};
