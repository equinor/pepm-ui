/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAnalogueCommand } from '../models/CreateAnalogueCommand';
import type { CreateAnalogueCommandResponse } from '../models/CreateAnalogueCommandResponse';
import type { GetAnalogueListQueryResponse } from '../models/GetAnalogueListQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnaloguesService {
  /**
   * @returns GetAnalogueListQueryResponse Success
   * @throws ApiError
   */
  public static getApiAnalogues(): CancelablePromise<GetAnalogueListQueryResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/analogues',
    });
  }

  /**
   * @param requestBody
   * @returns CreateAnalogueCommandResponse Success
   * @throws ApiError
   */
  public static postApiAnalogues(
    requestBody?: CreateAnalogueCommand,
  ): CancelablePromise<CreateAnalogueCommandResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/analogues',
      body: requestBody,
      mediaType: 'application/json-patch+json',
    });
  }
}
