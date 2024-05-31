/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryDto } from './CountryDto';
import type { FieldDto } from './FieldDto';
import type { StratColumnDto } from './StratColumnDto';
import type { StratUnitDto } from './StratUnitDto';

export type StratigraphicGroupDto = {
    stratigraphicGroupId: string;
    country: CountryDto;
    field: FieldDto;
    stratColumn: StratColumnDto;
    stratUnits: Array<StratUnitDto>;
};

