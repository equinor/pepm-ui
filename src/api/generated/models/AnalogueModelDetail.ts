/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueList } from './AnalogueList';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { GeologicalGroupDto } from './GeologicalGroupDto';
import type { MetadataDto } from './MetadataDto';
import type { ModelAreaDto } from './ModelAreaDto';
import type { ParameterList } from './ParameterList';
import type { StratigraphicGroupDto } from './StratigraphicGroupDto';
import type { UploadList } from './UploadList';

export type AnalogueModelDetail = {
    analogueModelId: string;
    name: string;
    description: string;
    isProcessed: boolean;
    sourceType: AnalogueModelSourceType;
    analogues: Array<AnalogueList>;
    fileUploads: Array<UploadList>;
    parameters: Array<ParameterList>;
    metadata: Array<MetadataDto>;
    modelAreas: Array<ModelAreaDto>;
    stratigraphicGroups: Array<StratigraphicGroupDto>;
    geologicalGroups: Array<GeologicalGroupDto>;
};

