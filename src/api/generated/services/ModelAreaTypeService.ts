/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListModelAreaTypesQueryResponse } from '../models/ListModelAreaTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ModelAreaTypeService {

    /**
     * @returns ListModelAreaTypesQueryResponse Success
     * @throws ApiError
     */
    public static getApiModelareatype(): CancelablePromise<ListModelAreaTypesQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/modelareatype',
        });
    }

}
