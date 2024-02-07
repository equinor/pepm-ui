/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileType } from './FileType';
import type { VariogramResult } from './VariogramResult';

export type VariogramResultFile = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    fileName?: string | null;
    pathToFile?: string | null;
    type?: FileType;
    variogramResultFileId?: string;
    variogramResultId?: string;
    variogramResult?: VariogramResult;
};

