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
  // function _arrayBufferToBase64(buffer: any) {
  //   let binary = '';
  //   const bytes = new Uint8Array(buffer);
  //   const len = bytes.byteLength;
  //   for (let i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return window.btoa(binary);
  // }

  // const [res, setRes] = useState<string>();

  // useEffect(() => {
  //   const res = _arrayBufferToBase64(img);
  //   setRes(res);
  // }, [img]);
  // console.log(res);

  return (
    <Styled.ImageWrapper>
      <img className="image" alt={altText} src={img} />
      <Typography variant="h5">{text}</Typography>
    </Styled.ImageWrapper>
  );
};

// `data:image/png;base64,${img}`
