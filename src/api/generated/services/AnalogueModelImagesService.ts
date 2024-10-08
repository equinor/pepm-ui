/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { GetImageMetadataCommandResponse } from '../models/GetImageMetadataCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelImagesService {

    /**
     * @param analogueModelId
     * @param imageId
     * @returns File Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsImages(
        analogueModelId: string,
        imageId: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{analogueModelId}/images/{imageId}',
            path: {
                'analogueModelId': analogueModelId,
                'imageId': imageId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param analogueModelId
     * @param imageId
     * @returns GetImageMetadataCommandResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsImagesMetadata(
        analogueModelId: string,
        imageId: string,
    ): CancelablePromise<GetImageMetadataCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{analogueModelId}/images/{imageId}/metadata',
            path: {
                'analogueModelId': analogueModelId,
                'imageId': imageId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
