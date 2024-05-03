/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryDto } from './CountryDto';
import type { FieldDto } from './FieldDto';
import type { GeologicalStandardDto } from './GeologicalStandardDto';
import type { StratColumnDto } from './StratColumnDto';
import type { StratUnitDto } from './StratUnitDto';

export type ListAllQueryResponse = {
    countries?: Array<CountryDto> | null;
    fields?: Array<FieldDto> | null;
    stratUnits?: Array<StratUnitDto> | null;
    stratColumns?: Array<StratColumnDto> | null;
    geologicalStandards?: Array<GeologicalStandardDto> | null;
};

