/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { Job } from './Job';
import type { UploadFileCategory } from './UploadFileCategory';
import type { UploadFileType } from './UploadFileType';
import type { UploadStatus } from './UploadStatus';

export type Upload = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    uploadId?: string;
    analogueModel?: AnalogueModel;
    uploadStatus?: UploadStatus;
    uploadFileType?: UploadFileType;
    uploadFileCategory?: UploadFileCategory;
    filePath?: string | null;
    originalFileName?: string | null;
    jobs?: Array<Job> | null;
};

