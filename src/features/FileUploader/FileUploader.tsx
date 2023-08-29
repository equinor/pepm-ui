import { Icon } from '@equinor/eds-core-react'
import { subdirectory_arrow_right as arrowIcon } from '@equinor/eds-icons'
import { theme } from '../../tokens/theme'
import { File } from '../AddModelDialog/InputFilesTable/InputFilesTable'
import { FileUpload, SelectFile } from './FileUploader.styled'

interface FileUploaderProps {
  file: File | undefined
  INI?: boolean
}

export const FileUploader = ({ file, INI }: FileUploaderProps) => {
  const text = INI ? 'Select parameter INI file' : 'Select model NC file'
  const accept = INI ? '.ini' : '.nc'

  return file ? (
    <>{file.name}</>
  ) : (
    <FileUpload htmlFor="file-upload" className="custom-file-upload">
      {INI && (
        <Icon fill={theme.light.text.staticIconsTertiary} data={arrowIcon} />
      )}
      <SelectFile>{text}</SelectFile> {INI && '(optional)'}
      <input id="file-upload" required type="file" accept={accept} />
    </FileUpload>
  )
}
