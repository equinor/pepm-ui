/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAnalogueModelCommand } from '../models/CreateAnalogueModelCommand';
import type { CreateAnalogueModelCommandResponse } from '../models/CreateAnalogueModelCommandResponse';
import type { GetAnalogueModelListQueryResponse } from '../models/GetAnalogueModelListQueryResponse';
import type { GetAnalogueModelQueryResponse } from '../models/GetAnalogueModelQueryResponse';
import type { Operation } from '../models/Operation';
import type { PatchAnalogueModelCommandResponse } from '../models/PatchAnalogueModelCommandResponse';
import type { UpdateAnalogueModelCommandBody } from '../models/UpdateAnalogueModelCommandBody';
import type { UpdateAnalogueModelCommandResponse } from '../models/UpdateAnalogueModelCommandResponse';
import type { UploadAnalogueModelCommandResponse } from '../models/UploadAnalogueModelCommandResponse';
import type { UploadFileType } from '../models/UploadFileType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelsService {

    /**
     * Get a list of all AnalogueModels
     * @returns GetAnalogueModelListQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModels(): CancelablePromise<GetAnalogueModelListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models',
        });
    }

    /**
     * Create new Analogue Model
     * @param requestBody 
     * @returns CreateAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModels(
requestBody?: CreateAnalogueModelCommand,
): CancelablePromise<CreateAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get AnalogueModel by id
     * @param id 
     * @returns GetAnalogueModelQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModels1(
id: string,
): CancelablePromise<GetAnalogueModelQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Patch a AnalogueModel by Id with new values
     * @param id 
     * @param requestBody 
     * @returns PatchAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static patchApiAnalogueModels(
id: string,
requestBody?: Array<Operation>,
): CancelablePromise<PatchAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/analogue-models/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Update AnalogueModel by Id
     * @param id 
     * @param requestBody 
     * @returns UpdateAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static putApiAnalogueModels(
id: string,
requestBody?: UpdateAnalogueModelCommandBody,
): CancelablePromise<UpdateAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/analogue-models/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Delete a AnalogueModel by id
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public static deleteApiAnalogueModels(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/analogue-models/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Upload model files that later can be converted to PEPM models.
     * @param id 
     * @param formData 
     * @returns UploadAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsInputModels(
id: string,
formData?: {
File: Blob;
FileType: UploadFileType;
},
): CancelablePromise<UploadAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/input-models',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Upload NetCDF model files that later can be converted to PEPM models.
     * @param id 
     * @param formData 
     * @returns UploadAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsNetcdfModels(
id: string,
formData?: {
file?: Blob;
},
): CancelablePromise<UploadAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/netcdf-models',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
