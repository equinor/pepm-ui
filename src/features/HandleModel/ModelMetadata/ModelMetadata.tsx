/* eslint-disable max-lines-per-function */
import { Label } from '@equinor/eds-core-react';

import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelMetadata.styled';
import { ErrorType } from '../../../pages/AddModel/stores/AddModelStore';

export const ModelMetadata = ({
  errors,
  metadata,
  setMetadata,
}: {
  errors: ErrorType;
  metadata: AnalogueModelDetail;
  setMetadata: (metadata: AnalogueModelDetail) => void;
}) => {
  return (
    <Styled.ModelMetadata className="model-metadata">
      <Styled.Form>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            variant={errors.name ? 'error' : undefined}
            id="model-name"
            label="Model name (required)"
            value={metadata?.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMetadata({ ...metadata, name: e.currentTarget.value })
            }
          />
          {errors.name && <Label label={errors.name}></Label>}
        </Styled.InputfieldRequired>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            variant={errors.description ? 'error' : undefined}
            id="model-description"
            label="Model description (required)"
            value={metadata?.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMetadata({ ...metadata, description: e.currentTarget.value })
            }
            multiline
            rows={4}
            rowsMax={8}
          />
          {errors.description && <Label label={errors.description}></Label>}
        </Styled.InputfieldRequired>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
