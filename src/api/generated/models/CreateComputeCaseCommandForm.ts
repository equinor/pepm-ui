/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateComputeCaseInputSettingsForm } from './CreateComputeCaseInputSettingsForm';

export type CreateComputeCaseCommandForm = {
    modelAreaId?: string | null;
    computeMethodId: string;
    computeTypeId: string;
    inputSettings: Array<CreateComputeCaseInputSettingsForm>;
};

