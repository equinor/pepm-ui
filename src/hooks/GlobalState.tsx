import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  AnalogueModelDetail,
  AnalogueModelSourceType,
  JobStatus,
} from '../api/generated';

export const analogueModelEmpty: AnalogueModelDetail = {
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
};
type IPepmContextActions = {
  setAnalogueModel: (analogueModel: AnalogueModelDetail) => void;
  setAnalogueModelEmpty: () => void;
};

export const usePepmContextStore = create<IPepmContext & IPepmContextActions>()(
  immer((set, get) => ({
    analogueModel: analogueModelEmpty,
    setAnalogueModel: (am: AnalogueModelDetail) =>
      set((state) => {
        state.analogueModel = am;
      }),
    setAnalogueModelEmpty: () =>
      set((state) => {
        state.analogueModel = analogueModelEmpty;
      }),
  })),
);
