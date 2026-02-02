import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Icon, Slider, Typography } from '@equinor/eds-core-react';
/* eslint-disable camelcase */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  chevron_left,
  chevron_right,
  first_page,
  last_page,
  pause_circle,
  play_circle,
} from '@equinor/eds-icons';
import * as Styled from './ImageSlideshow.styled';
import { useFetchImages } from '../../hooks/useFetchImages';

Icon.add({
  chevron_left,
  chevron_right,
  first_page,
  last_page,
  pause_circle,
  play_circle,
});

export interface ImageSlideshowProps {
  images: string[];
  orchestrationId: string;
  title?: string;
}

export const ImageSlideshow = ({
  images,
  orchestrationId,
  title,
}: ImageSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const blobUrlCache = useRef<Map<string, string>>(new Map());

  // Derived value - no need for separate state
  const sliderValue = currentIndex + 1;

  // Get step label from filename (e.g., "file_001.png" → "Step 1")
  const getStepLabel = (filename: string, fallbackIndex: number): string => {
    const match = filename.match(/_(\d+)(?:\.[^.]+)?$/);
    return match
      ? `Step ${parseInt(match[1], 10)}`
      : `Frame ${fallbackIndex + 1}`;
  };

  const currentStepLabel = images[currentIndex]
    ? getStepLabel(images[currentIndex], currentIndex)
    : '';

  // Preload current image + nearby images for smooth navigation
  const imagesToLoad = useMemo(() => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(images.length, currentIndex + 7);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }, [currentIndex, images.length]);

  // Fetch images lazily using custom hook
  const imageQueries = useFetchImages({
    orchestrationId,
    imagesToLoad,
    imageFilenames: images,
  });

  // Helper to get or create blob URL from query data
  // Uses React Query's cached data directly - no effect synchronization needed
  const getBlobUrl = useCallback(
    (filename: string, blob: Blob | null | undefined): string | null => {
      if (!blob) return null;

      // Return cached URL if available
      const cached = blobUrlCache.current.get(filename);
      if (cached) return cached;

      // Create and cache new blob URL
      const url = URL.createObjectURL(blob);
      blobUrlCache.current.set(filename, url);
      return url;
    },
    [],
  );

  // Get current image URL from React Query cache
  const currentQueryIndex = imagesToLoad.indexOf(currentIndex);
  const currentQuery =
    currentQueryIndex >= 0 ? imageQueries[currentQueryIndex] : null;
  const currentFilename = images[currentIndex];
  const currentImageUrl =
    currentFilename && currentQuery?.data
      ? getBlobUrl(currentFilename, currentQuery.data)
      : null;

  // Pre-cache blob URLs for nearby images
  useEffect(() => {
    imageQueries.forEach((query, queryIndex) => {
      const filename = images[imagesToLoad[queryIndex]];
      if (filename && query.data && !blobUrlCache.current.has(filename)) {
        blobUrlCache.current.set(filename, URL.createObjectURL(query.data));
      }
    });
  }, [imageQueries, imagesToLoad, images]);

  // Cleanup blob URLs when orchestrationId changes or on unmount
  useEffect(() => {
    const cache = blobUrlCache.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, [orchestrationId]);

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= images.length) {
            setIsPlaying(false);
            return prev;
          }
          return nextIndex;
        });
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, images.length]);

  const goToFirst = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsPlaying(false);
  }, [images.length]);

  const togglePlayPause = useCallback(() => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying((prev) => !prev);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPlaying(false);
  }, [images.length]);

  const goToLast = useCallback(() => {
    setCurrentIndex(images.length - 1);
    setIsPlaying(false);
  }, [images.length]);

  const handleSliderChange = useCallback(
    (_event: ChangeEvent<HTMLInputElement>, newValue: number[]) => {
      setCurrentIndex(newValue[0] - 1); // Convert 1-indexed slider to 0-indexed
      setIsPlaying(false);
    },
    [],
  );

  if (images.length === 0) {
    return (
      <Styled.NoImagesContainer>
        <Typography variant="body_short" color="textTertiary">
          No images available yet.
        </Typography>
      </Styled.NoImagesContainer>
    );
  }

  // Check if current image is loading (currentQuery already defined above)
  const isLoadingCurrentImage = currentQuery?.isLoading ?? false;

  return (
    <Styled.Container>
      {title && <Typography variant="h6">{title}</Typography>}

      <Styled.ImageContainer>
        {isLoadingCurrentImage && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body_short">Loading image...</Typography>
          </div>
        )}
        {!isLoadingCurrentImage && currentImageUrl && (
          <img src={currentImageUrl} alt={`${currentStepLabel}`} />
        )}
        {!isLoadingCurrentImage && !currentImageUrl && (
          <Typography variant="caption" color="textTertiary">
            Failed to load image
          </Typography>
        )}
      </Styled.ImageContainer>

      <Styled.ControlsContainer>
        <Styled.SliderWrapper>
          <Styled.StepLabel variant="caption">
            {currentStepLabel}
          </Styled.StepLabel>
          <Slider
            value={sliderValue}
            max={images.length}
            min={1}
            step={1}
            onChange={handleSliderChange}
            aria-label="Image index slider"
          />
          <Styled.FrameInfo variant="caption">
            {currentIndex + 1} / {images.length}
          </Styled.FrameInfo>
        </Styled.SliderWrapper>

        <Styled.ButtonGroup>
          <Button
            variant="ghost_icon"
            onClick={goToFirst}
            disabled={currentIndex === 0 || isPlaying || isLoadingCurrentImage}
            title="Go to first"
          >
            <Icon name="first_page" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToPrevious}
            disabled={isPlaying || isLoadingCurrentImage}
            title="Previous frame"
          >
            <Icon name="chevron_left" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={togglePlayPause}
            disabled={isLoadingCurrentImage}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'pause_circle' : 'play_circle'} size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToNext}
            disabled={isPlaying || isLoadingCurrentImage}
            title="Next frame"
          >
            <Icon name="chevron_right" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToLast}
            disabled={
              currentIndex === images.length - 1 ||
              isPlaying ||
              isLoadingCurrentImage
            }
            title="Go to last"
          >
            <Icon name="last_page" size={32} />
          </Button>
        </Styled.ButtonGroup>
      </Styled.ControlsContainer>
    </Styled.Container>
  );
};
