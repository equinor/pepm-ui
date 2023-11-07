/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelParameterCommandForm } from '../models/AddAnalogueModelParameterCommandForm';
import type { AddAnalogueModelParameterCommandResponse } from '../models/AddAnalogueModelParameterCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelParametersService {

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelParameterCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsParameters(
        id: string,
        requestBody?: AddAnalogueModelParameterCommandForm,
    ): CancelablePromise<AddAnalogueModelParameterCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/parameters',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
