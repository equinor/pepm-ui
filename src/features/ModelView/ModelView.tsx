import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { DeleteModel } from './DeleteButton/DeleteModel';
import * as Styled from './ModelView.styled';

export const ModelView = () => {
  return (
    <>
      <Styled.MetadataWrapper>
        <ModelMetadataView />
        <DeleteModel />
      </Styled.MetadataWrapper>
    </>
  );
};
