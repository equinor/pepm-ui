import { useState } from 'react';
import { CoordinatesDialog } from '../../components/AreaCoordinates/CoordinatesDialog/CoordinatesDialog';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import { DeleteModel } from './DeleteButton/DeleteModel';
import { ModelAreaCoordinates } from './ModelAreaCoordinates/ModelAreaCoordinates';
import { ModelFilesView } from './ModelFilesView/ModelFilesView';
import * as Styled from './ModelView.styled';
import { useFetchModel } from '../../hooks/useFetchModel';
import { isOwnerOrAdmin } from '../../utils/IsOwnerOrAdmin';

export const ModelView = () => {
  const { data } = useFetchModel();
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const hideContent = () => {
    return isOwnerOrAdmin(data?.data?.createdBy);
  };

  return (
    <>
      <Styled.MetadataWrapper>
        <ModelMetadataView />
        <ModelAreaCoordinates
          toggleOpen={toggleOpen}
          hideContent={hideContent}
        ></ModelAreaCoordinates>
        <ModelFilesView />
        <DeleteModel hideContent={hideContent} />
      </Styled.MetadataWrapper>
      <CoordinatesDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
