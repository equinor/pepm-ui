/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateJobStatusCommand } from '../models/UpdateJobStatusCommand';
import type { UpdateJobStatusCommandResponse } from '../models/UpdateJobStatusCommandResponse';
import type { UpdateObjectEstimationStatusCommand } from '../models/UpdateObjectEstimationStatusCommand';
import type { UpdateObjectEstimationStatusCommandResponse } from '../models/UpdateObjectEstimationStatusCommandResponse';
import type { UpdateThumbnailGenStatusCommand } from '../models/UpdateThumbnailGenStatusCommand';
import type { UpdateVariogramEstimationStatusCommand } from '../models/UpdateVariogramEstimationStatusCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebhooksService {

    /**
     * Update current job status for job. This will fetch current status from underlying compute engine and update the status for the supplied Job Name.
     * @param xApiVersion
     * @param requestBody
     * @returns UpdateJobStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksNrresqmlStatus(
        xApiVersion?: string,
        requestBody?: UpdateJobStatusCommand,
    ): CancelablePromise<UpdateJobStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/nrresqml/status',
            headers: {
                'X-Api-Version': xApiVersion,
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
     * @param xApiVersion
     * @param requestBody
     * @returns UpdateThumbnailGenStatusCommand Success
     * @throws ApiError
     */
    public static postApiWebhooksThumbnailGenStatus(
        xApiVersion?: string,
        requestBody?: UpdateThumbnailGenStatusCommand,
    ): CancelablePromise<UpdateThumbnailGenStatusCommand> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/thumbnail-gen/status',
            headers: {
                'X-Api-Version': xApiVersion,
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
     * @param xApiVersion
     * @param requestBody
     * @returns UpdateObjectEstimationStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksChannestStatus(
        xApiVersion?: string,
        requestBody?: UpdateObjectEstimationStatusCommand,
    ): CancelablePromise<UpdateObjectEstimationStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/channest/status',
            headers: {
                'X-Api-Version': xApiVersion,
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
     * @param xApiVersion
     * @param requestBody
     * @returns UpdateObjectEstimationStatusCommandResponse Success
     * @throws ApiError
     */
    public static postApiWebhooksVargrestStatus(
        xApiVersion?: string,
        requestBody?: UpdateVariogramEstimationStatusCommand,
    ): CancelablePromise<UpdateObjectEstimationStatusCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhooks/vargrest/status',
            headers: {
                'X-Api-Version': xApiVersion,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

}
