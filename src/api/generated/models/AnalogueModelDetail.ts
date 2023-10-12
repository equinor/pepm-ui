/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueList } from './AnalogueList';
import type { AnalogueModelSourceType } from './AnalogueModelSourceType';
import type { UploadList } from './UploadList';

export type AnalogueModelDetail = {
  analogueModelId?: string;
  name?: string | null;
  description?: string | null;
  isProcessed?: boolean;
  sourceType?: AnalogueModelSourceType;
  analogues?: Array<AnalogueList> | null;
  fileUploads?: Array<UploadList> | null;
};
