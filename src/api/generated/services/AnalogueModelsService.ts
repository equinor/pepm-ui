/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelAreaCommandForm } from '../models/AddAnalogueModelAreaCommandForm';
import type { AddAnalogueModelAreaCommandResponse } from '../models/AddAnalogueModelAreaCommandResponse';
import type { AddAnalogueModelOutcropForm } from '../models/AddAnalogueModelOutcropForm';
import type { AddGeologicalGroupCommandResponse } from '../models/AddGeologicalGroupCommandResponse';
import type { AddGeologicalGroupForm } from '../models/AddGeologicalGroupForm';
import type { AddStatigraphicGroupForm } from '../models/AddStatigraphicGroupForm';
import type { AddStratigraphicGroupCommandResponse } from '../models/AddStratigraphicGroupCommandResponse';
import type { CreateAnalogueModelCommand } from '../models/CreateAnalogueModelCommand';
import type { CreateAnalogueModelCommandResponse } from '../models/CreateAnalogueModelCommandResponse';
import type { DeleteGeologicalGroupCommandResponse } from '../models/DeleteGeologicalGroupCommandResponse';
import type { DeleteStratigraphicGroupCommandResponse } from '../models/DeleteStratigraphicGroupCommandResponse';
import type { GetAnalogueModelListQueryResponse } from '../models/GetAnalogueModelListQueryResponse';
import type { GetAnalogueModelQueryResponse } from '../models/GetAnalogueModelQueryResponse';
import type { Operation } from '../models/Operation';
import type { PatchAnalogueModelCommandResponse } from '../models/PatchAnalogueModelCommandResponse';
import type { UpdateAnalogueModelAreaCommandForm } from '../models/UpdateAnalogueModelAreaCommandForm';
import type { UpdateAnalogueModelCommandBody } from '../models/UpdateAnalogueModelCommandBody';
import type { UpdateAnalogueModelCommandResponse } from '../models/UpdateAnalogueModelCommandResponse';
import type { UploadAnalogueModelCommandResponse } from '../models/UploadAnalogueModelCommandResponse';
import type { UploadFileType } from '../models/UploadFileType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelsService {

    /**
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
            errors: {
                404: `Not Found`,
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
            errors: {
                400: `Bad Request`,
            },
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
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelAreaCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsModelAreas(
        id: string,
        requestBody?: AddAnalogueModelAreaCommandForm,
    ): CancelablePromise<AddAnalogueModelAreaCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/model-areas',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @param id
     * @param modelAreaId
     * @param requestBody
     * @returns AddAnalogueModelAreaCommandResponse Success
     * @throws ApiError
     */
    public static putApiAnalogueModelsModelAreas(
        id: string,
        modelAreaId: string,
        requestBody?: UpdateAnalogueModelAreaCommandForm,
    ): CancelablePromise<AddAnalogueModelAreaCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/analogue-models/{id}/model-areas/{modelAreaId}',
            path: {
                'id': id,
                'modelAreaId': modelAreaId,
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
     * @param id
     * @param requestBody
     * @returns AddStratigraphicGroupCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsOutcrops(
        id: string,
        requestBody?: AddAnalogueModelOutcropForm,
    ): CancelablePromise<AddStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/outcrops',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param outcropId
     * @returns AddStratigraphicGroupCommandResponse Success
     * @throws ApiError
     */
    public static deleteApiAnalogueModelsOutcrops(
        id: string,
        outcropId: string,
    ): CancelablePromise<AddStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/analogue-models/{id}/outcrops/{outcropId}',
            path: {
                'id': id,
                'outcropId': outcropId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns AddStratigraphicGroupCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsStratigraphicGroups(
        id: string,
        requestBody?: AddStatigraphicGroupForm,
    ): CancelablePromise<AddStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/stratigraphic-groups',
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
     * @param id
     * @param requestBody
     * @returns AddGeologicalGroupCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsGeologicalGroups(
        id: string,
        requestBody?: AddGeologicalGroupForm,
    ): CancelablePromise<AddGeologicalGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/geological-groups',
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
     * Deletes a geological group
     * @param analogueModelId
     * @param geologicalGroupId
     * @returns DeleteGeologicalGroupCommandResponse Success
     * @throws ApiError
     */
    public static deleteApiAnalogueModelsGeologicalGroups(
        analogueModelId: string,
        geologicalGroupId: string,
    ): CancelablePromise<DeleteGeologicalGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/analogue-models/{analogueModelId}/geological-groups/{geologicalGroupId}',
            path: {
                'analogueModelId': analogueModelId,
                'geologicalGroupId': geologicalGroupId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Deletes a stratigraphic group
     * @param analogueModelId
     * @param stratigraphicGroupId
     * @returns DeleteStratigraphicGroupCommandResponse Success
     * @throws ApiError
     */
    public static deleteApiAnalogueModelsStratigraphicGroups(
        analogueModelId: string,
        stratigraphicGroupId: string,
    ): CancelablePromise<DeleteStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/analogue-models/{analogueModelId}/stratigraphic-groups/{stratigraphicGroupId}',
            path: {
                'analogueModelId': analogueModelId,
                'stratigraphicGroupId': stratigraphicGroupId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

}
