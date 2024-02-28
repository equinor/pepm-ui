import { Button, Dialog } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { getVariogramImage } from '../../../../../../api/custom/getImageById';
import { ImageView } from '../../../../../../components/ImageView/ImageView';
import * as Styled from './ImageResult.styled';

export const ImageResult = ({
  imageId,
  open,
  setOpen,
}: {
  imageId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['case-image', imageId],
    queryFn: () => getVariogramImage(imageId),
    enabled: open,
  });

  return (
    <>
      <Styled.Dialog open={open} isDismissable>
        <Dialog.Header>
          <Dialog.Title>Result image</Dialog.Title>
        </Dialog.Header>
        <Styled.Content>
          {isLoading && <>Loading ...</>}
          {data && (
            <ImageView
              text="Case results"
              img={data ? data : ''}
              altText="Case results"
            ></ImageView>
          )}
        </Styled.Content>

        <Dialog.Actions>
          <Button variant="ghost" onClick={() => setOpen(!open)}>
            Close
          </Button>
        </Dialog.Actions>
      </Styled.Dialog>
    </>
  );
};
