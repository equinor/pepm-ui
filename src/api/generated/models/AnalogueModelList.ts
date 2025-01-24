/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModelConfigurationDto } from './AnalogueModelConfigurationDto';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { GeologicalGroupDto } from './GeologicalGroupDto';
import type { JobStatus } from './JobStatus';
import type { ModelAreaDto } from './ModelAreaDto';
import type { OutcropDto } from './OutcropDto';
import type { StratigraphicGroupDto } from './StratigraphicGroupDto';
import type { UploadList } from './UploadList';

export type AnalogueModelList = {
    uploads: Array<UploadList>;
    modelAreas: Array<ModelAreaDto>;
    stratigraphicGroups: Array<StratigraphicGroupDto>;
    geologicalGroups: Array<GeologicalGroupDto>;
    outcrops: Array<OutcropDto>;
    iniParameters: AnalogueModelConfigurationDto;
    analogueModelId: string;
    name: string;
    description: string;
    isProcessed: boolean;
    sourceType: AnalogueModelSourceType;
    processingStatus: JobStatus;
};

