import { useQuery } from '@tanstack/react-query';
// import { ImageView } from '../../../../../../components/ImageView/ImageView';

import { useMsal } from '@azure/msal-react';
import { GetVariogramResultsVariogramResultFileDto } from '../../../../../../api/generated';
import { useAccessToken } from '../../../../../../hooks/useAccessToken';
import { getVariogramImage } from '../../../../../../api/custom/getImageById';
// import { ImageView } from '../../../../../../components/ImageView/ImageView';

export const ImageResult = ({
  resultFiels,
}: {
  resultFiels: GetVariogramResultsVariogramResultFileDto[];
}) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const wantedResultFile = resultFiels.find((x) =>
    x.fileName.includes('variogram_slices_'),
  );

  const imageId = wantedResultFile
    ? wantedResultFile.variogramResultFileId
    : '';

  const { data } = useQuery({
    queryKey: ['model-cases', imageId],
    queryFn: () => getVariogramImage(imageId),
    enabled: !!token,
    refetchInterval: 30000,
  });

  return (
    <>
      <img src={data ? data : ''} alt="lol" />
      {/* <ImageView text="run" img={imageUrl} altText="run"></ImageView> */}
    </>
  );
};
