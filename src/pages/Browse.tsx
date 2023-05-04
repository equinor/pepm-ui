import { useAnalogueModels } from '../hooks/useAnalogueModels'

export const Browse = () => {
  const models = useAnalogueModels()

  return (
    <>
      {models?.map((model) => (
        <p key={model.name}>{model.name}</p>
      ))}
    </>
  )
}
