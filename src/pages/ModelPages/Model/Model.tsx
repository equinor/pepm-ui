import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { AnalogueModelsService } from '../../../api/generated';
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame';
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar';
import * as Styled from './Model.styled';

export const Model = () => {
  const { modelId } = useParams<{ modelId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
  });

  if (isLoading) <p>Loading.....</p>;

  return (
    <>
      <Styled.Wrapper>
        <Styled.SidebarWrapper>
          <ModelNavigationBar />
        </Styled.SidebarWrapper>
        <Styled.ContentWrapper>
          <ModelNameFrame model={data?.data} />

          <Outlet />
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    </>
  );
};
