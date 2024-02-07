/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResult } from './ChannelResult';
import type { FileType } from './FileType';

export type ChannelResultFile = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    fileName?: string | null;
    pathToFile?: string | null;
    type?: FileType;
    channelResultFileId?: string;
    channelResultId?: string;
    channelResult?: ChannelResult;
};

