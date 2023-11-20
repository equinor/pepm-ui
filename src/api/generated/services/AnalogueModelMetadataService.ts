/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelMetadataCommandForm } from '../models/AddAnalogueModelMetadataCommandForm';
import type { AddAnalogueModelMetadataCommandResponse } from '../models/AddAnalogueModelMetadataCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelMetadataService {

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelMetadataCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsMetadata(
        id: string,
        requestBody?: AddAnalogueModelMetadataCommandForm,
    ): CancelablePromise<AddAnalogueModelMetadataCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/metadata',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
