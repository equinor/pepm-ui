/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddAnalogueModelAreaCommandForm } from '../models/AddAnalogueModelAreaCommandForm';
import type { AddAnalogueModelAreaCommandResponse } from '../models/AddAnalogueModelAreaCommandResponse';
import type { AddAnalogueModelOutcropForm } from '../models/AddAnalogueModelOutcropForm';
import type { AddAnalogueModelOutcropResponse } from '../models/AddAnalogueModelOutcropResponse';
import type { AddGeologicalGroupCommandResponse } from '../models/AddGeologicalGroupCommandResponse';
import type { AddGeologicalGroupForm } from '../models/AddGeologicalGroupForm';
import type { AddStatigraphicGroupForm } from '../models/AddStatigraphicGroupForm';
import type { AddStratigraphicGroupCommandResponse } from '../models/AddStratigraphicGroupCommandResponse';
import type { CreateAnalogueModelCommand } from '../models/CreateAnalogueModelCommand';
import type { CreateAnalogueModelCommandResponse } from '../models/CreateAnalogueModelCommandResponse';
import type { DeleteGeologicalGroupCommandResponse } from '../models/DeleteGeologicalGroupCommandResponse';
import type { DeleteOutcropResponse } from '../models/DeleteOutcropResponse';
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
     * @param expand
     * @param isProcessed
     * @param stratigraphicGroupsCountryIdentifier
     * @param stratigraphicGroupsFieldIdentifier
     * @param stratigraphicGroupsStratColumnIdentifier
     * @param stratigraphicGroupsStratUnitIdentifier
     * @param outcropsName
     * @returns GetAnalogueModelListQueryResponse Success
     * @throws ApiError
     */
    public static getApiV1AnalogueModels(
        expand?: string,
        isProcessed?: boolean,
        stratigraphicGroupsCountryIdentifier?: string,
        stratigraphicGroupsFieldIdentifier?: string,
        stratigraphicGroupsStratColumnIdentifier?: string,
        stratigraphicGroupsStratUnitIdentifier?: string,
        outcropsName?: string,
    ): CancelablePromise<GetAnalogueModelListQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analogue-models',
            query: {
                'expand': expand,
                'isProcessed': isProcessed,
                'stratigraphicGroupsCountryIdentifier': stratigraphicGroupsCountryIdentifier,
                'stratigraphicGroupsFieldIdentifier': stratigraphicGroupsFieldIdentifier,
                'stratigraphicGroupsStratColumnIdentifier': stratigraphicGroupsStratColumnIdentifier,
                'stratigraphicGroupsStratUnitIdentifier': stratigraphicGroupsStratUnitIdentifier,
                'outcropsName': outcropsName,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Create new Analogue Model
     * @param requestBody
     * @returns CreateAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static postApiV1AnalogueModels(
        requestBody?: CreateAnalogueModelCommand,
    ): CancelablePromise<CreateAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Get AnalogueModel by id
     * @param id
     * @returns GetAnalogueModelQueryResponse Success
     * @throws ApiError
     */
    public static getApiV1AnalogueModels1(
        id: string,
    ): CancelablePromise<GetAnalogueModelQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analogue-models/{id}',
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
     * Patch a AnalogueModel by Id with new values
     * @param id
     * @param requestBody
     * @returns PatchAnalogueModelCommandResponse Success
     * @throws ApiError
     */
    public static patchApiV1AnalogueModels(
        id: string,
        requestBody?: Array<Operation>,
    ): CancelablePromise<PatchAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/analogue-models/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static putApiV1AnalogueModels(
        id: string,
        requestBody?: UpdateAnalogueModelCommandBody,
    ): CancelablePromise<UpdateAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/analogue-models/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static deleteApiV1AnalogueModels(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/analogue-models/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static postApiV1AnalogueModelsInputModels(
        id: string,
        formData?: {
            File: Blob;
            FileType: UploadFileType;
        },
    ): CancelablePromise<UploadAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/input-models',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static postApiV1AnalogueModelsNetcdfModels(
        id: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<UploadAnalogueModelCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/netcdf-models',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelAreaCommandResponse Success
     * @throws ApiError
     */
    public static postApiV1AnalogueModelsModelAreas(
        id: string,
        requestBody?: AddAnalogueModelAreaCommandForm,
    ): CancelablePromise<AddAnalogueModelAreaCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/model-areas',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static putApiV1AnalogueModelsModelAreas(
        id: string,
        modelAreaId: string,
        requestBody?: UpdateAnalogueModelAreaCommandForm,
    ): CancelablePromise<AddAnalogueModelAreaCommandResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/analogue-models/{id}/model-areas/{modelAreaId}',
            path: {
                'id': id,
                'modelAreaId': modelAreaId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns AddAnalogueModelOutcropResponse Success
     * @throws ApiError
     */
    public static postApiV1AnalogueModelsOutcrops(
        id: string,
        requestBody?: AddAnalogueModelOutcropForm,
    ): CancelablePromise<AddAnalogueModelOutcropResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/outcrops',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param id
     * @param outcropId
     * @returns DeleteOutcropResponse Success
     * @throws ApiError
     */
    public static deleteApiV1AnalogueModelsOutcrops(
        id: string,
        outcropId: string,
    ): CancelablePromise<DeleteOutcropResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/analogue-models/{id}/outcrops/{outcropId}',
            path: {
                'id': id,
                'outcropId': outcropId,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static postApiV1AnalogueModelsStratigraphicGroups(
        id: string,
        requestBody?: AddStatigraphicGroupForm,
    ): CancelablePromise<AddStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/stratigraphic-groups',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static postApiV1AnalogueModelsGeologicalGroups(
        id: string,
        requestBody?: AddGeologicalGroupForm,
    ): CancelablePromise<AddGeologicalGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analogue-models/{id}/geological-groups',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static deleteApiV1AnalogueModelsGeologicalGroups(
        analogueModelId: string,
        geologicalGroupId: string,
    ): CancelablePromise<DeleteGeologicalGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/analogue-models/{analogueModelId}/geological-groups/{geologicalGroupId}',
            path: {
                'analogueModelId': analogueModelId,
                'geologicalGroupId': geologicalGroupId,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
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
    public static deleteApiV1AnalogueModelsStratigraphicGroups(
        analogueModelId: string,
        stratigraphicGroupId: string,
    ): CancelablePromise<DeleteStratigraphicGroupCommandResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/analogue-models/{analogueModelId}/stratigraphic-groups/{stratigraphicGroupId}',
            path: {
                'analogueModelId': analogueModelId,
                'stratigraphicGroupId': stratigraphicGroupId,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
