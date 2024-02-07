/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnalogueModel } from './AnalogueModel';
import type { ChannelResult } from './ChannelResult';
import type { ComputeCaseInputValue } from './ComputeCaseInputValue';
import type { ComputeJob } from './ComputeJob';
import type { ComputeMethod } from './ComputeMethod';
import type { ComputeType } from './ComputeType';
import type { InputSettingValue } from './InputSettingValue';
import type { Job } from './Job';
import type { ModelArea } from './ModelArea';
import type { VariogramResult } from './VariogramResult';

export type ComputeCase = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    computeCaseId?: string;
    isApproved?: boolean;
    computeType?: ComputeType;
    computeMethodId?: string;
    computeMethod?: ComputeMethod;
    modelAreaId?: string | null;
    modelArea?: ModelArea;
    analogueModelId?: string | null;
    analogueModel?: AnalogueModel;
    computeCaseInputValues?: Array<ComputeCaseInputValue> | null;
    inputSettingValues?: Array<InputSettingValue> | null;
    computeJobs?: Array<ComputeJob> | null;
    jobs?: Array<Job> | null;
    variogramEstimationResults?: Array<VariogramResult> | null;
    channelEstimationResult?: ChannelResult;
};

