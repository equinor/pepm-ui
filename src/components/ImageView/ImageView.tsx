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
      <h5>{text}</h5>
    </Styled.ImageWrapper>
  );
};
