import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import axios from 'axios';
import { client } from '../../api/generated/client.gen';
import * as Styled from './ImageSlideshow.styled';
import { useErrorStore } from '../../stores/ErrorStore';

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
  const [preloadedImages, setPreloadedImages] = useState<(string | null)[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUserDragging = useRef(false);
  const { addError } = useErrorStore();

  // Memoize step numbers and labels to avoid recalculating on every render
  const stepData = useMemo(() => {
    return images.map((filename, index) => {
      const dayMatch = filename.match(/day[_\s]?(\d+)/i);
      if (dayMatch) {
        const num = parseInt(dayMatch[1], 10);
        return { label: `Day ${num}`, value: num };
      }
      const stepMatch = filename.match(/(?:step|timestep)[_\s]?(\d+)/i);
      if (stepMatch) {
        const num = parseInt(stepMatch[1], 10);
        return { label: `Step ${num}`, value: num };
      }
      return { label: `Frame ${index + 1}`, value: index + 1 };
    });
  }, [images]);

  const stepValues = useMemo(() => stepData.map((d) => d.value), [stepData]);
  const minStep = useMemo(() => Math.min(...stepValues), [stepValues]);
  const maxStep = useMemo(() => Math.max(...stepValues), [stepValues]);

  const currentStepLabel = stepData[currentIndex]?.label || '';
  const currentStepValue = stepData[currentIndex]?.value || minStep;

  // Sync slider value with current step value when not dragging
  useEffect(() => {
    if (!isUserDragging.current) {
      setSliderValue(currentStepValue);
    }
  }, [currentStepValue]);

  // Preload all images on mount
  useEffect(() => {
    const fetchAllImages = async () => {
      if (images.length === 0) return;

      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
      setIsLoadingImages(true);
      const imageUrls: (string | null)[] = [];

      for (let i = 0; i < images.length; i++) {
        try {
          const response = await axios.get(
            `/api/v1/delft3d-orchestrations/${orchestrationId}/results/download`,
            {
              params: { file: images[i] },
              headers: { Authorization: `Bearer ${client.getConfig().auth}` },
              responseType: 'blob',
              baseURL: client.getConfig().baseURL,
            },
          );

          if (response.data) {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            imageUrls[i] = url;
          } else {
            imageUrls[i] = null;
          }
        } catch (error) {
          imageUrls[i] = null;
          addError(`Failed to load image: ${images[i]}`);
        }

        setLoadingProgress(Math.round(((i + 1) / images.length) * 100));
      }

      setPreloadedImages(imageUrls);
      setIsLoadingImages(false);
    };

    fetchAllImages();

    // Cleanup all blob URLs on unmount
    return () => {
      preloadedImages.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, orchestrationId]);

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
      }, 350);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setSliderValue(value);
      isUserDragging.current = true;

      // Find the closest index for this step value
      const closestIndex = stepValues.reduce((closest, stepVal, idx) => {
        const currentDiff = Math.abs(stepValues[closest] - value);
        const newDiff = Math.abs(stepVal - value);
        return newDiff < currentDiff ? idx : closest;
      }, 0);

      setCurrentIndex(closestIndex);
      setIsPlaying(false);
    },
    [stepValues],
  );

  const handleSliderMouseUp = useCallback(() => {
    isUserDragging.current = false;
  }, []);

  if (images.length === 0) {
    return (
      <Styled.NoImagesContainer>
        <Typography variant="body_short" color="textTertiary">
          No images available yet.
        </Typography>
      </Styled.NoImagesContainer>
    );
  }

  const currentImageUrl = preloadedImages[currentIndex];

  return (
    <Styled.Container>
      {title && <Typography variant="h6">{title}</Typography>}

      <Styled.ImageContainer>
        {isLoadingImages && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body_short">
              Loading images... {loadingProgress}%
            </Typography>
          </div>
        )}
        {!isLoadingImages && currentImageUrl && (
          <img src={currentImageUrl} alt={`${currentStepLabel}`} />
        )}
        {!isLoadingImages && !currentImageUrl && (
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
            max={maxStep}
            min={minStep}
            step={1}
            onChange={handleSliderChange}
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
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
            disabled={currentIndex === 0 || isPlaying || isLoadingImages}
            title="Go to first"
          >
            <Icon name="first_page" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToPrevious}
            disabled={isPlaying || isLoadingImages}
            title="Previous frame"
          >
            <Icon name="chevron_left" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={togglePlayPause}
            disabled={isLoadingImages}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'pause_circle' : 'play_circle'} size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToNext}
            disabled={isPlaying || isLoadingImages}
            title="Next frame"
          >
            <Icon name="chevron_right" size={32} />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={goToLast}
            disabled={
              currentIndex === images.length - 1 || isPlaying || isLoadingImages
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
