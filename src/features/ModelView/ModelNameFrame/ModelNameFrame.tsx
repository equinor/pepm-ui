import * as Styled from './ModelNameFrame.styled'

export const ModelNameFrame = ({ model }: { model: AnalogueModel }) => {
  return (
    <Styled.NameFrame className="metadata-name-frame">
      <h1>{model.name}</h1>
    </Styled.NameFrame>
  )
}
