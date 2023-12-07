/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueList } from './AnalogueList';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { MetadataDto } from './MetadataDto';
import type { ModelAreaDto } from './ModelAreaDto';
import type { ParameterList } from './ParameterList';
import type { UploadList } from './UploadList';

export type AnalogueModelList = {
    analogues: Array<AnalogueList>;
    uploads: Array<UploadList>;
    parameters: Array<ParameterList>;
    metadata: Array<MetadataDto>;
    modelAreas: Array<ModelAreaDto>;
    analogueModelId: string;
    name: string;
    description: string;
    isProcessed: boolean;
    sourceType: AnalogueModelSourceType;
};

