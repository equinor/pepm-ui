/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListComputeSettingsQueryResponse } from '../models/ListComputeSettingsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelComputeSettingsService {

    /**
     * @param analogueModelId
     * @returns ListComputeSettingsQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsComputeSettings(
        analogueModelId: string,
    ): CancelablePromise<ListComputeSettingsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{analogueModelId}/compute-settings',
            path: {
                'analogueModelId': analogueModelId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
