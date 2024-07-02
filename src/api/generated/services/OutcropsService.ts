/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetOutcropsCommandResponse } from '../models/GetOutcropsCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OutcropsService {

    /**
     * @returns GetOutcropsCommandResponse Success
     * @throws ApiError
     */
    public static getApiOutcrops(): CancelablePromise<GetOutcropsCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/outcrops',
        });
    }

}
