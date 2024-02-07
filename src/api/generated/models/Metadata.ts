/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { AnalogueModelMetadata } from './AnalogueModelMetadata';
import type { MetadataType } from './MetadataType';

export type Metadata = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    metadataId?: string;
    externalId?: string | null;
    metadataTypeId?: string;
    metadataType?: MetadataType;
    value?: string | null;
    analogueModels?: Array<AnalogueModel> | null;
    modelMetadata?: Array<AnalogueModelMetadata> | null;
};

