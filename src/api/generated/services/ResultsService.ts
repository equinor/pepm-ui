/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetObjectResultsByModelIdQueryResponse } from '../models/GetObjectResultsByModelIdQueryResponse';
import type { GetVariogramResultsByModelIdQueryResponse } from '../models/GetVariogramResultsByModelIdQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResultsService {

    /**
     * Returns channel estimation results
     * @param id
     * @returns GetObjectResultsByModelIdQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsResultsObject(
        id: string,
    ): CancelablePromise<GetObjectResultsByModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}/results/object',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Returns variogram estimation results
     * @param id
     * @returns GetVariogramResultsByModelIdQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsResultsVariogram(
        id: string,
    ): CancelablePromise<GetVariogramResultsByModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}/results/variogram',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
