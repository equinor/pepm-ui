/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadFileCategory } from './UploadFileCategory';
import type { UploadFileType } from './UploadFileType';
import type { UploadStatus } from './UploadStatus';

export type UploadList = {
  uploadId?: string;
  analogueModelId?: string;
  originalFileName?: string | null;
  uploadStatus?: UploadStatus;
  uploadFileType?: UploadFileType;
  uploadFileCategory?: UploadFileCategory;
};