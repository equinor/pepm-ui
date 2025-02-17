/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListAllQueryResponse } from '../models/ListAllQueryResponse';
import type { ListCountriesQueryResponse } from '../models/ListCountriesQueryResponse';
import type { ListFieldsQueryResponse } from '../models/ListFieldsQueryResponse';
import type { ListGeoStandardsQueryResponse } from '../models/ListGeoStandardsQueryResponse';
import type { ListStratColumnQueryResponse } from '../models/ListStratColumnQueryResponse';
import type { ListStratUnitsQueryResponse } from '../models/ListStratUnitsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetadataService {

    /**
     * @returns ListAllQueryResponse Success
     * @throws ApiError
     */
    public static getApiV1MetadataSmdaMetadata(): CancelablePromise<ListAllQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata',
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
    public static getApiV1MetadataSmdaMetadataCountries(): CancelablePromise<ListCountriesQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata/countries',
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
    public static getApiV1MetadataSmdaMetadataFields(
        countryId?: string,
    ): CancelablePromise<ListFieldsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata/fields',
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
    public static getApiV1MetadataSmdaMetadataStratigraphicColumns(
        countryId?: string,
    ): CancelablePromise<ListStratColumnQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata/stratigraphic-columns',
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
    public static getApiV1MetadataSmdaMetadataStratigraphicUnits(
        stratUnitParentId?: string,
        stratColumnId?: string,
    ): CancelablePromise<ListStratUnitsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata/stratigraphic-units',
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
    public static getApiV1MetadataSmdaMetadataGeologyStandards(
        parentId?: string,
    ): CancelablePromise<ListGeoStandardsQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metadata/smda-metadata/geology-standards',
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
