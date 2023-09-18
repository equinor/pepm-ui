import { ModelType } from '../../../pages/Model/Model'
import * as Styled from './ModelNameFrame.styled'

export const ModelNameFrame = ({ model }: { model: ModelType }) => {
  return (
    <Styled.NameFrame className="metadata-name-frame">
      <h1>{model.name}</h1>
    </Styled.NameFrame>
  )
}
