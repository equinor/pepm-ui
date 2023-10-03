import { Outlet, useParams } from 'react-router-dom'
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame'
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar'
import { useAnalogueModels } from '../../../hooks/useAnalogueModels'
import * as Styled from './Model.styled'

export const Model = () => {
  const { id } = useParams<{ id: string }>()
  const { model } = useAnalogueModels(id!)

  if (model.isLoading) <p>Loading.....</p>

  return (
    <>
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Styled.ContentWrapper>
          {!model.isLoadingError && model.isFetched && (
            <ModelNameFrame model={model.data.data} />
          )}
          <Outlet />
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    </>
  )
}
