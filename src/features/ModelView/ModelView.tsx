import { useState } from 'react';
import { CoordinatesDialog } from '../../components/AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ImageView } from '../../components/ImageView/ImageView';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { ModelAreaCoordinates } from './ModelAreaCoordinates/ModelAreaCoordinates';
import { ModelFilesView } from './ModelFilesView/ModelFilesView';
import * as Styled from './ModelView.styled';
import Img from './image.png';

export const ModelView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Styled.MetadataWrapper>
        <Styled.InnerMetadataWrapper>
          <ModelMetadataView />
          <ModelAreaCoordinates toggleOpen={toggleOpen}></ModelAreaCoordinates>
          <ModelFilesView />
        </Styled.InnerMetadataWrapper>
        <ImageView
          text="Model placeholder image"
          img={Img}
          altText="Model placeholder image"
        />
      </Styled.MetadataWrapper>
      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
