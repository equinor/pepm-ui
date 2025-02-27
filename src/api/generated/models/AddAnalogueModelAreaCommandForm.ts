/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CoordinateDto } from './CoordinateDto';

export type AddAnalogueModelAreaCommandForm = {
    expand?: string | null;
    isProcessed?: boolean | null;
    stratigraphicGroupsCountryIdentifier?: string | null;
    stratigraphicGroupsFieldIdentifier?: string | null;
    stratigraphicGroupsStratColumnIdentifier?: string | null;
    stratigraphicGroupsStratUnitIdentifier?: string | null;
    outcropsName?: string | null;
    modelAreaTypeId: string;
    coordinates: Array<CoordinateDto>;
};

