/* eslint-disable max-lines-per-function */
import { Label } from '@equinor/eds-core-react';
import { ErrorType } from '../HandleModelComponent/HandleModelComponent';

import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelMetadata.styled';

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
      {/* <Typography variant="h4">Description and metadata</Typography> */}
      <Styled.Form>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            variant={errors.name ? 'error' : undefined}
            id="model-name"
            label="Model Name"
            value={metadata?.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMetadata({ ...metadata, name: e.currentTarget.value })
            }
          />
          {errors.name && <Label label="This field is required"></Label>}
        </Styled.InputfieldRequired>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            variant={errors.description ? 'error' : undefined}
            id="model-description"
            label="Model description"
            value={metadata?.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMetadata({ ...metadata, description: e.currentTarget.value })
            }
            multiline
            rows={4}
            rowsMax={8}
          />
          {errors.description && <Label label="This field is required"></Label>}
        </Styled.InputfieldRequired>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
