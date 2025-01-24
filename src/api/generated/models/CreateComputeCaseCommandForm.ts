/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeMethod } from './ComputeMethod';
import type { ComputeType } from './ComputeType';

export type CreateComputeCaseCommandForm = {
    modelAreaId?: string | null;
    computeType: ComputeType;
    computeMethod: ComputeMethod;
    inputSettings: Array<string>;
};

