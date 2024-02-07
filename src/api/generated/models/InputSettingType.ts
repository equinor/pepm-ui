/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeMethod } from './ComputeMethod';
import type { ComputeMethodInputType } from './ComputeMethodInputType';
import type { InputSettingValue } from './InputSettingValue';

export type InputSettingType = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    inputSettingTypeId?: string;
    name?: string | null;
    description?: string | null;
    computeMethodInputTypes?: Array<ComputeMethodInputType> | null;
    computeMethods?: Array<ComputeMethod> | null;
    inputSettingValues?: Array<InputSettingValue> | null;
};

