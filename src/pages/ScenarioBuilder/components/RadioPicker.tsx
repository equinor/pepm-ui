import { Radio } from '@equinor/eds-core-react';
import { useState } from 'react';

interface Props {
  optionsList: { text: string; value: string }[];
}

export const RadioPicker = ({ optionsList }: Props) => {
  const [checked, updateChecked] = useState(optionsList[0].value);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateChecked(event.target.value);
  };
  const buttonList = optionsList.map((o) => (
    <Radio
      key={o.value}
      label={o.text}
      name="group"
      value={o.value}
      checked={checked === o.value}
      onChange={onChange}
    />
  ));

  return <ul>{buttonList}</ul>;
};
