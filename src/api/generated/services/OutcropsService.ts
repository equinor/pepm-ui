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
    public static getApiV1Outcrops(): CancelablePromise<GetOutcropsCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/outcrops',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
