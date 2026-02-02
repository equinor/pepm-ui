import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacings.MEDIUM};
  padding: ${spacings.LARGE};
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

export const TabsWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  /* Force tabs container to respect width */
  > div {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Make tabs fill width when possible, scroll on smaller screens */
  [role='tablist'] {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    button {
      flex: 1 1 auto;
      min-width: fit-content;
      white-space: nowrap;
    }
  }

  /* Force panels to respect width */
  [role='tabpanel'] {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
`;

export const ImagePanel = styled.div`
  min-height: 400px;
  padding: ${spacings.LARGE} 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
`;

export const NoImagesMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacings.MEDIUM};
`;

export const ImageGridCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.LARGE};
`;

export const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageWrapperCentered = styled.div`
  width: 100%;
  max-width: 1400px;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;
