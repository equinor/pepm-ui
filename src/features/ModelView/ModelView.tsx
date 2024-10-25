import { useState } from 'react';
import { CoordinatesDialog } from '../../components/AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { DeleteModel } from './DeleteButton/DeleteModel';
import { ModelAreaCoordinates } from './ModelAreaCoordinates/ModelAreaCoordinates';
import { ModelFilesView } from './ModelFilesView/ModelFilesView';
import * as Styled from './ModelView.styled';

export const ModelView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Styled.MetadataWrapper>
        <ModelMetadataView />
        <ModelAreaCoordinates toggleOpen={toggleOpen}></ModelAreaCoordinates>
        <ModelFilesView />
        <DeleteModel />
      </Styled.MetadataWrapper>
      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
