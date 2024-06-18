/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateJobStatusCommand } from '../models/UpdateJobStatusCommand';
import type { UpdateJobStatusCommandResponse } from '../models/UpdateJobStatusCommandResponse';
import type { UpdateObjectEstimationStatusCommand } from '../models/UpdateObjectEstimationStatusCommand';
import type { UpdateObjectEstimationStatusCommandResponse } from '../models/UpdateObjectEstimationStatusCommandResponse';
import type { UpdateVariogramEstimationStatusCommand } from '../models/UpdateVariogramEstimationStatusCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebhooksService {

    /**
     * Update current job status for job. This will fetch current status from underlying compute engine and update the status for the supplied Job Name.
     * @param requestBody
     * @returns UpdateJobStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksNrresqmlStatus(
        requestBody?: UpdateJobStatusCommand,
    ): CancelablePromise<UpdateJobStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/nrresqml/status',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody
     * @returns UpdateObjectEstimationStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksChannestStatus(
        requestBody?: UpdateObjectEstimationStatusCommand,
    ): CancelablePromise<UpdateObjectEstimationStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/channest/status',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody
     * @returns UpdateObjectEstimationStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksVargrestStatus(
        requestBody?: UpdateVariogramEstimationStatusCommand,
    ): CancelablePromise<UpdateObjectEstimationStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/vargrest/status',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
