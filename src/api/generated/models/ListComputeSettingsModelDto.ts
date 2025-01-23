/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeMethod } from './ComputeMethod';
import type { ComputeType } from './ComputeType';
import type { InputValueType } from './InputValueType';

export type ListComputeSettingsModelDto = {
    computeSettingId?: string;
    computeType?: ComputeType;
    computeMethod?: ComputeMethod;
    inputValueType?: InputValueType;
    value?: string | null;
    name?: string | null;
};

