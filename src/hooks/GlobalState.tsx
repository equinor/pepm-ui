/* eslint-disable max-lines-per-function */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  AnalogueModelDetail,
  AnalogueModelSourceType,
  ComputeCaseDto,
  CountryDto,
  FieldDto,
  FileType,
  GeologicalGroupDto,
  GeologicalStandardDto,
  GetObjectResultsDto,
  GetVariogramResultsDto,
  ImageMetadataDto,
  JobStatus,
  ListComputeSettingsMethodDto,
  ModelAreaDto,
  ModelAreaTypeDto,
  OutcropDto,
  StratColumnDto,
  StratigraphicGroupDto,
  StratUnitDto,
} from '../api/generated';

export const analogueModelDefault: AnalogueModelDetail = {
  analogueModelId: '',
  name: '',
  description: '',
  createdBy: '',
  createdDate: '',
  lastModifiedBy: '',
  lastModifiedDate: '',
  isProcessed: false,
  sourceType: AnalogueModelSourceType.DELTARES,
  fileUploads: [],
  parameters: [],
  metadata: [],
  modelAreas: [],
  stratigraphicGroups: [],
  geologicalGroups: [],
  outcrops: [],
  analogueModelImage: {
    analogueModelImageId: '',
    fileName: '',
    type: FileType.JPG,
  },
  iniParameters: {},
  processingStatus: JobStatus.UNKNOWN,
};

type IPepmContext = {
  analogueModel: AnalogueModelDetail;
  analogueModelImageURL: string;
  analogueModelImageMetadata?: ImageMetadataDto;
  computeCases: ComputeCaseDto[];
  modelAreaTypes: ModelAreaTypeDto[];
  outcrops: OutcropDto[];
  countries: CountryDto[];
  fields: FieldDto[];
  stratigraphicColumns: StratColumnDto[];
  stratigraphicUnits: StratUnitDto[];
  geologyStandards: GeologicalStandardDto[];
  computeSettings: ListComputeSettingsMethodDto[];
  objectResults: GetObjectResultsDto[];
  variogramResults: GetVariogramResultsDto[];
};

type IPepmContextActions = {
  setAnalogueModel: (analogueModel: AnalogueModelDetail) => void;
  setAnalogueModelDefault: () => void;
  setAnalogueModelImage: (image: string) => void;
  setAnalogueModelImageMetadata: (imageMetadata: ImageMetadataDto) => void;
  addAnalogueModelStratGroup: (stratGroup: StratigraphicGroupDto) => void;
  deleteAnalogueModelStratGroup: (id: string) => void;
  addAnalogueModelArea: (modelArea: ModelAreaDto) => void;
  updateAnalogueModelArea: (modelArea: ModelAreaDto) => void;
  deleteAnalogueModelArea: (id: string) => void;
  addAnalogueModelGde: (gde: GeologicalGroupDto) => void;
  deleteAnalogueModelGde: (id: string) => void;
  addAnalogueModelOutcrop: (outcrop: OutcropDto) => void;
  deleteAnalogueModelOutcrop: (id: string) => void;
  setComputeCases: (computeCases: ComputeCaseDto[]) => void;
  setComputeCasesDefault: () => void;
  setModelAreaTypes: (modelAreaTypes: ModelAreaTypeDto[]) => void;
  setOutcrops: (outcrops: OutcropDto[]) => void;
  setCountries: (countries: CountryDto[]) => void;
  setFields: (fields: FieldDto[]) => void;
  setStratigraphicColumns: (fields: StratColumnDto[]) => void;
  setStratigraphicUnits: (fields: StratUnitDto[]) => void;
  setGeologicalStandards: (geologyStandards: GeologicalStandardDto[]) => void;
  setComputeSettings: (computeSettings: ListComputeSettingsMethodDto[]) => void;
  setObjectEstimationResults: (objectResults: GetObjectResultsDto[]) => void;
  setVariogramResults: (variogramResults: GetVariogramResultsDto[]) => void;
};

export const usePepmContextStore = create<IPepmContext & IPepmContextActions>()(
  immer((set, get) => ({
    analogueModel: analogueModelDefault,
    analogueModelImageURL: '',
    computeCases: [],
    modelAreaTypes: [],
    outcrops: [],
    countries: [],
    fields: [],
    stratigraphicColumns: [],
    stratigraphicUnits: [],
    geologyStandards: [],
    computeSettings: [],
    objectResults: [],
    variogramResults: [],
    setAnalogueModel: (analogueModel: AnalogueModelDetail) =>
      set((state) => {
        state.analogueModel = analogueModel;
      }),
    setAnalogueModelDefault: () =>
      set((state) => {
        state.analogueModel = analogueModelDefault;
        state.analogueModelImageURL = '';
        state.analogueModelImageMetadata = undefined;
        state.stratigraphicColumns = [];
        state.geologyStandards = [];
        state.computeCases = [];
        state.computeSettings = [];
        state.objectResults = [];
        state.variogramResults = [];
      }),
    setAnalogueModelImage: (image: string) =>
      set((state) => {
        state.analogueModelImageURL = image;
      }),
    setAnalogueModelImageMetadata: (imageMetadata: ImageMetadataDto) =>
      set((state) => {
        state.analogueModelImageMetadata = imageMetadata;
      }),
    addAnalogueModelStratGroup: (stratGroup: StratigraphicGroupDto) =>
      set((state) => {
        state.analogueModel.stratigraphicGroups.push(stratGroup);
      }),
    deleteAnalogueModelStratGroup: (id: string) =>
      set((state) => {
        state.analogueModel.stratigraphicGroups =
          state.analogueModel.stratigraphicGroups.filter(
            (stratGroup) => stratGroup.stratigraphicGroupId !== id,
          );
      }),
    addAnalogueModelGde: (gde: GeologicalGroupDto) =>
      set((state) => {
        state.analogueModel.geologicalGroups.push(gde);
      }),
    deleteAnalogueModelGde: (id: string) =>
      set((state) => {
        state.analogueModel.geologicalGroups =
          state.analogueModel.geologicalGroups.filter(
            (gde) => gde.geologicalGroupId !== id,
          );
      }),
    addAnalogueModelOutcrop: (outcrop: OutcropDto) =>
      set((state) => {
        state.analogueModel.outcrops.push(outcrop);
      }),
    deleteAnalogueModelOutcrop: (id: string) =>
      set((state) => {
        state.analogueModel.outcrops = state.analogueModel.outcrops.filter(
          (outcrop) => outcrop.outcropId !== id,
        );
      }),
    addAnalogueModelArea: (modelArea: ModelAreaDto) =>
      set((state) => {
        state.analogueModel.modelAreas.push(modelArea);
      }),
    updateAnalogueModelArea: (modelArea: ModelAreaDto) =>
      set((state) => {
        state.analogueModel.modelAreas = state.analogueModel.modelAreas.map(
          (ma) => (ma.modelAreaId !== modelArea.modelAreaId ? ma : modelArea),
        );
      }),
    deleteAnalogueModelArea: (id: string) =>
      set((state) => {
        state.analogueModel.modelAreas = state.analogueModel.modelAreas.filter(
          (ma) => ma.modelAreaId !== id,
        );
      }),
    setComputeCases: (computeCases: ComputeCaseDto[]) =>
      set((state) => {
        state.computeCases = computeCases;
      }),
    setComputeCasesDefault: () =>
      set((state) => {
        state.computeCases = [];
      }),
    setModelAreaTypes: (modelAreaTypes: ModelAreaTypeDto[]) =>
      set((state) => {
        state.modelAreaTypes = modelAreaTypes;
      }),
    setOutcrops: (outcrops: OutcropDto[]) =>
      set((state) => {
        state.outcrops = outcrops;
      }),
    setCountries: (countries: CountryDto[]) =>
      set((state) => {
        state.countries = countries;
      }),
    setFields: (fields: FieldDto[]) =>
      set((state) => {
        state.fields = fields;
      }),
    setStratigraphicColumns: (stratigraphicColumns: StratColumnDto[]) =>
      set((state) => {
        state.stratigraphicColumns = stratigraphicColumns;
      }),
    setStratigraphicUnits: (stratigraphicUnits: StratUnitDto[]) =>
      set((state) => {
        state.stratigraphicUnits = stratigraphicUnits;
      }),
    setGeologicalStandards: (geologyStandards: GeologicalStandardDto[]) =>
      set((state) => {
        state.geologyStandards = geologyStandards;
      }),
    setComputeSettings: (computeSettings: ListComputeSettingsMethodDto[]) =>
      set((state) => {
        state.computeSettings = computeSettings;
      }),
    setObjectEstimationResults: (objectResults: GetObjectResultsDto[]) =>
      set((state) => {
        state.objectResults = objectResults;
      }),
    setVariogramResults: (variogramResults: GetVariogramResultsDto[]) =>
      set((state) => {
        state.variogramResults = variogramResults;
      }),
  })),
);
