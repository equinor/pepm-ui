import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'
import { components } from '../../../models/schema'
import * as Styled from './Model.styled'

import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame'
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar'

export type ModelType = Partial<
  components['schemas']['GetAnalogueModelQueryResponse']['data']
>

export const Model = () => {
  const [model, setModel] = useState<ModelType>()
  const { id } = useParams()
  const { fetchModel } = useAnalogueModels()

  useEffect(() => {
    async function getModel() {
      return await fetchModel({
        params: { path: { id: id ?? '' } },
      }).then((response) => response?.data)
    }
    if (!model) {
      getModel().then((model) => model && setModel(model as ModelType))
    }
  }, [id, model, fetchModel])

  return (
    <>
      {model && <ModelNameFrame model={model} />}
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Outlet />
      </Styled.Wrapper>
    </>
  )
}
