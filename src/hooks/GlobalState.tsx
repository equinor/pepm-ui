/* eslint-disable max-lines-per-function */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  AnalogueModelDetail,
  AnalogueModelSourceType,
  ComputeCaseDto,
  CountryDto,
  FieldDto,
  GeologicalGroupDto,
  GeologicalStandardDto,
  JobStatus,
  ListComputeSettingsMethodDto,
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
  processingStatus: JobStatus.UNKNOWN,
};

type IPepmContext = {
  analogueModel: AnalogueModelDetail;
  computeCases: ComputeCaseDto[];
  modelAreaTypes: ModelAreaTypeDto[];
  outcrops: OutcropDto[];
  countries: CountryDto[];
  fields: FieldDto[];
  stratigraphicColumns: StratColumnDto[];
  stratigraphicUnits: StratUnitDto[];
  geologyStandards: GeologicalStandardDto[];
  computeSettings: ListComputeSettingsMethodDto[];
};

type IPepmContextActions = {
  setAnalogueModel: (analogueModel: AnalogueModelDetail) => void;
  setAnalogueModelDefault: () => void;
  addAnalogueModelStratGroup: (stratGroup: StratigraphicGroupDto) => void;
  deleteAnalogueModelStratGroup: (id: string) => void;
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
};

export const usePepmContextStore = create<IPepmContext & IPepmContextActions>()(
  immer((set, get) => ({
    analogueModel: analogueModelDefault,
    computeCases: [],
    modelAreaTypes: [],
    outcrops: [],
    countries: [],
    fields: [],
    stratigraphicColumns: [],
    stratigraphicUnits: [],
    geologyStandards: [],
    computeSettings: [],
    setAnalogueModel: (analogueModel: AnalogueModelDetail) =>
      set((state) => {
        state.analogueModel = analogueModel;
      }),
    setAnalogueModelDefault: () =>
      set((state) => {
        state.analogueModel = analogueModelDefault;
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
    // addAnalogueModelArea: (modelArea: GeologicalGroupDto) =>
    //   set((state) => {
    //     state.analogueModel.geologicalGroups.push(modelArea);
    //   }),
    // deleteAnalogueModelArea: (id: string) =>
    //   set((state) => {
    //     state.analogueModel.geologicalGroups =
    //       state.analogueModel.geologicalGroups.filter(
    //         (gde) => gde.geologicalGroupId !== id,
    //       );
    //   }),
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
  })),
);
