/* eslint-disable camelcase */
import {
  Button,
  Divider,
  NativeSelect,
  Snackbar,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { RadioPicker } from './components/RadioPicker';
import { TableRow } from './components/TableRow';
import {
  ScenarioBuilderWrapper,
  TextInput,
  Wrapper,
} from './ScenarioBuilder.styled';
import TemplateDetailsDialog from './components/TemplateDetailsDialog';
import { useFetchScenarioTemplates } from '../../hooks/useFetchScenarioTemplates';
import { useScenarioStore } from './stores/ScenarioStore';
import ResetParamsDialog from './components/ResetParamsDialog';
import DuplicateModelDialog from './components/DuplicateModelDialog';
import {
  postApiV1Scenarios,
  postApiV1ScenariosByScenarioIdStartOrchestration,
} from '../../api/generated';

export const ScenarioBuilder = () => {
  const templatesData = useFetchScenarioTemplates();
  const {
    templates,
    setTemplates,
    setCurrentTemplate,
    currentTemplate,
    parameters,
    description,
    setDescription,
  } = useScenarioStore();

  const [selectedName, setSelectedName] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenReset, setIsOpenReset] = useState<boolean>(false);
  const [templateError, setTemplateError] = useState<string>();
  const [descriptionError, setDescriptionError] = useState<string>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [duplicateId, setDuplicateId] = useState<string>();

  useEffect(() => {
    if (templatesData?.data?.data?.data) {
      setTemplates(templatesData.data.data.data);
      if (selectedName === undefined)
        setSelectedName(templatesData.data.data.data[0].name);
    }
  }, [templatesData, setTemplates, selectedName]);

  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = templates.find((t) => t.name === event.target.value)?.name;
    if (name) {
      setSelectedName(name);
      setTemplateError(undefined);
    }
  };

  const updateTemplate = () => {
    const template = templates.find((t) => t.name === selectedName);
    if (template) {
      setCurrentTemplate(template);
    }
  };

  const buttonOnConfirm = () => {
    let hasError = false;

    if (!selectedName) {
      setTemplateError('You must select a template');
      hasError = true;
    } else {
      setTemplateError(undefined);
    }

    if (!description) {
      setDescriptionError('You must add a description');
      hasError = true;
    } else {
      setDescriptionError(undefined);
    }

    if (hasError) return;

    if (currentTemplate) {
      setIsOpenReset(true);
    } else {
      updateTemplate();
    }
  };

  const onSimulationStart = async () => {
    if (!currentTemplate || !parameters) return;

    try {
      // Create scenario with data from ScenarioStore
      const createResponse = await postApiV1Scenarios({
        body: {
          name: parameters.template.value || currentTemplate.name,
          description: description || '',
          json_scenario_data: JSON.stringify(parameters),
          scenario_template_id: currentTemplate.scenarioTemplateId,
        },
      });

      // Check for 409 Conflict (duplicate) in error response
      if (createResponse.error) {
        const errorData = createResponse.error as any;
        if (errorData?.data?.scenario_id) {
          setDuplicateId(errorData.data.scenario_id);
          setIsOpenCreate(true);
          return;
        }
        console.error('Failed to create scenario:', createResponse.error);
        return;
      }

      if (
        createResponse.data?.success &&
        createResponse.data.data.scenario_id
      ) {
        // If successful, start the orchestration
        const scenarioId = createResponse.data.data.scenario_id;
        await postApiV1ScenariosByScenarioIdStartOrchestration({
          path: { scenarioId },
        });
        setShowSnackbar(true);
      }
    } catch (error: any) {
      console.error('Failed to start simulation:', error);
    }
  };

  type variable = {
    name: string;
    validators: {
      max: number;
      min: number;
      allowedValues: number[];
    };
    units: string;
    type: string;
    id: string;
    default: number;
    factor: boolean;
    description: string;
  };

  return (
    <>
      <ScenarioBuilderWrapper>
        <Typography variant="h1">
          Scenario builder
          <Typography variant="body_short" group="paragraph">
            Create template-based models for further parameter estimation.
          </Typography>
        </Typography>
        <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
          <div>
            <NativeSelect
              label="Template"
              id="native-select"
              onChange={selectOnChange}
              required
              style={{ maxWidth: '390px' }}
            >
              {templates &&
                templates.map((t) => (
                  <option key={t.scenarioTemplateId}>{t.name}</option>
                ))}
            </NativeSelect>
            {templateError && (
              <Typography variant="caption" style={{ color: 'red' }}>
                {templateError}
              </Typography>
            )}
          </div>
          {currentTemplate &&
            TemplateDetailsDialog({
              tooltipTitle: currentTemplate.name,
              description: currentTemplate.description,
              picture: 'currentTemplate.fields.picture',
              setIsOpen: setIsOpen,
              isOpen: isOpen,
            })}
        </div>

        <TextInput
          id={'Description'}
          label="Description"
          required
          multiline
          rows={4}
          rowsMax={8}
          value={description}
          onChange={(e: { target: { value: string } }) => {
            setDescription(e.target.value);
            setDescriptionError(undefined);
          }}
          variant={descriptionError ? 'error' : undefined}
          helperText={descriptionError}
        />

        <Button
          variant="outlined"
          onClick={buttonOnConfirm}
          style={{ maxWidth: '140px' }}
        >
          Load template
        </Button>
        {currentTemplate && (
          <ResetParamsDialog
            isOpen={isOpenReset}
            setIsOpen={setIsOpenReset}
            updateTemplate={updateTemplate}
          />
        )}

        {currentTemplate && (
          <>
            <Divider
              style={{
                width: '100%',
              }}
              variant="small"
            />
            <Typography variant="h2">Simulation parameters</Typography>
          </>
        )}
        {currentTemplate &&
          JSON.parse(currentTemplate.jsonData)['fields']['sections'].map(
            (s: any) => {
              if (s.name !== 'Scenario' && s.name !== 'Sediment composition')
                return (
                  <Wrapper>
                    <Table
                      key={s.id + s.name}
                      style={{
                        marginBottom: '16px',
                        minWidth: '600px',
                        width: '35%',
                      }}
                    >
                      <Table.Caption>
                        <Typography
                          style={{
                            marginBottom: '10px',
                          }}
                          variant="body_short_bold"
                        >
                          {s.name}
                        </Typography>
                      </Table.Caption>
                      <Table.Head>
                        <Table.Row>
                          <Table.Cell style={{ width: '440px' }}>
                            Parameter name
                            <Typography
                              variant="meta"
                              style={{ marginLeft: '8px' }}
                            >
                              {``}(min - max range)
                            </Typography>
                          </Table.Cell>
                          <Table.Cell style={{ width: '140px' }}>
                            Value
                          </Table.Cell>
                          <Table.Cell>Unit</Table.Cell>
                          <Table.Cell></Table.Cell>
                        </Table.Row>
                      </Table.Head>
                      <Table.Body>
                        {s.variables.map((v: any) => {
                          const variable = v as variable;
                          return (
                            <TableRow
                              key={s.id + v.id}
                              variable={variable}
                            ></TableRow>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Wrapper>
                );
              else if (s.name === 'Sediment composition') {
                const variable = s.variables[0] as {
                  id: string;
                  options: {
                    text: string;
                    value: string;
                  }[];
                };
                return (
                  <div key={'radio' + s.name}>
                    <Typography
                      variant="body_short_bold"
                      style={{
                        marginBottom: '10px',
                      }}
                    >
                      {s.name}
                    </Typography>
                    <RadioPicker optionsList={variable.options}></RadioPicker>
                  </div>
                );
              }
            },
          )}
        {currentTemplate && (
          <Button onClick={onSimulationStart} style={{ width: '140px' }}>
            Start simulation
          </Button>
        )}
        {currentTemplate && (
          <DuplicateModelDialog
            isOpen={isOpenCreate}
            setIsOpen={setIsOpenCreate}
            duplicateId={duplicateId}
          />
        )}
      </ScenarioBuilderWrapper>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        Simulation scheduled for processing
        <Snackbar.Action>
          <Button
            variant="ghost"
            onClick={() => {
              // TODO: Navigate to queue page
              setShowSnackbar(false);
            }}
          >
            GO TO QUEUE
          </Button>
        </Snackbar.Action>
      </Snackbar>
    </>
  );
};
