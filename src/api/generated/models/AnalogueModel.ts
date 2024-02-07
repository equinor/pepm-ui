/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Analogue } from './Analogue';
import type { AnalogueModelMetadata } from './AnalogueModelMetadata';
import type { AnalogueModelParameter } from './AnalogueModelParameter';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { ComputeCase } from './ComputeCase';
import type { Metadata } from './Metadata';
import type { ModelArea } from './ModelArea';
import type { Parameter } from './Parameter';
import type { Upload } from './Upload';

export type AnalogueModel = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    analogueModelId?: string;
    name?: string | null;
    description?: string | null;
    isProcessed?: boolean;
    sourceType?: AnalogueModelSourceType;
    analogues?: Array<Analogue> | null;
    fileUploads?: Array<Upload> | null;
    parameters?: Array<Parameter> | null;
    modelParameters?: Array<AnalogueModelParameter> | null;
    metadata?: Array<Metadata> | null;
    modelMetadata?: Array<AnalogueModelMetadata> | null;
    modelAreas?: Array<ModelArea> | null;
    computeCases?: Array<ComputeCase> | null;
};

