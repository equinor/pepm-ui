import { Outlet, useParams } from 'react-router-dom'
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame'
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'
import * as Styled from './Model.styled'

export const Model = () => {
  const { id } = useParams<{ id: string }>()
  const { model } = useAnalogueModels(id)

  return (
    <>
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Styled.ContentWrapper>
          {model && <ModelNameFrame model={model} />}
          <Outlet />
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    </>
  )
}
