import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import jsonData from '../templates/default_template.json';

export type Template = typeof jsonData;

type IScenarioStore = {
  templates: Template[];
};

type IScenarioStoreActions = {
  setTemplates: (templates: Template[]) => void;
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
