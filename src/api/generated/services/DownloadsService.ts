/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DownloadsService {

    /**
     * @param id
     * @returns File Success
     * @throws ApiError
     */
    public static getApiDownloads(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/downloads/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param analogueModelIds
     * @returns File Success
     * @throws ApiError
     */
    public static getApiDownloadsAnalogueModelsExcel(
        analogueModelIds?: Array<string>,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/downloads/analogue-models-excel',
            query: {
                'AnalogueModelIds': analogueModelIds,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
