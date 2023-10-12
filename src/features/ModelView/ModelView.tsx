import { ImageView } from '../../components/ImageView/ImageView';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { ModelSourceView } from '../../features/ModelView/ModelSourceView/ModelSourceView';
import * as Styled from './ModelView.styled';
import Img from './image.png';

export const ModelView = () => {
  return (
    <Styled.MetadataWrapper>
      <Styled.InnerMetadataWrapper>
        <ModelMetadataView />
        <ModelSourceView />
      </Styled.InnerMetadataWrapper>
      <ImageView
        text="Model placeholder image"
        img={Img}
        altText="Model placeholder image"
      />
    </Styled.MetadataWrapper>
  );
};
