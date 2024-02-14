/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImagesService {

    /**
     * @param imageId
     * @returns binary Success
     * @throws ApiError
     */
    public static getApiImagesVariogram(
        imageId: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/images/variogram/{imageId}',
            path: {
                'imageId': imageId,
            },
        });
    }

}
