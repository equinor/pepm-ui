/* eslint-disable sort-imports */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { HandleModelComponent } from '../../features/HandleModel/HandleModelComponent/HandleModelComponent';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import * as Styled from './AddModel.styled';

import { usePepmContextStore } from '../../stores/GlobalStore';
import { useAddModelStore } from './stores/AddModelStore';
import { SidePane } from '../../features/HandleModel/SidePane/SidePane';

export const AddModel = () => {
  const { analogueModel } = usePepmContextStore();
  const { uploading, uploadStatus } = useAddModelStore();

  return (
    <Styled.PageLayout>
      <SidePane uploading={uploading} />

      <Styled.Content>
        <Typography variant="h2" as="h1">
          New model
        </Typography>
        <HandleModelComponent />
        {analogueModel.analogueModelId !== '' && (
          <>
            <ModelMetadataView
              modelIdParent={analogueModel.analogueModelId}
              uploadingStatus={uploadStatus}
            />
          </>
        )}
      </Styled.Content>

      {/* {errorBannerOpen && <MessageBanner message={"Could not upload the model. Please check that you have correct ini-file and try again. If it does not work, make sure your .nc file is correct"} setOpen={setErrorBannerOpen} isError={true}></MessageBanner>} */}
      {/* {uploadStatus === UploadStatus.COMPLETED && successBannerOpen && <MessageBanner message={UploadProcess.SUCCESS} setOpen={setSuccessBannerOpen} isError={false}></MessageBanner>} */}
    </Styled.PageLayout>
  );
};
