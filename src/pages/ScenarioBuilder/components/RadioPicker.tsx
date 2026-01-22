import { Radio } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { useScenarioStore } from '../stores/ScenarioStore';

interface Props {
  optionsList: { text: string; value: string }[];
}

export const RadioPicker = ({ optionsList }: Props) => {
  const { parameters, updateParameter } = useScenarioStore();
  const [checked, updateChecked] = useState(
    parameters?.composition?.value || optionsList[0].value,
  );

  // Sync with store when composition changes (e.g., when a new template is loaded)
  useEffect(() => {
    if (parameters?.composition?.value) {
      updateChecked(parameters.composition.value);
    }
  }, [parameters?.composition?.value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateChecked(event.target.value);
    updateParameter('composition', event.target.value);
  };

  function capitalizeFirstLetter(str: string): string {
    if (!str) {
      return ''; // Handle empty or null strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const buttonList = optionsList.map((o) => (
    <Radio
      key={o.value}
      label={capitalizeFirstLetter(o.text)}
      name="group"
      value={o.value}
      checked={checked === o.value}
      onChange={onChange}
    />
  ));

  return <ul>{buttonList}</ul>;
};
