/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetChanelResultsByModelIdQueryResponse } from '../models/GetChanelResultsByModelIdQueryResponse';
import type { GetVariogramResultsByModelIdQueryResponse } from '../models/GetVariogramResultsByModelIdQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResultsService {

    /**
     * Returns channel estimation results
     * @param id
     * @returns GetChanelResultsByModelIdQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsResultsChannel(
        id: string,
    ): CancelablePromise<GetChanelResultsByModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}/results/channel',
            path: {
                'id': id,
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
        });
    }

}
