/* eslint-disable max-lines-per-function */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ErrorBanner } from '../../../components/ErrorBanner/ErrorBanner';
import { validateValues } from '../../HandleModel/HandleModelComponent/HandleModelComponent.hooks';
import * as Styled2 from '../../HandleModel/HandleModelComponent/HandleModelComponent.styled';
import { ModelMetadata } from '../../HandleModel/ModelMetadata/ModelMetadata';
import * as Styled from './EditNameDescription.styled';
export const EditNameDescription = ({
  edit,
  isEdit,
  defaultMetadata,
  closeDialog,
}: {
  edit: (metadata: AnalogueModelDetail) => Promise<void>;
  isEdit: boolean;
  defaultMetadata: AnalogueModelDetail;
  closeDialog: () => void;
}) => {
  const [errors, setErrors] = useState({});
  const [metadata, setMetadata] =
    useState<AnalogueModelDetail>(defaultMetadata);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cleanupStates = () => {
      if (!isEdit) setMetadata(defaultMetadata);
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
  }, [defaultMetadata, edit, errors, isEdit, metadata, submitting]);

  const getErroMessageList = () => {
    if (_.isEmpty(errors)) return;

    const errorList: string[] = [];

    Object.keys(errors).forEach(function (key) {
      // TODO: Fix the TS error for errors[key]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = errors[key];
      errorList.push(message);
    });
    return errorList;
  };
  const ErrorList = getErroMessageList();

  const handleSubmit = () => {
    setErrors(validateValues(metadata, undefined, isEdit));
    setSubmitting(true);
  };

  const handleClose = () => {
    setMetadata(defaultMetadata);
    if (closeDialog) closeDialog();
  };

  return (
    <>
      <Styled.DialogWrapper open={isEdit ? isEdit : false}>
        <Dialog.CustomContent>
          <Typography variant="body_short">Edit name description</Typography>
          {isEdit && (
            <>
              <ModelMetadata
                errors={errors}
                metadata={metadata}
                setMetadata={setMetadata}
              />
              {!_.isEmpty(errors) &&
                ErrorList !== undefined &&
                ErrorList.map((e, i) => {
                  return (
                    <Styled2.ErrorDiv key={i}>
                      <ErrorBanner text={e} />
                    </Styled2.ErrorDiv>
                  );
                })}
            </>
          )}
        </Dialog.CustomContent>
        <Styled.Buttons>
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
          <Button color={'danger'} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Styled.Buttons>
      </Styled.DialogWrapper>
    </>
  );
};
