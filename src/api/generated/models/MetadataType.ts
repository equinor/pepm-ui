/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Metadata } from './Metadata';
import type { MetadataSourceType } from './MetadataSourceType';

export type MetadataType = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    metadataTypeId?: string;
    metadataSource?: MetadataSourceType;
    name?: string | null;
    description?: string | null;
    metadata?: Array<Metadata> | null;
};

