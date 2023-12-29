/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListComputeSettingsQueryResponse } from '../models/ListComputeSettingsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ComputeSettingsService {

    /**
     * @returns ListComputeSettingsQueryResponse Success
     * @throws ApiError
     */
    public static getApiComputeSettings(): CancelablePromise<ListComputeSettingsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/compute-settings',
        });
    }

}
