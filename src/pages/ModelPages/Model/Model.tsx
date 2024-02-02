import { Outlet } from 'react-router-dom';
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame';
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar';
import { useFetchModel } from '../../../hooks/useFetchModel';
import * as Styled from './Model.styled';

export const Model = () => {
  const { data, isLoading, failureReason } = useFetchModel();

  if (failureReason) return <>An error occured</>;
  if (isLoading) return <>Loading ...</>;

  return (
    <Styled.Wrapper>
      <Styled.SidebarWrapper>
        <ModelNavigationBar />
      </Styled.SidebarWrapper>
      <Styled.ContentWrapper>
        <ModelNameFrame model={data?.data} />
        <Outlet />
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};
