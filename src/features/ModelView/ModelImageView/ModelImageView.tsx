import Img from '../image.png'
import * as Styled from './ModelImageView.syled'

export const ModelImageView = () => {
  // TODO
  // Load image and text from results
  return (
    <Styled.ImageWrapper className="metadata-image-view">
      <img className="metadata-image" alt="cat" src={Img} />
      <h5>Image Text</h5>
    </Styled.ImageWrapper>
  )
}
