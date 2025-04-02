import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { DeleteModel } from './DeleteButton/DeleteModel';
import { ModelFilesView } from './ModelFilesView/ModelFilesView';
import * as Styled from './ModelView.styled';

export const ModelView = () => {
  return (
    <>
      <Styled.MetadataWrapper>
        <ModelMetadataView />
        <ModelFilesView />
        <DeleteModel />
      </Styled.MetadataWrapper>
    </>
  );
};
