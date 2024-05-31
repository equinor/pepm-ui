/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GeologicalStandardDto } from './GeologicalStandardDto';

export type GeologicalGroupDto = {
    geologicalGroupId: string;
    grossDepEnv: GeologicalStandardDto;
    depEnv: GeologicalStandardDto;
    subenv: GeologicalStandardDto;
    architecturalElements: Array<GeologicalStandardDto>;
};

