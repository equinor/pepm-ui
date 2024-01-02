import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { AnalogueModelsService, OpenAPI } from '../../../api/generated';
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame';
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar';
import { useAccessToken } from '../../../hooks/useAccessToken';
import * as Styled from './Model.styled';

export const Model = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;

  const { data } = useQuery({
    queryKey: ['analogue-model', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
    enabled: !!token,
  });

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
