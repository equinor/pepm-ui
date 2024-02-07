/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResultFile } from './ChannelResultFile';
import type { ComputeCase } from './ComputeCase';
import type { Geometry } from './Geometry';

export type ChannelResult = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    channelResultId?: string;
    computeCaseId?: string;
    computeCase?: ComputeCase;
    fileDirectory?: string | null;
    channelResultFiles?: Array<ChannelResultFile> | null;
    'segment-width__mean'?: number;
    'segment-width__sd'?: number;
    'segment-width__count'?: number;
    'channel-width__mean'?: number;
    'channel-width__sd'?: number;
    'channel-width__count'?: number;
    'segment-height__mean'?: number;
    'segment-height__sd'?: number;
    'segment-height__count'?: number;
    'channel-height__mean'?: number;
    'channel-height__sd'?: number;
    'channel-height__count'?: number;
    'channel-height__mode-mean'?: number;
    'channel-height__mode-sd'?: number;
    box?: Array<Geometry> | null;
};

