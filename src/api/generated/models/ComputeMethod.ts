/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCase } from './ComputeCase';
import type { ComputeMethodInputType } from './ComputeMethodInputType';
import type { ComputeType } from './ComputeType';
import type { InputSettingType } from './InputSettingType';

export type ComputeMethod = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    computeMethodId?: string;
    name?: string | null;
    description?: string | null;
    computeType?: ComputeType;
    computeMethodInputTypes?: Array<ComputeMethodInputType> | null;
    inputSettingTypes?: Array<InputSettingType> | null;
    computeCases?: Array<ComputeCase> | null;
};

