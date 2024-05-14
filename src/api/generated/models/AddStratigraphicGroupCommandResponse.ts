/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StratigraphicGroupDto } from './StratigraphicGroupDto';

export type AddStratigraphicGroupCommandResponse = {
    success?: boolean;
    count?: number | null;
    message?: string | null;
    validationErrors?: Array<string> | null;
    data: StratigraphicGroupDto;
};

