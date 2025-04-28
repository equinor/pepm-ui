import { useState } from 'react';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { DeleteModel } from './DeleteButton/DeleteModel';
import { ModelAreaCoordinates } from './ModelAreaCoordinates/ModelAreaCoordinates';
import { ModelFilesView } from './ModelFilesView/ModelFilesView';
import * as Styled from './ModelView.styled';
import { CoordinatesDialog } from '../AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ModelArchelMap } from './ModelArchelMap/ModelArchelMap';

export const ModelView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Styled.MetadataWrapper>
        <ModelMetadataView />
        <ModelArchelMap />
        <ModelAreaCoordinates toggleOpen={toggleOpen}></ModelAreaCoordinates>
        <ModelFilesView />
        <DeleteModel />
      </Styled.MetadataWrapper>
      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
