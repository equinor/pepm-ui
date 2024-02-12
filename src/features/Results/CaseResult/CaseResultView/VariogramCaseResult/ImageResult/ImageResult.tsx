import { useQuery } from '@tanstack/react-query';
import { ImageView } from '../../../../../../components/ImageView/ImageView';

import { useMsal } from '@azure/msal-react';
import {
  GetVariogramResultsVariogramResultFileDto,
  ImagesService,
} from '../../../../../../api/generated';
import { useAccessToken } from '../../../../../../hooks/useAccessToken';

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
    queryFn: () => ImagesService.getApiImagesVariogram(imageId),
    enabled: !!token,
    refetchInterval: 30000,
  });

  //   const [dataUri, setDataUri] = useState<Blob>();

  //   useEffect(() => {
  //     function dataURItoBlob(dataURI: any) {
  //       const byteString = atob(dataURI.split(',')[1]);
  //       const ab = new ArrayBuffer(byteString.length);
  //       const ia = new Uint8Array(ab);
  //       for (let i = 0; i < byteString.length; i++) {
  //         ia[i] = byteString.charCodeAt(i);
  //       }
  //       const bb = new Blob([ab]);
  //       setDataUri(bb);
  //     }

  //     dataURItoBlob(data);
  //   }, [data, isLoading]);

  //   console.log(data);
  //   console.log(dataUri);

  return (
    <>
      <ImageView text="run" img={data} altText="run"></ImageView>
    </>
  );
};
