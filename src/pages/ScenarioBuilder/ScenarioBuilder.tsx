/* eslint-disable camelcase */
import {
  Button,
  Divider,
  NativeSelect,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { ChangeEvent, useEffect, useState } from 'react';
import jsonData from './templates/default_template.json';
import { RadioPicker } from './components/RadioPicker';
import { TableRow } from './components/TableRow';
import {
  ScenarioBuilderWrapper,
  TextInput,
  Wrapper,
} from './ScenarioBuilder.styled';
import TemplateDetailsDialog from './components/TemplateDetailsDialog';

export const ScenarioBuilder = () => {
  const [templates, setTemplates] = useState<typeof jsonData>([]);
  // const { templates, setTemplates } = useScenarioStore();

  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<(typeof jsonData)[0]>();
  const [selectedId, setSelectedId] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Dummy loading, should be done through API later on
  useEffect(() => {
    const filteredTemplates = jsonData.filter((t) => t.fields.name !== 'MAIN');
    setTemplates(filteredTemplates);
    setLoading(false);
    setSelectedTemplate(filteredTemplates[0]);
    setSelectedId(filteredTemplates[0].pk);
  }, [loading]);

  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = templates.find((t) => t.fields.name === event.target.value)?.pk;
    if (id) setSelectedId(id);
  };

  const buttonOnConfirm = () => {
    setSelectedTemplate(templates.find((t) => t.pk === selectedId));
  };

  // const onCreateModel = () => {

  // };

  type variable = {
    name: string;
    validators: {
      max: number;
      min: number;
    };
    units: string;
    type: string;
    id: string;
    default: number;
    factor: boolean;
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
              templates.map((t) => <option key={t.pk}>{t.fields.name}</option>)}
          </NativeSelect>
          {selectedTemplate &&
            TemplateDetailsDialog({
              tooltipTitle: selectedTemplate.fields.name,
              description: 'selectedTemplate.fields.description',
              picture: 'selectedTemplate.fields.picture',
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
        <Divider
          style={{
            width: '100%',
          }}
          variant="small"
        />
        <Typography variant="h2">Simulation parameters</Typography>
        {selectedTemplate &&
          selectedTemplate.fields.sections.map((s) => {
            if (s.name !== 'Scenario' && s.name !== 'Sediment composition')
              return (
                <Wrapper>
                  <Table
                    key={s.name}
                    style={{
                      marginBottom: '16px',
                      minWidth: '600px',
                      width: '30%',
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
                        <Table.Cell>Value</Table.Cell>
                        <Table.Cell>Unit</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    </Table.Head>
                    <Table.Body>
                      {s.variables.map((v) => {
                        const variable = v as variable;
                        return (
                          <TableRow key={v.id} variable={variable}></TableRow>
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
                <div key={s.name}>
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
          })}
        <Button style={{ width: '120px' }}>Create model</Button>
      </ScenarioBuilderWrapper>
    </>
  );
};
