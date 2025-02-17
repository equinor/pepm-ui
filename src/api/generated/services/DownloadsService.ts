/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DownloadsService {

    /**
     * @param id
     * @returns File Success
     * @throws ApiError
     */
    public static getApiV1DownloadsResqml(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/downloads/{id}/resqml',
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
     * @param id
     * @returns File Success
     * @throws ApiError
     */
    public static getApiV1DownloadsIni(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/downloads/{id}/ini',
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
     * @param id
     * @returns File Success
     * @throws ApiError
     */
    public static getApiV1DownloadsNc(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/downloads/{id}/nc',
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
    public static getApiV1DownloadsAnalogueModelsExcel(
        analogueModelIds?: Array<string>,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/downloads/analogue-models-excel',
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
