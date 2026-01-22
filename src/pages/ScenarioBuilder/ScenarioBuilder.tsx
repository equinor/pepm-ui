/* eslint-disable camelcase */
import {
  Button,
  Divider,
  NativeSelect,
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

export const ScenarioBuilder = () => {
  const templatesData = useFetchScenarioTemplates();
  const { templates, setTemplates, setCurrentTemplate, currentTemplate } =
    useScenarioStore();

  const [selectedName, setSelectedName] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenReset, setIsOpenReset] = useState<boolean>(false);

  useEffect(() => {
    if (templatesData?.data?.data?.data) {
      setTemplates(templatesData.data.data.data);
      if (selectedName === undefined)
        setSelectedName(templatesData.data.data.data[0].name);
    }
  }, [templatesData, setTemplates, selectedName]);

  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = templates.find((t) => t.name === event.target.value)?.name;
    if (name) setSelectedName(name);
  };

  const updateTemplate = () => {
    const template = templates.find((t) => t.name === selectedName);
    if (template) {
      setCurrentTemplate(template);
    }
  };

  const buttonOnConfirm = () => {
    if (currentTemplate) setIsOpenReset(true);
    // cancel - set template name back to previous
  };

  // const onCreateModel = () => {
  // setIsOpenCreate(true);

  // };

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
          <NativeSelect
            label="Template"
            id="native-select"
            onChange={selectOnChange}
            style={{ maxWidth: '390px' }}
          >
            {templates &&
              templates.map((t) => (
                <option key={t.scenarioTemplateId}>{t.name}</option>
              ))}
          </NativeSelect>
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
          multiline
          rows={4}
          rowsMax={8}
          // value={data.data as string}
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
          <Button style={{ width: '120px' }}>Create model</Button>
        )}
        {currentTemplate && (
          <DuplicateModelDialog
            isOpen={isOpenCreate}
            setIsOpen={setIsOpenCreate}
          />
        )}
      </ScenarioBuilderWrapper>
    </>
  );
};
