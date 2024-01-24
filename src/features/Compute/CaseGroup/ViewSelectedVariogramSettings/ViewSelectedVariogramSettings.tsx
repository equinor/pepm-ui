import { Chip } from '@equinor/eds-core-react';
import {
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import * as Styled from '../VariogramSettingSelect/VariogramSettingSelect.styled';

export const ViewSelectedVariogramSettings = ({
  expandSettings,
  selecteSettings,
  selectedModelArea,
  children,
}: {
  expandSettings: boolean;
  selectedModelArea?: ModelAreaDto[] | undefined;
  selecteSettings?: ListComputeSettingsInputValueDto[] | undefined;
  children: React.ReactNode;
}) => {
  return (
    <Styled.Container>
      {children}
      <Styled.SettingsContainer>
        {expandSettings &&
          selectedModelArea &&
          selectedModelArea?.map((m) => (
            <Chip variant="active" key={m.modelAreaId}>
              {m.modelAreaType}
            </Chip>
          ))}
      </Styled.SettingsContainer>

      <Styled.SettingsContainer>
        {expandSettings &&
          selecteSettings &&
          selecteSettings?.map((s) => (
            <Chip variant="active" key={s.inputSettingValueId}>
              {s.name}
            </Chip>
          ))}
      </Styled.SettingsContainer>
    </Styled.Container>
  );
};
