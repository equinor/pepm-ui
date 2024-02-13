import { Typography } from '@equinor/eds-core-react';
import * as Styled from './ImageView.styled';

export const ImageView = ({
  text,
  img,
  altText,
}: {
  text: string;
  img: string;
  altText: string;
}) => {
  return (
    <Styled.ImageWrapper>
      <img className="image" alt={altText} src={img} />
      <Typography variant="h5">{text}</Typography>
    </Styled.ImageWrapper>
  );
};
