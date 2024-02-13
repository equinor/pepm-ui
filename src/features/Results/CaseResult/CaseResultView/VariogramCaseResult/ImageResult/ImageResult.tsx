import { useQuery } from '@tanstack/react-query';
import { getVariogramImage } from '../../../../../../api/custom/getImageById';
import { GetVariogramResultsVariogramResultFileDto } from '../../../../../../api/generated';
import { ImageView } from '../../../../../../components/ImageView/ImageView';

export const ImageResult = ({
  resultFiels,
}: {
  resultFiels: GetVariogramResultsVariogramResultFileDto[];
}) => {
  const wantedResultFile = resultFiels.find((x) =>
    x.fileName.includes('variogram_slices_'),
  );

  const imageId = wantedResultFile
    ? wantedResultFile.variogramResultFileId
    : '';

  const { data } = useQuery({
    queryKey: ['case-image', imageId],
    queryFn: () => getVariogramImage(imageId),
  });

  return (
    <>
      <ImageView
        text="Case results"
        img={data ? data : ''}
        altText="Case results"
      ></ImageView>
    </>
  );
};
