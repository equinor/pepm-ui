/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import {
  close,
  download,
  external_link as externalLink,
} from '@equinor/eds-icons';
import { useFetchOrchestrationResults } from '../../../hooks/useFetchOrchestrationResults';
import { downloadOrchestrationFile } from '../../../utils/downloadOrchestrationFile';
import * as Styled from './OutputFiles.styled';
import { useErrorStore } from '../../../stores/ErrorStore';

Icon.add({ externalLink, download, close });

interface OutputFilesProps {
  orchestrationId?: string | null;
}

export const OutputFiles = ({ orchestrationId }: OutputFilesProps) => {
  const {
    data: results,
    isLoading,
    isError,
  } = useFetchOrchestrationResults(orchestrationId);
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(
    new Set(),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addError } = useErrorStore();

  useEffect(() => {
    if (isError) {
      addError('Failed to load orchestration files.');
    }
  }, [isError, addError]);

  const handleDownload = async (fileName: string) => {
    if (!orchestrationId || !fileName) return;

    setDownloadingFiles((prev) => new Set(prev).add(fileName));

    try {
      await downloadOrchestrationFile(orchestrationId, fileName);
    } catch (error) {
      addError(`Failed to download file: ${fileName}`);
    } finally {
      setDownloadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileName);
        return newSet;
      });
    }
  };

  const formatFileSize = (bytes?: bigint): string => {
    if (!bytes) return 'Unknown size';
    const numBytes = Number(bytes);
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = numBytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatDate = (date?: Date | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Styled.Container>
      <Typography variant="h5">Output files</Typography>

      <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
        Open file server
        <Icon name="externalLink" size={16} />
      </Button>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        style={{ width: '600px' }}
      >
        <Dialog.Header>
          <Dialog.Title>Orchestration Output Files</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          {isLoading && (
            <Styled.EmptyState>
              <CircularProgress size={24} />
              <Typography variant="body_short">Loading files...</Typography>
            </Styled.EmptyState>
          )}

          {!isLoading &&
            !isError &&
            results?.data &&
            results.data.length > 0 && (
              <Styled.FileList>
                {results.data.map((file) => (
                  <Styled.FileItem key={file.name}>
                    <Styled.FileInfo>
                      <Styled.FileName>{file.name}</Styled.FileName>
                      <Styled.FileDetails>
                        {formatFileSize(file.size_bytes)}
                        {file.last_modified &&
                          ` • ${formatDate(file.last_modified)}`}
                      </Styled.FileDetails>
                    </Styled.FileInfo>

                    <Styled.ButtonGroup>
                      <Button
                        variant="ghost_icon"
                        onClick={() => handleDownload(file.name || '')}
                        disabled={downloadingFiles.has(file.name || '')}
                        title="Download file"
                      >
                        {downloadingFiles.has(file.name || '') ? (
                          <CircularProgress size={16} />
                        ) : (
                          <Icon name="download" size={16} />
                        )}
                      </Button>
                    </Styled.ButtonGroup>
                  </Styled.FileItem>
                ))}
              </Styled.FileList>
            )}

          {!isLoading &&
            !isError &&
            results?.data &&
            results.data.length === 0 && (
              <Styled.EmptyState>
                <Typography variant="body_short">
                  No output files available yet
                </Typography>
              </Styled.EmptyState>
            )}
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Styled.Container>
  );
};
