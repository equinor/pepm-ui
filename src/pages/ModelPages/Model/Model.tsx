/* eslint-disable max-lines-per-function */
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
import { usePepmContextStore } from '../../../stores/GlobalStore';
import { useFetchModelAreas } from '../../../hooks/useFetchModelAreas';
import { useFetchOutcropData } from '../../../hooks/useFetchOutcropData';
import {
  useFetchSmdaCountries,
  useFetchSmdaFields,
  useFetchSmdaMetadataStratigraphicUnits,
  useFetchSmdaStratigraphicColumns,
} from '../../../hooks/useFetchStratColData';
import { useFetchGrossDepData } from '../../../hooks/useFetchGrossDepData';
import { useFetchCases } from '../../../hooks/useFetchCases';
import { useFetchComputeSettings } from '../../../hooks/useFetchComputeSettings';
import { useFetchImage } from '../../../hooks/useFetchImage';
import { useFetchImageMetadata } from '../../../hooks/useFetchImageMetadata';

// eslint-disable-next-line camelcase
Icon.add({ mood_sad });

export const Model = () => {
  const { data, isLoading, failureReason } = useFetchModel();
  const modelArea = useFetchModelAreas();
  const outcropData = useFetchOutcropData();
  const countryData = useFetchSmdaCountries();
  const fieldData = useFetchSmdaFields();
  const stratColumnData = useFetchSmdaStratigraphicColumns();
  const stratUnitData = useFetchSmdaMetadataStratigraphicUnits();
  const geologyStandards = useFetchGrossDepData();
  const cases = useFetchCases();
  const computeSettings = useFetchComputeSettings();
  const image = useFetchImage();
  const imageMetadata = useFetchImageMetadata();

  const {
    setAnalogueModel,
    setAnalogueModelImage,
    setComputeCases,
    setModelAreaTypes,
    setOutcrops,
    setCountries,
    setFields,
    setStratigraphicColumns,
    setStratigraphicUnits,
    setGeologicalStandards,
    setComputeSettings,
    setAnalogueModelImageMetadata,
  } = usePepmContextStore();

  useEffect(() => {
    if (data?.data) setAnalogueModel(data.data.data);
  }, [data, setAnalogueModel]);

  useEffect(() => {
    if (image.data) setAnalogueModelImage(image.data);
    if (imageMetadata.data?.data?.data)
      setAnalogueModelImageMetadata(imageMetadata.data.data.data);
    if (cases.data?.data?.data) setComputeCases(cases.data.data.data);
    if (modelArea.data?.data?.data) setModelAreaTypes(modelArea.data.data.data);
    if (outcropData.data?.data?.data) setOutcrops(outcropData.data.data.data);
    if (geologyStandards.data?.data?.data)
      setGeologicalStandards(geologyStandards.data.data.data);
    if (computeSettings.data?.data?.data)
      setComputeSettings(computeSettings.data.data.data);
  }, [
    cases.data?.data,
    image,
    geologyStandards.data?.data,
    modelArea.data?.data,
    outcropData.data?.data,
    computeSettings.data?.data,
    imageMetadata.data?.data,
    setAnalogueModelImage,
    setAnalogueModelImageMetadata,
    setComputeCases,
    setGeologicalStandards,
    setModelAreaTypes,
    setOutcrops,
    setComputeSettings,
  ]);

  useEffect(() => {
    if (countryData.data?.data) setCountries(countryData.data.data.data);
    if (fieldData.data?.data) setFields(fieldData.data.data.data);
    if (stratColumnData.data?.data)
      setStratigraphicColumns(stratColumnData.data.data.data);
    if (stratUnitData.data?.data)
      setStratigraphicUnits(stratUnitData.data.data.data);
  }, [
    countryData.data?.data,
    fieldData.data?.data,
    setCountries,
    setFields,
    setStratigraphicColumns,
    setStratigraphicUnits,
    stratColumnData.data?.data,
    stratUnitData.data?.data,
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
          />
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
