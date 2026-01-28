/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Icon,
  Radio,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { external_link as externalLink } from '@equinor/eds-icons';
import { useFetchScenarioTemplates } from '../../../hooks/useFetchScenarioTemplates';
import TooltipPopover from '../../../components/TooltipPopover';
import TemplateDetailsDialog from '../../../components/TemplateDetailsDialog';
import * as Styled from './InputParameters.styled';
import ParametersTable from '../../../components/ParametersTable';
import { useErrorStore } from '../../../stores/ErrorStore';

Icon.add({ externalLink });

interface InputParametersProps {
  scenario: any;
}

interface Variable {
  name: string;
  validators?: {
    max?: number;
    min?: number;
    allowedValues?: number[];
  };
  units?: string;
  type?: string;
  id: string;
  default?: number | string;
  value?: number | string;
  description?: string;
}

interface Section {
  name: string;
  id: string;
  variables: Variable[];
  options?: Array<{ text: string; value: string }>;
}

export const InputParameters = ({ scenario }: InputParametersProps) => {
  const templatesQuery = useFetchScenarioTemplates();
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] =
    useState<boolean>(false);
  const { addError } = useErrorStore();

  if (!scenario) {
    return (
      <Styled.Container>
        <Typography variant="h4">No scenario data available</Typography>
      </Styled.Container>
    );
  }

  if (templatesQuery.isLoading) {
    return (
      <Styled.Container>
        <CircularProgress />
      </Styled.Container>
    );
  }

  if (templatesQuery.isError || !templatesQuery.data?.data?.data) {
    addError('Failed to load scenario templates. Please try again.');
    return null;
  }

  const templates = templatesQuery.data?.data?.data;
  const currentTemplate = templates.find(
    (t: any) => t.scenarioTemplateId === scenario.scenario_template_id,
  );

  if (!currentTemplate) {
    return (
      <Styled.Container>
        <Typography variant="h4">Template not found</Typography>
      </Styled.Container>
    );
  }

  // Parse scenario data to get user-entered values
  let scenarioValues: any = {};
  if (scenario.json_scenario_data) {
    try {
      scenarioValues =
        typeof scenario.json_scenario_data === 'string'
          ? JSON.parse(scenario.json_scenario_data)
          : scenario.json_scenario_data;
    } catch (error) {
      addError('Failed to parse scenario data. The data may be corrupted.');
    }
  }

  // Parse template structure
  let templateData: any;
  try {
    templateData = JSON.parse(currentTemplate.jsonData);
  } catch (error) {
    addError('Failed to parse template data. The template may be corrupted.');
    return null;
  }

  const addedBy = scenario.created_by || 'Unknown';
  const addedDate = scenario.created_at
    ? new Date(scenario.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  const templateName = currentTemplate.name || 'Unknown';
  const sections: Section[] = templateData?.fields?.sections || [];

  // Helper function to get value from scenario data
  const getVariableValue = (section: Section, variable: Variable) => {
    // Try to find the value in the scenario data
    const scenarioSection = scenarioValues?.fields?.sections?.find(
      (s: any) => s.id === section.id || s.name === section.name,
    );

    if (scenarioSection) {
      const scenarioVariable = scenarioSection.variables?.find(
        (v: any) => v.id === variable.id,
      );

      if (scenarioVariable?.value !== undefined) {
        return scenarioVariable.value;
      }
    }

    // Fallback to default value from template
    return variable.default ?? '-';
  };

  const renderParameterTable = (section: Section) => {
    return (
      <ParametersTable style={{ border: '1px solid #DCDCDC' }}>
        {section.variables.map((variable: Variable) => {
          const minVal = variable.validators?.min;
          const maxVal = variable.validators?.max;
          const allowedValues = variable.validators?.allowedValues;
          const value = getVariableValue(section, variable);

          let rangeDisplay = '';
          if (allowedValues && allowedValues.length > 0) {
            rangeDisplay = allowedValues.join(' or ');
          } else if (minVal !== undefined && maxVal !== undefined) {
            rangeDisplay = `${minVal} - ${maxVal}`;
          } else if (minVal !== undefined) {
            rangeDisplay = `${minVal}`;
          }

          return (
            <Table.Row key={variable.id}>
              <Table.Cell>
                <Typography variant="body_short">{variable.name}</Typography>
                {rangeDisplay && (
                  <Typography variant="meta" style={{ marginLeft: '8px' }}>
                    {rangeDisplay}
                  </Typography>
                )}
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_short">{value}</Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_short">
                  {variable.units || '-'}
                </Typography>
              </Table.Cell>
              <Table.Cell>
                {variable.description && (
                  <TooltipPopover
                    tooltipTitle={variable.name}
                    description={variable.description}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </ParametersTable>
    );
  };

  const renderSedimentComposition = (section: Section) => {
    const variable = section.variables[0] as any;

    // Get selected value from scenario data
    const scenarioSection = scenarioValues?.fields?.sections?.find(
      (s: any) => s.id === section.id || s.name === section.name,
    );
    const scenarioVariable = scenarioSection?.variables?.[0];
    const selectedValue = scenarioVariable?.value ?? variable?.default;

    const capitalize = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
      <div key={section.id} style={{ marginBottom: '2.5rem' }}>
        <Typography
          variant="h4"
          style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}
        >
          {section.name}
        </Typography>
        <Styled.RadioGroup>
          {variable?.options?.map((option: any) => (
            <Radio
              key={option.value}
              label={capitalize(option.text)}
              name="sediment-composition"
              value={option.value}
              checked={selectedValue === option.value}
              disabled
            />
          ))}
        </Styled.RadioGroup>
      </div>
    );
  };

  return (
    <Styled.Container>
      <Card
        variant="default"
        style={{ boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="overline">
              Added by {addedBy} on {addedDate}
            </Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Content
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <Typography variant="body_short">
            {scenario.description || 'No description provided'}
          </Typography>
          <Button variant="outlined" style={{ flexShrink: 0 }}>
            Edit description...
          </Button>
        </Card.Content>
      </Card>

      <Card
        variant="default"
        style={{ boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h3">Template</Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Content>
          <Typography variant="body_short" style={{ marginBottom: '1rem' }}>
            {templateName}
          </Typography>
          <TemplateDetailsDialog
            tooltipTitle={currentTemplate.name}
            description={currentTemplate.description}
            picture={templateData?.fields?.picture || ''}
            setIsOpen={setIsTemplateDialogOpen}
            isOpen={isTemplateDialogOpen}
          />

          {sections.map((section: Section) => {
            if (section.name === 'Sediment composition') {
              return renderSedimentComposition(section);
            } else {
              return (
                <div key={section.id}>
                  <Typography
                    variant="h4"
                    style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}
                  >
                    {section.name}
                  </Typography>
                  {renderParameterTable(section)}
                </div>
              );
            }
          })}
        </Card.Content>
      </Card>
    </Styled.Container>
  );
};
