/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, LinearProgress, Typography } from '@equinor/eds-core-react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  AnalogueModelDetail,
  CountryDto,
  FieldDto,
  StratColumnDto,
  StratUnitDto,
} from '../../../api/generated';
import { ErrorBanner } from '../../../components/ErrorBanner/ErrorBanner';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import {
  useHandleModelComponent,
  validateValues,
} from './HandleModelComponent.hooks';
import * as Styled from './HandleModelComponent.styled';

interface AddModelDialogProps {
  confirm?: (file: File, metadata: AnalogueModelDetail) => Promise<void>;
  edit?: (metadata: AnalogueModelDetail) => Promise<void>;
  progress?: number;
  uploading?: boolean;
  defaultMetadata: AnalogueModelDetail;
  isEdit?: boolean;
  existingData?: AnalogueModelDetail;
}

export interface FilesProps {
  NC?: File;
  INI?: File;
}

export type ErrorType = {
  name?: string;
  description?: string;
  country?: string;
  field?: string;
  stratColumn?: string;
  level1?: string;
  level2?: string;
  level3?: string;

  formation?: string;
  file?: string;
  analogues?: string;
  zone?: string;
};

const defaultFiles = {
  NC: undefined,
  INI: undefined,
};
export interface StratColumnType {
  country?: CountryDto;
  field?: FieldDto;
  stratColumn?: StratColumnDto;
  level1?: StratUnitDto;
  level2?: StratUnitDto;
  level3?: StratUnitDto;
}

export const HandleModelComponent = ({
  confirm,
  edit,
  progress,
  uploading,
  defaultMetadata,
  isEdit,
  existingData,
}: AddModelDialogProps) => {
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesProps>(defaultFiles);
  const [metadata, setMetadata] =
    useState<AnalogueModelDetail>(defaultMetadata);
  const [submitting, setSubmitting] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [rawFile, setrawFile] = useState<File>();

  const [errors, setErrors] = useState({});

  useHandleModelComponent(
    setFileSize,
    setMetadata,
    files,
    rawFile,
    existingData,
  );

  const handleSubmit = () => {
    setErrors(validateValues(metadata, files, isEdit));
    setSubmitting(true);
  };

  const fileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
    setrawFile(e.target.files[0]);
  };

  useEffect(() => {
    const cleanupStates = () => {
      if (!isEdit) setMetadata(defaultMetadata);
      setFiles(defaultFiles);
      setrawFile(undefined);
      setFileSize(0);
      setSubmitting(false);
    };

    const finishSubmit = () => {
      if (files.NC && !isEdit && confirm) {
        confirm(files.NC, metadata);
      } else if (isEdit && edit) {
        edit(metadata);
      }
      cleanupStates();
    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [
    confirm,
    defaultMetadata,
    edit,
    errors,
    files.NC,
    isEdit,
    metadata,
    submitting,
  ]);

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }
  const INIFileContent = () => <p>Not implemented yet...</p>;

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

  return (
    <Styled.Wrapper>
      {!isEdit && (
        <Typography variant="h3">
          {isEdit ? 'Edit model details' : 'Add new model'}
        </Typography>
      )}
      <Styled.CustomContent>
        {!isEdit && (
          <ModelInputFilesTable
            files={files}
            setFiles={setFiles}
            fileDisplay={{
              isVisible: isFileDisplay,
              toggle: toggleINIFileContent,
            }}
            fileSize={fileSize}
            fileChange={fileAdded}
          />
        )}
        {isFileDisplay && <INIFileContent />}
        <ModelMetadata
          errors={errors}
          metadata={metadata}
          setMetadata={setMetadata}
        />

        <Styled.ErrorDiv>
          {!_.isEmpty(errors) &&
            ErrorList !== undefined &&
            ErrorList.map((e, i) => {
              return <ErrorBanner key={i} text={e} />;
            })}
        </Styled.ErrorDiv>
      </Styled.CustomContent>
      <div>
        <Button onClick={handleSubmit} disabled={uploading}>
          {isEdit
            ? 'Save changes'
            : uploading
            ? 'Wait for model to finish uploading'
            : 'Confirm and start uploading'}
        </Button>
      </div>
      {uploading && (
        <Styled.UploadDiv>
          <Typography variant="h3">
            Upload progress: {progress !== undefined && progress.toFixed(0)}%
          </Typography>
          {<LinearProgress variant="determinate" value={progress} />}
        </Styled.UploadDiv>
      )}
    </Styled.Wrapper>
  );
};
