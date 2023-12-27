/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateChannelEstimationStatusCommand } from '../models/UpdateChannelEstimationStatusCommand';
import type { UpdateChannelEstimationStatusCommandResponse } from '../models/UpdateChannelEstimationStatusCommandResponse';
import type { UpdateJobStatusCommand } from '../models/UpdateJobStatusCommand';
import type { UpdateJobStatusCommandResponse } from '../models/UpdateJobStatusCommandResponse';

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
     * @returns UpdateChannelEstimationStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksChannestStatus(
        requestBody?: UpdateChannelEstimationStatusCommand,
    ): CancelablePromise<UpdateChannelEstimationStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/channest/status',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
