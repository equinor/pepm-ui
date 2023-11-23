/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelAnalogueCommandForm } from '../models/AddAnalogueModelAnalogueCommandForm';
import type { AddAnalogueModelAnalogueCommandResponse } from '../models/AddAnalogueModelAnalogueCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelAnaloguesService {

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelAnalogueCommandResponse Success
     * @throws ApiError
     */
    public static putApiAnalogueModelsAnalogues(
        id: string,
        requestBody?: AddAnalogueModelAnalogueCommandForm,
    ): CancelablePromise<AddAnalogueModelAnalogueCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/analogue-models/{id}/analogues',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
