/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { AnalogueModelParameter } from './AnalogueModelParameter';

export type Parameter = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    parameterId?: string;
    identifier?: string | null;
    name?: string | null;
    description?: string | null;
    analogueModels?: Array<AnalogueModel> | null;
    modelParameters?: Array<AnalogueModelParameter> | null;
};

