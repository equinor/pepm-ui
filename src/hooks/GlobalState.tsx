import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  AnalogueModelDetail,
  AnalogueModelSourceType,
  JobStatus,
  ModelAreaTypeDto,
  OutcropDto,
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
  modelAreaTypes: ModelAreaTypeDto[];
  outcrops: OutcropDto[];
};
type IPepmContextActions = {
  setAnalogueModel: (analogueModel: AnalogueModelDetail) => void;
  setanalogueModelDefault: () => void;
  setModelAreaTypes: (modelAreaTypes: ModelAreaTypeDto[]) => void;
  setOutcrops: (outcrops: OutcropDto[]) => void;
};

export const usePepmContextStore = create<IPepmContext & IPepmContextActions>()(
  immer((set, get) => ({
    analogueModel: analogueModelDefault,
    modelAreaTypes: [],
    outcrops: [],
    setAnalogueModel: (analogueModel: AnalogueModelDetail) =>
      set((state) => {
        state.analogueModel = analogueModel;
      }),
    setanalogueModelDefault: () =>
      set((state) => {
        state.analogueModel = analogueModelDefault;
      }),
    setModelAreaTypes: (modelAreaTypes: ModelAreaTypeDto[]) =>
      set((state) => {
        state.modelAreaTypes = modelAreaTypes;
      }),
    setOutcrops: (outcrops: OutcropDto[]) =>
      set((state) => {
        state.outcrops = outcrops;
      }),
  })),
);
