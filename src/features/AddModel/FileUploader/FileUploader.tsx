import { Icon } from '@equinor/eds-core-react';
import { subdirectory_arrow_right as arrowIcon } from '@equinor/eds-icons';
import { ChangeEvent, useRef } from 'react';
import { theme } from '../../../tokens/theme';
import { FileUpload, SelectFile } from './FileUploader.styled';

interface FileUploaderProps {
  file?: File;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  acceptType: 'NC' | 'INI';
}

export const FileUploader = ({
  file,
  onChange,
  acceptType,
}: FileUploaderProps) => {
  const INI = acceptType === 'INI';
  const ref = useRef<HTMLInputElement>(null);

  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    ref.current?.click();
  }

  return file ? (
    <>{file.name}</>
  ) : (
    <form method="post" encType="multipart/form-data">
      <FileUpload htmlFor="file-upload" className="custom-file-upload">
        {INI && (
          <Icon fill={theme.light.text.staticIconsTertiary} data={arrowIcon} />
        )}
        <SelectFile onClick={handleClick}>
          {INI ? 'Select parameter INI file' : 'Select model NC file'}
        </SelectFile>
        {INI && '(optional)'}
        <input
          id="file-upload"
          required={!INI}
          type="file"
          accept={`.${acceptType.toLowerCase()}`}
          onChange={onChange}
          ref={ref}
          name={acceptType}
        />
      </FileUpload>
    </form>
  );
};
