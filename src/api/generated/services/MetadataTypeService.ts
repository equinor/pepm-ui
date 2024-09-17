/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListMetadataTypesQueryResponse } from '../models/ListMetadataTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetadataTypeService {

    /**
     * @returns ListMetadataTypesQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadatatype(): CancelablePromise<ListMetadataTypesQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadatatype',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
