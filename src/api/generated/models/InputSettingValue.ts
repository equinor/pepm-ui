/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCase } from './ComputeCase';
import type { ComputeCaseInputValue } from './ComputeCaseInputValue';
import type { InputSettingType } from './InputSettingType';

export type InputSettingValue = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    inputSettingValueId?: string;
    name?: string | null;
    value?: string | null;
    inputSettingTypeId?: string;
    inputSettingType?: InputSettingType;
    computeCases?: Array<ComputeCase> | null;
    computeCaseInputValues?: Array<ComputeCaseInputValue> | null;
};

