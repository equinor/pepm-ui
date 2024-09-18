/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMetadataCommandForm } from '../models/CreateMetadataCommandForm';
import type { CreateMetadataCommandResponse } from '../models/CreateMetadataCommandResponse';
import type { ListAllQueryResponse } from '../models/ListAllQueryResponse';
import type { ListCountriesQueryResponse } from '../models/ListCountriesQueryResponse';
import type { ListFieldsQueryResponse } from '../models/ListFieldsQueryResponse';
import type { ListGeoStandardsQueryResponse } from '../models/ListGeoStandardsQueryResponse';
import type { ListMetadataQueryResponse } from '../models/ListMetadataQueryResponse';
import type { ListStratColumnQueryResponse } from '../models/ListStratColumnQueryResponse';
import type { ListStratUnitsQueryResponse } from '../models/ListStratUnitsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetadataService {

    /**
     * @returns ListMetadataQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadata(): CancelablePromise<ListMetadataQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @deprecated
     * Creates new metadata of a specific metadata type (ex. field)
     * @param requestBody
     * @returns CreateMetadataCommandResponse Success
     * @throws ApiError
     */
    public static postApiMetadata(
        requestBody?: CreateMetadataCommandForm,
    ): CancelablePromise<CreateMetadataCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/metadata',
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
     * @returns ListAllQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadata(): CancelablePromise<ListAllQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ListCountriesQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadataCountries(): CancelablePromise<ListCountriesQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata/countries',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param countryId
     * @returns ListFieldsQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadataFields(
        countryId?: string,
    ): CancelablePromise<ListFieldsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata/fields',
            query: {
                'countryId': countryId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param countryId
     * @returns ListStratColumnQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadataStratigraphicColumns(
        countryId?: string,
    ): CancelablePromise<ListStratColumnQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata/stratigraphic-columns',
            query: {
                'countryId': countryId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param stratUnitParentId
     * @param stratColumnId
     * @returns ListStratUnitsQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadataStratigraphicUnits(
        stratUnitParentId?: string,
        stratColumnId?: string,
    ): CancelablePromise<ListStratUnitsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata/stratigraphic-units',
            query: {
                'stratUnitParentId': stratUnitParentId,
                'stratColumnId': stratColumnId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @param parentId
     * @returns ListGeoStandardsQueryResponse Success
     * @throws ApiError
     */
    public static getApiMetadataSmdaMetadataGeologyStandards(
        parentId?: string,
    ): CancelablePromise<ListGeoStandardsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/metadata/smda-metadata/geology-standards',
            query: {
                'parentId': parentId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
