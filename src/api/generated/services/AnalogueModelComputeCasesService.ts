/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelParameterCommandResponse } from '../models/AddAnalogueModelParameterCommandResponse';
import type { CreateComputeCaseCommandForm } from '../models/CreateComputeCaseCommandForm';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelComputeCasesService {

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelParameterCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsComputeCases(
        id: string,
        requestBody?: CreateComputeCaseCommandForm,
    ): CancelablePromise<AddAnalogueModelParameterCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/compute-cases',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param id
     * @returns AddAnalogueModelParameterCommandResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsComputeCases(
        id: string,
    ): CancelablePromise<AddAnalogueModelParameterCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}/compute-cases',
            path: {
                'id': id,
            },
        });
    }

}
