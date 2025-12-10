import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ScenarioTemplateList } from '../../../api';

type IScenarioStore = {
  templates: ScenarioTemplateList[];
};

type IScenarioStoreActions = {
  setTemplates: (templates: ScenarioTemplateList[]) => void;
};

export const useScenarioStore = create<
  IScenarioStore & IScenarioStoreActions
>()(
  immer((set) => ({
    templates: [],
    setTemplates: (templates) =>
      set((state) => {
        state.templates = templates;
      }),
  })),
);
