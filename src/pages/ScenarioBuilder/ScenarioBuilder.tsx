import {
  Button,
  Divider,
  Input,
  InputWrapper,
  NativeSelect,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { ChangeEvent, useEffect, useState } from 'react';
import jsonData from './templates/default_template.json';
import { RadioPicker } from './components/RadioPicker';
import { TableRow } from './components/TableRow';

export const ScenarioBuilder = () => {
  const [templates, setTemplates] = useState<typeof jsonData>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<(typeof jsonData)[0]>();
  const [selectedId, setSelectedId] = useState<number>();
  // Dummy loading, should be done through API later on
  useEffect(() => {
    const filteredTemplates = jsonData.filter((t) => t.fields.name !== 'MAIN');
    setTemplates(filteredTemplates);
    setLoading(false);
    setSelectedTemplate(filteredTemplates[0]);
    setSelectedId(filteredTemplates[0].pk);
  }, [loading]);

  const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = templates.find((t) => t.fields.name === event.target.value)!.pk;
    if (id) setSelectedId(id);
  };

  const buttonOnConfirm = () => {
    setSelectedTemplate(templates.find((t) => t.pk === selectedId));
  };

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
      <Typography variant="h3" as="h1">
        Scenario Builder
      </Typography>
      <InputWrapper
        labelProps={{
          label: 'Name',
        }}
      >
        <Input />
      </InputWrapper>
      <InputWrapper
        labelProps={{
          label: 'Description',
        }}
      >
        <Input />
      </InputWrapper>
      <Typography variant="h4">Template</Typography>
      <Typography variant="body_short" group="paragraph">
        Select a starting template to vier and edit parameters
      </Typography>
      <>
        <NativeSelect
          label="Label text"
          id="native-select"
          onChange={selectOnChange}
        >
          {templates &&
            templates.map((t) => <option key={t.pk}>{t.fields.name}</option>)}
        </NativeSelect>
        <Button variant="outlined" onClick={buttonOnConfirm}>
          Apply
        </Button>
      </>
      <Divider />
      {selectedTemplate &&
        selectedTemplate.fields.sections.map((s) => {
          if (s.name !== 'Scenario' && s.name !== 'Sediment composition')
            return (
              <Table key={s.name} style={{ marginBottom: '16px' }}>
                <Table.Caption>
                  <Typography
                    style={{
                      marginBottom: '10px',
                    }}
                    variant="h2"
                  >
                    {s.name}
                  </Typography>
                </Table.Caption>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Parameter</Table.Cell>
                    <Table.Cell>Current value(s)</Table.Cell>
                    <Table.Cell>Unit</Table.Cell>
                    <Table.Cell>Range(min/max)</Table.Cell>
                    <Table.Cell>Add new value</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {s.variables.map((v) => {
                    const variable = v as variable;
                    return <TableRow key={v.id} variable={variable}></TableRow>;
                  })}
                </Table.Body>
              </Table>
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
                  variant="h2"
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
      {/* 
            <Typography variant="h4">
                Geometry
            </Typography>
            <Typography variant="h4">
                Forcing
            </Typography>
            <Typography variant="h4">
                Sediment Composition
            </Typography> */}
    </>
  );
};
