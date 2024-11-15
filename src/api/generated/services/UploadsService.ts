/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUploadDetailQueryResponse } from '../models/GetUploadDetailQueryResponse';
import type { GetUploadListQueryResponse } from '../models/GetUploadListQueryResponse';
import type { MergeModelCommandResponse } from '../models/MergeModelCommandResponse';
import type { PrepareChunkedUploadCommandResponse } from '../models/PrepareChunkedUploadCommandResponse';
import type { UploadAnalogueModelCommandResponse } from '../models/UploadAnalogueModelCommandResponse';
import type { UploadChunkCommandResponse } from '../models/UploadChunkCommandResponse';
import type { UploadFileType } from '../models/UploadFileType';
import type { UploadIniFileCommandResponse } from '../models/UploadIniFileCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UploadsService {

    /**
     * @returns GetUploadListQueryResponse Success
     * @throws ApiError
     */
    public static getApiUploads(): CancelablePromise<GetUploadListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/uploads',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @returns GetUploadDetailQueryResponse Success
     * @throws ApiError
     */
    public static getApiUploads1(
        id: string,
    ): CancelablePromise<GetUploadDetailQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/uploads/{id}',
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
     * Upload model files that later can be converted to PEPM models.
     * @param formData
     * @returns UploadAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiUploadsModels(
        formData?: {
            ModelId: string;
            File: Blob;
            FileType: UploadFileType;
        },
    ): CancelablePromise<UploadAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/uploads/models',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param formData
     * @returns PrepareChunkedUploadCommandResponse Success
     * @throws ApiError
     */
    public static postApiUploadsModelsManifest(
        formData?: {
            ModelId: string;
            FileSize: number;
            FileName: string;
            FileExtension: string;
            FileType: UploadFileType;
        },
    ): CancelablePromise<PrepareChunkedUploadCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/uploads/models/manifest',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param formData
     * @returns UploadChunkCommandResponse Success
     * @throws ApiError
     */
    public static postApiUploadsModelsChunks(
        formData?: {
            ModelId: string;
            UploadId: string;
            Blob: Blob;
            ChunkNumber: number;
        },
    ): CancelablePromise<UploadChunkCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/uploads/models/chunks',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param formData
     * @returns MergeModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiUploadsModelsComplete(
        formData?: {
            ModelId: string;
            UploadId: string;
        },
    ): CancelablePromise<MergeModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/uploads/models/complete',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param formData
     * @returns UploadIniFileCommandResponse Success
     * @throws ApiError
     */
    public static postApiUploadsModelsIniFile(
        id: string,
        formData?: {
            ContentType?: string;
            ContentDisposition?: string;
            Headers?: Record<string, Array<string>>;
            Length?: number;
            Name?: string;
            FileName?: string;
        },
    ): CancelablePromise<UploadIniFileCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/uploads/models/{id}/ini-file',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
