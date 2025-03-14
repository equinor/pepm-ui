/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConvertAnalogueModelCommand } from '../models/ConvertAnalogueModelCommand';
import type { ConvertAnalogueModelCommandResponse } from '../models/ConvertAnalogueModelCommandResponse';
import type { EstimateObjectCommand } from '../models/EstimateObjectCommand';
import type { EstimateObjectCommandResponse } from '../models/EstimateObjectCommandResponse';
import type { EstimateVariogramCommand } from '../models/EstimateVariogramCommand';
import type { EstimateVariogramCommandResponse } from '../models/EstimateVariogramCommandResponse';
import type { GenerateThumbnailCommand } from '../models/GenerateThumbnailCommand';
import type { GenerateThumbnailCommandResponse } from '../models/GenerateThumbnailCommandResponse';
import type { GetCurrentJobStatusCommandResponse } from '../models/GetCurrentJobStatusCommandResponse';
import type { GetCurrentJobStatusListCommand } from '../models/GetCurrentJobStatusListCommand';
import type { GetJobDetailQueryResponse } from '../models/GetJobDetailQueryResponse';
import type { GetJobListQueryResponse } from '../models/GetJobListQueryResponse';
import type { PostCancelJobCommand } from '../models/PostCancelJobCommand';
import type { PostCancelJobCommandResponse } from '../models/PostCancelJobCommandResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JobsService {

    /**
     * @returns GetJobListQueryResponse Success
     * @throws ApiError
     */
    public static getApiV1Jobs(): CancelablePromise<GetJobListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/jobs',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @returns GetJobDetailQueryResponse Success
     * @throws ApiError
     */
    public static getApiV1Jobs1(
        id: string,
    ): CancelablePromise<GetJobDetailQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/jobs/{id}',
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
     * Get current job status for job. This will fetch current status from underlying compute engine and update the status for the supplied Job Id.
     * @param id
     * @returns GetCurrentJobStatusCommandResponse Success
     * @throws ApiError
     */
    public static getApiV1JobsStatus(
        id: string,
    ): CancelablePromise<GetCurrentJobStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/jobs/{id}/status',
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
     * Get current job status for all jobs. This will fetch current status from underlying compute engine and update the status for all matching Jobs.
     * @returns GetCurrentJobStatusListCommand Success
     * @throws ApiError
     */
    public static getApiV1JobsStatus1(): CancelablePromise<GetCurrentJobStatusListCommand> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/jobs/status',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Cancel the running job.
     * @param requestBody
     * @returns PostCancelJobCommandResponse Accepted
     * @throws ApiError
     */
    public static postApiV1JobsCancel(
        requestBody?: PostCancelJobCommand,
    ): CancelablePromise<PostCancelJobCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/jobs/cancel',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Convert AnalogueModels to the internal format used by PEPM in order to perform calculations.
     * @param requestBody
     * @returns ConvertAnalogueModelCommandResponse Accepted
     * @throws ApiError
     */
    public static postApiV1JobsComputeModelConversions(
        requestBody?: ConvertAnalogueModelCommand,
    ): CancelablePromise<ConvertAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/jobs/compute/model-conversions',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Estimate channel on a Deltares based model.
     * @param requestBody
     * @returns EstimateObjectCommandResponse Accepted
     * @throws ApiError
     */
    public static postApiV1JobsComputeObjectEstimations(
        requestBody?: EstimateObjectCommand,
    ): CancelablePromise<EstimateObjectCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/jobs/compute/object-estimations',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Estimate channel on a Deltares based model.
     * @param requestBody
     * @returns EstimateVariogramCommandResponse Accepted
     * @throws ApiError
     */
    public static postApiV1JobsComputeVariogramEstimations(
        requestBody?: EstimateVariogramCommand,
    ): CancelablePromise<EstimateVariogramCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/jobs/compute/variogram-estimations',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Generate thumbnail for processed analogue model.
     * @param requestBody
     * @returns GenerateThumbnailCommandResponse Accepted
     * @throws ApiError
     */
    public static postApiV1JobsComputeThumbnailGen(
        requestBody?: GenerateThumbnailCommand,
    ): CancelablePromise<GenerateThumbnailCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/jobs/compute/thumbnail-gen',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

}
