/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateParameterCommand } from '../models/CreateParameterCommand';
import type { GetParameterDetailQueryResponse } from '../models/GetParameterDetailQueryResponse';
import type { GetParameterListQueryResponse } from '../models/GetParameterListQueryResponse';
import type { Operation } from '../models/Operation';
import type { PatchParameterCommandResponse } from '../models/PatchParameterCommandResponse';
import type { UpdateParameterCommandBody } from '../models/UpdateParameterCommandBody';
import type { UpdateParameterCommandResponse } from '../models/UpdateParameterCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ParametersService {

    /**
     * Get a list of all Parameters
     * @returns GetParameterListQueryResponse Success
     * @throws ApiError
     */
    public static getApiParameters(): CancelablePromise<GetParameterListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/parameters',
        });
    }

    /**
     * Create new Parameter
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postApiParameters(
        requestBody?: CreateParameterCommand,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/parameters',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get Parameter details by Id
     * @param id
     * @returns GetParameterDetailQueryResponse Success
     * @throws ApiError
     */
    public static getApiParameters1(
        id: string,
    ): CancelablePromise<GetParameterDetailQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/parameters/{id}',
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
     * Patch a Parameter by Id with new values
     * @param id
     * @param requestBody
     * @returns PatchParameterCommandResponse Success
     * @throws ApiError
     */
    public static patchApiParameters(
        id: string,
        requestBody?: Array<Operation>,
    ): CancelablePromise<PatchParameterCommandResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/parameters/{id}',
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
     * Update Parameter by Id
     * @param id
     * @param requestBody
     * @returns UpdateParameterCommandResponse Success
     * @throws ApiError
     */
    public static putApiParameters(
        id: string,
        requestBody?: UpdateParameterCommandBody,
    ): CancelablePromise<UpdateParameterCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/parameters/{id}',
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
     * Delete a parameter by id
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiParameters(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/parameters/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

}
