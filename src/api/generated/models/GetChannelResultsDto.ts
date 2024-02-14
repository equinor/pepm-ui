/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelEstimationResultDto } from './ChannelEstimationResultDto';
import type { ChannelHeightDto } from './ChannelHeightDto';
import type { ComputeType } from './ComputeType';
import type { CoordinateDto } from './CoordinateDto';
import type { GetChannelResultsFileDto } from './GetChannelResultsFileDto';

export type GetChannelResultsDto = {
    channelResultId: string;
    computeCaseId: string;
    type: ComputeType;
    channelResultFiles: Array<GetChannelResultsFileDto>;
    segmentWidth: ChannelEstimationResultDto;
    channelWidth: ChannelEstimationResultDto;
    segmentHeight: ChannelEstimationResultDto;
    channelHeight: ChannelHeightDto;
    box: Array<CoordinateDto>;
};

