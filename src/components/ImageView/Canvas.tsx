import { useEffect, useRef } from 'react';
import { ImageMetadataDto } from '../../api/generated';
import { AreaCoordinateType } from '../AreaCoordinates/AreaCoordinates';

const Canvas = ({
  imageData,
  imageMetadata,
  coordinateBox,
}: {
  imageData: string;
  imageMetadata: ImageMetadataDto;
  coordinateBox: AreaCoordinateType;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return; // current may be null
    const context = canvas.getContext('2d');
    if (context == null) return; // context may be null
    // Our first draw
    const img = new Image();
    img.src = imageData;
    const tickInterval = 1000;
    const canvasOffset = 80;
    const imageYOffset = 10;
    const imageXOffset = 40;

    // rotated coordinate system
    const x0 = imageMetadata.boundingBox.y0;
    const x1 = imageMetadata.boundingBox.y1;
    const y0 = imageMetadata.boundingBox.x0;
    const y1 = imageMetadata.boundingBox.x1;

    const xRange = x1 - x0;
    const yRange = y1 - y0;

    // const xRange = imageMetadata.boundingBox.x1 - imageMetadata.boundingBox.x0;
    // const yRange = imageMetadata.boundingBox.y1 - imageMetadata.boundingBox.y0;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newWidth = img.width * 0.3;
      const newHeight = newWidth / aspectRatio;

      // Flipping height and width to flip the picture
      const height = newWidth;
      const width = newHeight;

      canvas.width = width + canvasOffset;
      canvas.height = height + canvasOffset;

      // rotate image 90 degrees
      context.save();
      context.translate(imageXOffset, imageYOffset); // Move origin to center of canvas
      context.rotate((90 * Math.PI) / 180); // Rotate 90 degrees (convert to radians)
      context.drawImage(img, 0, -width, height, width); // Draw image with its center at the origin
      context.restore();

      // Calculate scaling factors from coordinate space to canvas pixels
      const xScale = height / xRange;
      const yScale = width / yRange;

      // context.drawImage(img, imageXOffset, imageYOffset, newWidth, newHeight);

      // Draw x and y axes
      context.strokeStyle = 'black';
      context.lineWidth = 2;

      // Draw x-axis (horizontal line)
      context.beginPath();
      context.moveTo(imageXOffset, height + imageYOffset);
      context.lineTo(width + imageXOffset, height + imageYOffset);
      context.stroke();

      // Draw y-axis (vertical line)
      context.beginPath();
      context.moveTo(imageXOffset, imageYOffset);
      context.lineTo(imageXOffset, height + imageYOffset);
      context.stroke();

      for (
        let xTick =
          Math.ceil(imageMetadata.boundingBox.x0 / tickInterval) * tickInterval;
        xTick <= imageMetadata.boundingBox.x1;
        xTick += tickInterval
      ) {
        const tickX = (xTick - imageMetadata.boundingBox.x0) * xScale;

        context.textAlign = 'start';
        context.textBaseline = 'middle';
        context.strokeStyle = 'black';

        // Draw tick line
        context.beginPath();
        context.moveTo(
          tickX + imageXOffset,
          canvas.height - canvasOffset + imageYOffset,
        );
        context.lineTo(
          tickX + imageXOffset,
          canvas.height - canvasOffset + imageYOffset + 10,
        );
        context.stroke();

        // Draw tick label
        context.fillText(
          xTick.toFixed(0),
          tickX + imageXOffset,
          canvas.height - canvasOffset + 30,
        );
      }

      for (
        let yTick =
          Math.ceil(imageMetadata.boundingBox.y0 / tickInterval) * tickInterval;
        yTick <= imageMetadata.boundingBox.y1;
        yTick += tickInterval
      ) {
        // Flip the y-coordinate to start from bottom-left
        const tickY =
          height +
          imageYOffset -
          (yTick - imageMetadata.boundingBox.y0) * yScale;
        context.textAlign = 'start';
        context.textBaseline = 'middle';
        context.strokeStyle = 'black';

        // Draw tick line
        context.beginPath();
        context.moveTo(imageXOffset, tickY);
        context.lineTo(imageXOffset - 10, tickY);
        context.stroke();

        // Draw tick label
        context.fillText(yTick.toFixed(0), 0, tickY);
      }
      if (coordinateBox) {
        const boxX0 = coordinateBox.coordinates.find((x) => x.m === 0)?.x;
        const boxX1 = coordinateBox.coordinates.find((x) => x.m === 1)?.x;
        const boxY0 = coordinateBox.coordinates.find((x) => x.m === 0)?.y;
        const boxY1 = coordinateBox.coordinates.find((x) => x.m === 1)?.y;

        if (boxX0 && boxX1 && boxY0 && boxY1) {
          // Calculate the box position and size in canvas pixel space
          const boxCanvasX = (boxX0 - imageMetadata.boundingBox.x0) * xScale;
          const boxCanvasY =
            height +
            imageYOffset -
            (boxY1 - imageMetadata.boundingBox.y0) * yScale; // Flip y-coordinates
          const boxWidth = (boxX1 - boxX0) * xScale;
          const boxHeight = (boxY1 - boxY0) * yScale;

          // Draw the box
          context.strokeStyle = 'red';
          context.lineWidth = 2;
          context.strokeRect(
            boxCanvasX + imageXOffset,
            boxCanvasY,
            boxWidth,
            boxHeight,
          );
        }
      }
    };
  }, [imageData, imageMetadata, coordinateBox]);
  return <canvas ref={canvasRef} />;
};

export default Canvas;
