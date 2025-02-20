/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetObjectResultsByModelIdQueryResponse } from '../models/GetObjectResultsByModelIdQueryResponse';
import type { GetVariogramResultsByModelIdQueryResponse } from '../models/GetVariogramResultsByModelIdQueryResponse';
import type { UpdateObjectResultCommandBody } from '../models/UpdateObjectResultCommandBody';
import type { UpdateObjectResultCommandResponse } from '../models/UpdateObjectResultCommandResponse';
import type { UpdateVariogramResultCommandBody } from '../models/UpdateVariogramResultCommandBody';
import type { UpdateVariogramResultCommandResponse } from '../models/UpdateVariogramResultCommandResponse';

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
    public static getApiV1AnalogueModelsResultsObject(
        id: string,
    ): CancelablePromise<GetObjectResultsByModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analogue-models/{id}/results/object',
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
    public static getApiV1AnalogueModelsResultsVariogram(
        id: string,
    ): CancelablePromise<GetVariogramResultsByModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analogue-models/{id}/results/variogram',
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
     * @param id
     * @param objectId
     * @param requestBody
     * @returns UpdateObjectResultCommandResponse Success
     * @throws ApiError
     */
    public static putApiV1AnalogueModelsResultsObject(
        id: string,
        objectId: string,
        requestBody?: UpdateObjectResultCommandBody,
    ): CancelablePromise<UpdateObjectResultCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/analogue-models/{id}/results/object/{objectId}',
            path: {
                'id': id,
                'objectId': objectId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param computeCaseId
     * @param requestBody
     * @returns UpdateVariogramResultCommandResponse Success
     * @throws ApiError
     */
    public static putApiV1AnalogueModelsComputecasesResults(
        id: string,
        computeCaseId: string,
        requestBody?: UpdateVariogramResultCommandBody,
    ): CancelablePromise<UpdateVariogramResultCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/analogue-models/{id}/computecases/{computeCaseId}/results',
            path: {
                'id': id,
                'computeCaseId': computeCaseId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
