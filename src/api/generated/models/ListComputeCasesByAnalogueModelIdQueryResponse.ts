/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCaseDto } from './ComputeCaseDto';

export type ListComputeCasesByAnalogueModelIdQueryResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: Array<ComputeCaseDto>;
};

