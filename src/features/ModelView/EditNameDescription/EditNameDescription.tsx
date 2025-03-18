/* eslint-disable max-lines-per-function */
import { Button, Dialog } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { validateValues } from '../../HandleModel/HandleModelComponent/HandleModelComponent.hooks';
import { ModelMetadata } from '../../HandleModel/ModelMetadata/ModelMetadata';
import * as Styled from './EditNameDescription.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
export const EditNameDescription = ({
  edit,
  isEdit,
  closeDialog,
}: {
  edit: (metadata: AnalogueModelDetail) => Promise<void>;
  isEdit: boolean;
  closeDialog: () => void;
}) => {
  const { analogueModel } = usePepmContextStore();
  const [errors, setErrors] = useState({});
  const [metadata, setMetadata] = useState<AnalogueModelDetail>(analogueModel);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cleanupStates = () => {
      if (!isEdit) setMetadata(analogueModel);
      setSubmitting(false);
    };

    const finishSubmit = () => {
      if (isEdit && edit) {
        edit(metadata);
      }
      cleanupStates();
    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [analogueModel, edit, errors, isEdit, metadata, submitting]);

  const handleSubmit = () => {
    setErrors(validateValues(metadata, undefined, isEdit));
    setSubmitting(true);
  };

  const handleClose = () => {
    setMetadata(analogueModel);
    if (closeDialog) closeDialog();
  };

  return (
    <>
      <Styled.DialogWrapper open={isEdit ? isEdit : false}>
        <Dialog.Header>Edit name and description</Dialog.Header>
        <Dialog.CustomContent>
          {isEdit && (
            <>
              <ModelMetadata
                errors={errors}
                metadata={metadata}
                setMetadata={setMetadata}
              />
            </>
          )}
        </Dialog.CustomContent>
        <Styled.Buttons>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Styled.Buttons>
      </Styled.DialogWrapper>
    </>
  );
};
