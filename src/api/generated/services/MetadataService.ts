/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMetadataCommandForm } from '../models/CreateMetadataCommandForm';
import type { ListMetadataQueryResponse } from '../models/ListMetadataQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetadataService {

    /**
     * @returns ListMetadataQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadata(): CancelablePromise<ListMetadataQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata',
        });
    }

    /**
     * Creates new metadata of a specific metadata type (ex. field)
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postApiMetadata(
        requestBody?: CreateMetadataCommandForm,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/metadata',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
