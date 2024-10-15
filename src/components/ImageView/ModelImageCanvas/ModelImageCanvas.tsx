import { useEffect, useRef } from 'react';
import { ImageMetadataDto } from '../../../api/generated';
import { AreaCoordinateType } from '../../AreaCoordinates/AreaCoordinates';

export const ModelImageCanvas = ({
  imageData,
  imageMetadata,
  coordinateBox,
  showLegend,
  showCoordinates,
}: {
  imageData: string;
  imageMetadata: ImageMetadataDto;
  coordinateBox: AreaCoordinateType;
  showLegend: boolean;
  showCoordinates: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext('2d');
    if (context === null) return;

    const img = new Image();
    img.src = imageData;

    // Canvas settings
    const tickInterval = 1000;
    const canvasOffset = 100;
    const canvasXOffset = 300;
    const imageYOffset = 10;
    const imageXOffset = 40;

    // coordinate system
    const y0 = imageMetadata.boundingBox.y0;
    const y1 = imageMetadata.boundingBox.y1;
    const x0 = imageMetadata.boundingBox.x0;
    const x1 = imageMetadata.boundingBox.x1;

    const xRange = x1 - x0;
    const yRange = y1 - y0;

    img.onload = () => {
      // Scale image down based on the size of the parent
      const container = canvas.parentElement;
      const containerWidth = container!.clientWidth;
      const containerHeight = container!.clientHeight;
      const scaleX = containerWidth / img.width;
      const scaleY = containerHeight / img.height;
      const scale = Math.min(scaleX, scaleY); // Use the smaller scale factor

      // Calculate the new width and height
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const height = scaledHeight;
      const width = scaledWidth;

      // Canvas will be bigger than image
      canvas.width = width + canvasXOffset;
      canvas.height = height + canvasOffset;

      // Calculate scaling factors from coordinate space to canvas pixels
      const xScale = width / xRange;
      const yScale = height / yRange;

      // draw image with its top left corner at defined offset
      context.drawImage(img, imageXOffset, imageYOffset, width, height);

      if (showCoordinates) {
        context.strokeStyle = 'black';
        context.lineWidth = 2;

        // Draw x-axis
        context.beginPath();
        context.moveTo(imageXOffset, height + imageYOffset);
        context.lineTo(width + imageXOffset, height + imageYOffset);
        context.stroke();

        // Draw y-axis
        context.beginPath();
        context.moveTo(imageXOffset, imageYOffset);
        context.lineTo(imageXOffset, height + imageYOffset);
        context.stroke();

        // Draw x ticks
        for (
          let xTick =
            Math.ceil(imageMetadata.boundingBox.x0 / tickInterval) *
            tickInterval;
          xTick <= imageMetadata.boundingBox.x1;
          xTick += tickInterval
        ) {
          const tickX = (xTick - imageMetadata.boundingBox.x0) * xScale;

          const tickLabel = xTick.toFixed(0);

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

          context.fillText(
            tickLabel,
            tickX + imageXOffset - 10,
            canvas.height - canvasOffset + 30,
            24,
          );
        }

        // Draw y ticks
        for (
          let yTick =
            Math.ceil(imageMetadata.boundingBox.y0 / tickInterval) *
            tickInterval;
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

          // Draw axis labels
          context.fillText(
            'X',
            imageXOffset + width + 5,
            height + imageYOffset,
          );
          context.fillText('Y', imageXOffset - 3, imageYOffset - 5);
        }
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
      if (showLegend) {
        const legendX = canvas.width - 250; // Position the legend on the right
        const legendY = 50; // Starting y position for the legend
        const legendBoxSize = 20; // Size of each color box
        const legendSpacing = 30; // Spacing between legend items

        let currentY = legendY;

        // Iterate through the dictionary and draw each color and label
        for (const [key, color] of Object.entries(imageMetadata.colorLegend)) {
          // Draw the color box
          context.fillStyle = color;
          context.fillRect(legendX, currentY, legendBoxSize, legendBoxSize);

          // Draw the text label
          context.fillStyle = 'black';
          context.font = '16px Arial';
          context.textBaseline = 'middle';
          context.fillText(
            `${key}`,
            legendX + legendBoxSize + 10,
            currentY + legendBoxSize / 2,
          );

          // Move to the next position
          currentY += legendSpacing;
        }
      }
    };
  }, [imageData, imageMetadata, coordinateBox, showCoordinates, showLegend]);

  return <canvas ref={canvasRef} />;
};
