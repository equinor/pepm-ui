import { Outlet } from 'react-router-dom';
import { ModelNameFrame } from '../../../features/ModelView/ModelNameFrame/ModelNameFrame';
import { ModelNavigationBar } from '../../../features/ModelView/ModelNavigationBar/ModelNavigationBar';
import { useFetchModel } from '../../../hooks/useFetchModel';
import * as Styled from './Model.styled';
import {
  Banner,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { mood_sad } from '@equinor/eds-icons';
import { useEffect } from 'react';
import { usePepmContextStore } from '../../../hooks/GlobalState';
import { useFetchModelAreas } from '../../../hooks/useFetchModelAreas';
import { useFetchOutcropData } from '../../../hooks/useFetchOutcropData';

// eslint-disable-next-line camelcase
Icon.add({ mood_sad });

export const Model = () => {
  const { data, isLoading, failureReason } = useFetchModel();
  const modelArea = useFetchModelAreas();
  const outcropData = useFetchOutcropData();

  const { setAnalogueModel, setModelAreaTypes, setOutcrops } =
    usePepmContextStore();

  useEffect(() => {
    if (data) setAnalogueModel(data.data);
    if (modelArea.data?.data) setModelAreaTypes(modelArea.data.data);
    if (outcropData.data?.data) setOutcrops(outcropData.data.data);
  }, [
    data,
    modelArea.data?.data,

    outcropData.data?.data,
    setAnalogueModel,
    setModelAreaTypes,
    setOutcrops,
  ]);

  if (failureReason)
    return (
      <Styled.EmptyPage>
        <Banner>
          <Banner.Icon variant="warning">
            <Icon name="mood_sad" />
          </Banner.Icon>
          <Banner.Message>
            An error occured. Please try refreshing this page.
          </Banner.Message>
        </Banner>
      </Styled.EmptyPage>
    );

  if (isLoading)
    return (
      <Styled.EmptyPage>
        <div className="loading">
          <CircularProgress
            color="primary"
            size={24}
            value={100}
            variant="indeterminate"
          />{' '}
          <Typography variant="body_short">Loading, please wait…</Typography>
        </div>
      </Styled.EmptyPage>
    );

  return (
    <Styled.Wrapper>
      <Styled.SidebarWrapper>
        <ModelNavigationBar />
      </Styled.SidebarWrapper>
      <Styled.ContentWrapper>
        <ModelNameFrame />
        <Outlet />
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};
