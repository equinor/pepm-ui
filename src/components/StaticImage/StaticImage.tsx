/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react';
import { Typography } from '@equinor/eds-core-react';
import axios from 'axios';
import { client } from '../../api/generated/client.gen';
import * as Styled from './StaticImage.styled';

export interface StaticImageProps {
  filename: string;
  orchestrationId: string;
  alt: string;
}

export const StaticImage = ({
  filename,
  orchestrationId,
  alt,
}: StaticImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          `/api/v1/delft3d-orchestrations/${orchestrationId}/results/download`,
          {
            params: { file: filename },
            headers: { Authorization: `Bearer ${client.getConfig().auth}` },
            responseType: 'blob',
            baseURL: client.getConfig().baseURL,
          },
        );

        if (response.data) {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    // Cleanup: revoke object URL on unmount
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename, orchestrationId]);

  if (isLoading) {
    return (
      <Styled.Container>
        <Typography variant="caption">Loading...</Typography>
      </Styled.Container>
    );
  }

  if (error || !imageUrl) {
    return (
      <Styled.Container>
        <Typography variant="caption" color="textTertiary">
          Failed to load image
        </Typography>
      </Styled.Container>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};
