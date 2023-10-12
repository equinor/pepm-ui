/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUploadDetailQueryResponse } from '../models/GetUploadDetailQueryResponse';
import type { GetUploadListQueryResponse } from '../models/GetUploadListQueryResponse';
import type { UploadAnalogueModelCommandResponse } from '../models/UploadAnalogueModelCommandResponse';
import type { UploadFileType } from '../models/UploadFileType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UploadsService {
  /**
   * @returns GetUploadListQueryResponse Success
   * @throws ApiError
   */
  public static getApiUploads(): CancelablePromise<GetUploadListQueryResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/uploads',
    });
  }

  /**
   * @param id
   * @returns GetUploadDetailQueryResponse Success
   * @throws ApiError
   */
  public static getApiUploads1(
    id: string,
  ): CancelablePromise<GetUploadDetailQueryResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/uploads/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * Upload model files that later can be converted to PEPM models.
   * @param formData
   * @returns UploadAnalogueModelCommandResponse Success
   * @throws ApiError
   */
  public static postApiUploadsModels(formData?: {
    ModelId?: string;
    File?: Blob;
    FileType?: UploadFileType;
  }): CancelablePromise<UploadAnalogueModelCommandResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/uploads/models',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
}
