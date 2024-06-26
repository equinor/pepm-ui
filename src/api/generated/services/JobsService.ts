/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConvertAnalogueModelCommand } from '../models/ConvertAnalogueModelCommand';
import type { EstimateObjectCommand } from '../models/EstimateObjectCommand';
import type { EstimateVariogramCommand } from '../models/EstimateVariogramCommand';
import type { GetCurrentJobStatusCommandResponse } from '../models/GetCurrentJobStatusCommandResponse';
import type { GetCurrentJobStatusListCommand } from '../models/GetCurrentJobStatusListCommand';
import type { GetJobDetailQueryResponse } from '../models/GetJobDetailQueryResponse';
import type { GetJobListQueryResponse } from '../models/GetJobListQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JobsService {

    /**
     * @returns GetJobListQueryResponse Success
     * @throws ApiError
     */
    public static getApiJobs(): CancelablePromise<GetJobListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/jobs',
        });
    }

    /**
     * @param id
     * @returns GetJobDetailQueryResponse Success
     * @throws ApiError
     */
    public static getApiJobs1(
        id: string,
    ): CancelablePromise<GetJobDetailQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/jobs/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get current job status for job. This will fetch current status from underlying compute engine and update the status for the supplied Job Id.
     * @param id
     * @returns GetCurrentJobStatusCommandResponse Success
     * @throws ApiError
     */
    public static getApiJobsStatus(
        id: string,
    ): CancelablePromise<GetCurrentJobStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/jobs/{id}/status',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get current job status for all jobs. This will fetch current status from underlying compute engine and update the status for all matching Jobs.
     * @returns GetCurrentJobStatusListCommand Success
     * @throws ApiError
     */
    public static getApiJobsStatus1(): CancelablePromise<GetCurrentJobStatusListCommand> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/jobs/status',
        });
    }

    /**
     * Convert AnalogueModels to the internal format used by PEPM in order to perform calculations.
     * @param requestBody
     * @returns any Accepted
     * @throws ApiError
     */
    public static postApiJobsComputeModelConversions(
        requestBody?: ConvertAnalogueModelCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/jobs/compute/model-conversions',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Estimate channel on a Deltares based model.
     * @param requestBody
     * @returns any Accepted
     * @throws ApiError
     */
    public static postApiJobsComputeObjectEstimations(
        requestBody?: EstimateObjectCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/jobs/compute/object-estimations',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Estimate channel on a Deltares based model.
     * @param requestBody
     * @returns any Accepted
     * @throws ApiError
     */
    public static postApiJobsComputeVariogramEstimations(
        requestBody?: EstimateVariogramCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/jobs/compute/variogram-estimations',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
