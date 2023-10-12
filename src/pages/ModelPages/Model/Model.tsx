import { Outlet, useParams } from 'react-router-dom';
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame';
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar';
import * as Styled from './Model.styled';
import { useQuery } from '@tanstack/react-query';
import { AnalogueModelsService } from '../../../api/generated';

export const Model = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['analogue-models', id],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(id as string),
  });

  if (isLoading) <p>Loading.....</p>;

  return (
    <>
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Styled.ContentWrapper>
          {data?.success && <ModelNameFrame model={data.data} />}

          <Outlet />
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    </>
  );
};
