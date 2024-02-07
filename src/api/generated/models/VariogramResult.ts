/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeCase } from './ComputeCase';
import type { Geometry } from './Geometry';
import type { VariogramResultFile } from './VariogramResultFile';

export type VariogramResult = {
    createdBy?: string | null;
    createdDate?: string;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string;
    variogramResultId?: string;
    computeCaseId?: string;
    computeCase?: ComputeCase;
    identifier?: number;
    fileDirectory?: string | null;
    variogramResultFiles?: Array<VariogramResultFile> | null;
    rmajor?: number;
    rminor?: number;
    azimuth?: number;
    rvertical?: number;
    sigma?: number;
    quality?: number;
    family?: string | null;
    archelFilter?: string | null;
    indicator?: string | null;
    attribute?: string | null;
    box?: Array<Geometry> | null;
};

