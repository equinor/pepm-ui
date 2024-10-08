/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModelImageDto } from './AnalogueModelImageDto';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { GeologicalGroupDto } from './GeologicalGroupDto';
import type { JobStatus } from './JobStatus';
import type { MetadataDto } from './MetadataDto';
import type { ModelAreaDto } from './ModelAreaDto';
import type { OutcropDto } from './OutcropDto';
import type { ParameterList } from './ParameterList';
import type { StratigraphicGroupDto } from './StratigraphicGroupDto';
import type { UploadList } from './UploadList';

export type AnalogueModelDetail = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    analogueModelId: string;
    name: string;
    description: string;
    isProcessed: boolean;
    sourceType: AnalogueModelSourceType;
    fileUploads: Array<UploadList>;
    parameters: Array<ParameterList>;
    metadata: Array<MetadataDto>;
    modelAreas: Array<ModelAreaDto>;
    stratigraphicGroups: Array<StratigraphicGroupDto>;
    geologicalGroups: Array<GeologicalGroupDto>;
    outcrops: Array<OutcropDto>;
    processingStatus: JobStatus;
    analogueModelImage?: AnalogueModelImageDto;
};

