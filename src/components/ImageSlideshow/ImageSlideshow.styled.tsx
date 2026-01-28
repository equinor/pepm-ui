import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.MEDIUM};
  width: 100%;
  max-width: 100%;
  padding: ${spacings.MEDIUM};
  overflow: hidden;
  box-sizing: border-box;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  will-change: contents;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.SMALL};
  align-items: center;
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.X_SMALL};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
`;

export const StepLabel = styled(Typography)`
  text-align: center;
  font-weight: 500;
  color: ${theme.light.text.staticIconsDefault};
`;

export const FrameInfo = styled(Typography)`
  text-align: center;
  color: ${theme.light.text.staticIconsTertiary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacings.X_SMALL};
  align-items: center;
  justify-content: center;
`;

export const NoImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacings.XXX_LARGE};
  min-height: 200px;
`;
