import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { getVariogramImage } from '../../../../../../api/custom/getImageById';
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
    <Styled.Dialog open={open} isDismissable>
      <Styled.Content>
        {isLoading && <>Loading ...</>}
        {data && (
          <Styled.ImageWrapper>
            <img className="image" alt="Case results" src={data ? data : ''} />
            <Typography variant="h5">Case results</Typography>
          </Styled.ImageWrapper>
        )}
      </Styled.Content>

      <Dialog.Actions>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          Close
        </Button>
      </Dialog.Actions>
    </Styled.Dialog>
  );
};
