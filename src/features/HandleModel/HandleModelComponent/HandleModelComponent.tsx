/* eslint-disable camelcase */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  Button,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AnalogueModelDetail } from '../../../api/generated';
import { ModelInputFilesTable } from '../ModelInputFilesTable/ModelInputFilesTable';
import { ModelMetadata } from '../ModelMetadata/ModelMetadata';
import {
  useHandleModelComponent,
  validateValues,
} from './HandleModelComponent.hooks';
import * as Styled from './HandleModelComponent.styled';
import { usePepmContextStore } from '../../../hooks/GlobalState';
import { readFileAsText } from '../../../utils/ReadIniFile';
import { IniFileTextField } from './HandleModelComponent.styled';
Icon.add({ error_outlined });

interface AddModelDialogProps {
  confirm?: (file: File, iniFile: File) => Promise<void>;
  progress?: number;
  uploading?: boolean;
  isAddUploading?: boolean;
  existingData?: AnalogueModelDetail;
  modelId?: string;
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

export const HandleModelComponent = ({
  confirm,
  progress,
  uploading,
  isAddUploading,
  modelId,
}: AddModelDialogProps) => {
  const { setAnalogueModelDefault, analogueModel, setAnalogueModel } =
    usePepmContextStore();
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesProps>(defaultFiles);
  const [iniFileString, setIniFileString] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<ErrorType>({});
  const navigate = useNavigate();

  useHandleModelComponent(setAnalogueModel);

  const handleSubmit = () => {
    setErrors(validateValues(analogueModel, files));
    setSubmitting(true);
  };

  const fileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (
      !e.target.files[0].name.endsWith('.nc') &&
      !e.target.files[0].name.endsWith('.ini')
    )
      return;
    const file = e.target.files[0];
    const type = e.target.name;
    setFiles({ ...files, [type]: file });
  };

  useEffect(() => {
    const cleanupStates = () => {
      setFiles(defaultFiles);
      setSubmitting(false);
    };

    const finishSubmit = () => {
      if (files.NC && confirm && files.INI) {
        confirm(files.NC, files.INI);
      }
      cleanupStates();
    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [confirm, errors, files, analogueModel, submitting]);

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay);
  }

  useEffect(() => {
    if (files.INI && iniFileString === undefined) {
      readFileAsText(files.INI).then((val) => {
        setIniFileString(val);
      });
    }
  }, [files, iniFileString]);

  return (
    <Styled.Wrapper>
      {progress !== undefined && progress <= 0 && (
        <Typography variant="h3">Add new model</Typography>
      )}
      <Styled.CustomContent>
        {progress !== undefined && progress <= 0 && (
          <ModelInputFilesTable
            files={files}
            setFiles={setFiles}
            fileDisplay={{
              isVisible: isFileDisplay,
              toggle: toggleINIFileContent,
            }}
            fileChange={fileAdded}
          />
        )}
        {isFileDisplay && iniFileString && !uploading && (
          <div>
            <IniFileTextField id="iniFile" multiline rowsMax={10}>
              {iniFileString}
            </IniFileTextField>
          </div>
        )}
        {!isAddUploading && (
          <>
            <ModelMetadata
              metadata={analogueModel}
              setMetadata={setAnalogueModel}
              errors={errors}
            />
            <Styled.ErrorDiv>{errors.file && errors.file}</Styled.ErrorDiv>
          </>
        )}
      </Styled.CustomContent>
      {!isAddUploading && (
        <div>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading
              ? 'Wait for model to finish uploading'
              : 'Confirm and start uploading'}
          </Button>
        </div>
      )}
      {uploading && (
        <Styled.UploadDiv>
          <p className="warning-message">
            <Icon data={error_outlined} className="icon" />
            Remember to keep this browser tab open until the upload has finished
          </p>
          <Typography variant="h4" as="h2">
            Upload progress: {progress !== undefined && progress.toFixed(0)}%
          </Typography>
          {<LinearProgress variant="indeterminate" value={progress} />}
        </Styled.UploadDiv>
      )}
      {progress === 100 && modelId && (
        <Styled.InfoNavigation>
          <Typography variant="h4" as="h2">
            Upload complete
          </Typography>
          <div>
            <Button
              onClick={() => {
                const path = generatePath('../:id/details', {
                  id: modelId,
                });
                setAnalogueModelDefault();
                navigate(path);
              }}
            >
              Open model
            </Button>
          </div>
        </Styled.InfoNavigation>
      )}
    </Styled.Wrapper>
  );
};
