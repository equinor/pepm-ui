import {
  AnalogueModelSourceType,
  ComputeJobStatus,
  ModelAreaTypeDto,
  UploadFileCategory,
  UploadFileType,
  UploadStatus,
} from '../../../api/generated';

export const modelId = '1234-5678-9010';

export const defaultArea: ModelAreaTypeDto = {
  description: 'A test area',
  modelAreaTypeId: '1111-2222-3333',
  name: 'Test area',
};

export const mockedComputeCase = {
  computeCaseId: 'string',
  computeMethod: {
    computeMethodId: 'string',
    name: 'string',
  },
  modelArea: {
    modelAreaId: 'string',
    name: 'Test area',
  },
  inputSettings: [
    {
      inputSettingValueId: 'string',
      inputSettingTypeId: 'string',
      valueName: 'string',
      typeName: 'string',
    },
  ],
  jobStatus: ComputeJobStatus.SUCCEEDED,
};

export const mockedModelAreaType = [
  {
    modelAreaTypeId: 'string',
    name: 'string',
    description: 'string',
  },
  {
    modelAreaTypeId: 'string1',
    name: 'string1',
    description: 'string1',
  },
];

export const mockAnalogueModelDetail = {
  analogueModelId: '1234-5678-9010',
  name: 'string',
  description: 'string',
  isProcessed: true,
  sourceType: AnalogueModelSourceType.RES_QML,
  analogues: [
    {
      analogueId: 'test2',
      name: 'string',
      description: 'string',
    },
  ],
  fileUploads: [
    {
      uploadId: 'string',
      analogueModelId: 'string',
      originalFileName: 'string',
      uploadStatus: UploadStatus.COMPLETED,
      uploadFileType: UploadFileType.NET_CDF,
      uploadFileCategory: UploadFileCategory.INPUT_METADATA,
    },
  ],
  parameters: [
    {
      parameterId: 'string',
      identifier: 'string',
      name: 'string',
      description: 'string',
    },
  ],
  metadata: [
    {
      metadataId: 'string',
      metadataType: 'string',
      value: 'string',
    },
  ],
  modelAreas: [
    {
      modelAreaId: 'string',
      modelAreaType: 'string',
      coordinates: [
        {
          x: 100,
          y: 200,
          m: 0,
        },
        {
          x: 100,
          y: 200,
          m: 1,
        },
      ],
    },
  ],
};
