import { useQuery } from '@tanstack/react-query'
import { Outlet, useParams } from 'react-router-dom'
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame'
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar'
import { components } from '../../../models/schema'
import * as Styled from './Model.styled'

export type ModelType = Partial<
  components['schemas']['GetAnalogueModelQueryResponse']['data']
>

export const Model = () => {
  const { id } = useParams<{ id: string }>()
  const model = useQuery(['models', 'token', { analogueModelId: id }])

  return (
    <>
      <ModelNameFrame model={model as ModelType} />
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Outlet />
      </Styled.Wrapper>
    </>
  )
}
