/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { ComputeCase } from './ComputeCase';
import type { Geometry } from './Geometry';
import type { ModelAreaType } from './ModelAreaType';

export type ModelArea = {
    modelAreaId?: string;
    name?: string | null;
    modelAreaTypeId?: string;
    modelAreaType?: ModelAreaType;
    analogueModelId?: string;
    analogueModel?: AnalogueModel;
    geometryList?: Array<Geometry> | null;
    computeCases?: Array<ComputeCase> | null;
};

