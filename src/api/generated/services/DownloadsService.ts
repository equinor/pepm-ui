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
    public static getApiDownloadsResqml(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/downloads/{id}/resqml',
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
    public static getApiDownloadsIni(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/downloads/{id}/ini',
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
    public static getApiDownloadsNc(
        id: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/downloads/{id}/nc',
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
    ): CancelablePromise<File> {
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
