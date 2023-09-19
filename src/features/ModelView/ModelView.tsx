import { ModelImageView } from '../../features/ModelView/ModelImageView/ModelImageView'
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView'
import { ModelSourceView } from '../../features/ModelView/ModelSourceView/ModelSourceView'
import * as Styled from './ModelView.styled'

export const ModelView = () => {
  return (
    <Styled.MetadataWrapper>
      <Styled.InnerMetadataWrapper>
        <ModelMetadataView />
        <ModelSourceView />
      </Styled.InnerMetadataWrapper>
      <ModelImageView />
    </Styled.MetadataWrapper>
  )
}
