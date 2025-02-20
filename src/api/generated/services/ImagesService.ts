/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImagesService {

    /**
     * @param imageId
     * @returns File Success
     * @throws ApiError
     */
    public static getApiV1ImagesVariogram(
        imageId: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/images/variogram/{imageId}',
            path: {
                'imageId': imageId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
