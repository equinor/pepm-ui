import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ScenarioTemplateList } from '../../../api';

type IScenarioStore = {
  templates: ScenarioTemplateList[];
  currentTemplate?: ScenarioTemplateList;
  parameters?: ScenarioTemplateParameters;
};

type TemplateValue = {
  value: string;
};

type ParameterValue = {
  name: string;
  value: number;
};

type StringParameterValue = {
  name: string;
  value: string;
};

export type ScenarioTemplateParameters = {
  template: TemplateValue;
  basinslope: ParameterValue;
  composition: StringParameterValue;
  riverlength: ParameterValue;
  simstoptime: ParameterValue;
  channelwidth: ParameterValue;
  subsidencesea: ParameterValue;
  wavedirection: ParameterValue;
  waveheightfin: ParameterValue;
  waveheightini: ParameterValue;
  outputinterval: ParameterValue;
  subsidenceland: ParameterValue;
  tidalamplitude: ParameterValue;
  riverdischargefin: ParameterValue;
  riverdischargeini: ParameterValue;
};

const defaultParameters: ScenarioTemplateParameters = {
  template: { value: '' },
  basinslope: { name: 'basinslope', value: 0 },
  composition: { name: 'composition', value: '' },
  riverlength: { name: 'riverlength', value: 0 },
  simstoptime: { name: 'simstoptime', value: 0 },
  channelwidth: { name: 'channelwidth', value: 0 },
  subsidencesea: { name: 'subsidencesea', value: 0 },
  wavedirection: { name: 'wavedirection', value: 0 },
  waveheightfin: { name: 'waveheightfin', value: 0 },
  waveheightini: { name: 'waveheightini', value: 0 },
  outputinterval: { name: 'outputinterval', value: 0 },
  subsidenceland: { name: 'subsidenceland', value: 0 },
  tidalamplitude: { name: 'tidalamplitude', value: 0 },
  riverdischargefin: { name: 'riverdischargefin', value: 0 },
  riverdischargeini: { name: 'riverdischargeini', value: 0 },
};

type IScenarioStoreActions = {
  setTemplates: (templates: ScenarioTemplateList[]) => void;
  setCurrentTemplate: (template: ScenarioTemplateList) => void;
  setParameters: (parameters: ScenarioTemplateParameters) => void;
  updateParameter: (
    key: keyof ScenarioTemplateParameters,
    value: number | string,
  ) => void;
};

export const useScenarioStore = create<
  IScenarioStore & IScenarioStoreActions
>()(
  immer((set) => ({
    templates: [],
    currentTemplate: undefined,
    parameters: defaultParameters,
    setTemplates: (templates) =>
      set((state) => {
        state.templates = templates;
      }),
    setCurrentTemplate: (template) =>
      set((state) => {
        state.currentTemplate = template;
        state.parameters =
          parseTemplateJsonData(template.jsonData) || defaultParameters;
      }),
    setParameters: (parameters) =>
      set((state) => {
        state.parameters = parameters;
      }),
    updateParameter: (key, value) =>
      set((state) => {
        if (state.parameters && key in state.parameters) {
          // Update the value property of the parameter object
          if (key === 'composition') {
            (state.parameters[key] as StringParameterValue).value =
              value as string;
            return;
          } else {
            (state.parameters[key] as ParameterValue).value = value as number;
            return;
          }
        }
      }),
  })),
);

// Helper function to parse jsonData from template and create ScenarioTemplateParameters
export const parseTemplateJsonData = (
  jsonDataString: string,
): ScenarioTemplateParameters | undefined => {
  try {
    const jsonData = JSON.parse(jsonDataString);
    const fields = jsonData.fields;

    if (!fields || !fields.sections) {
      return undefined;
    }

    // Extract template name
    const templateName = fields.name || '';

    // Create parameters object with default structure
    const parameters: Partial<ScenarioTemplateParameters> = {
      template: { value: templateName },
    };

    // Iterate through sections to find variables
    fields.sections.forEach((section: any) => {
      if (section.variables) {
        section.variables.forEach((variable: any) => {
          const id = variable.id;
          const name = variable.name;
          const defaultValue = variable.default as string | number;

          // Skip 'name' variable as it's not part of ScenarioTemplateParameters
          if (id === 'name') return;

          // Check if this id exists in ScenarioTemplateParameters
          if (id === 'composition') {
            parameters['composition'] = {
              name,
              value: defaultValue as string,
            };
          } else if (
            [
              'basinslope',
              'riverlength',
              'simstoptime',
              'channelwidth',
              'subsidencesea',
              'wavedirection',
              'waveheightfin',
              'waveheightini',
              'outputinterval',
              'subsidenceland',
              'tidalamplitude',
              'riverdischargefin',
              'riverdischargeini',
            ].includes(id)
          ) {
            (parameters as Record<string, ParameterValue>)[id] = {
              name,
              value: defaultValue as number,
            };
          }
        });
      }
    });

    return parameters as ScenarioTemplateParameters;
  } catch (error) {
    console.error('Failed to parse template jsonData:', error);
    return undefined;
  }
};

// // Helper function to stringify ScenarioTemplateParameters for API submission
// export const stringifyTemplateParameters = (
//   parameters: ScenarioTemplateParameters,
// ): string => {
//   return JSON.stringify(parameters);
// };
