/* eslint-disable max-lines-per-function */
import {
  Button,
  CircularProgress,
  Dialog,
  Tabs,
  Typography,
} from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getVariogramImage } from '../../../../../../api/custom/getImageById';
import { GetVariogramResultsVariogramResultFileDto } from '../../../../../../api/generated';
import * as Styled from './ImageResult.styled';

export const ImageResult = ({
  open,
  setOpen,
  resultImages,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resultImages: GetVariogramResultsVariogramResultFileDto[];
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  const variogramSlices =
    resultImages &&
    resultImages.find((x) => x.fileName.includes('variogram_slices_'));
  const variogramSlicesImageId =
    variogramSlices && variogramSlices.variogramResultFileId;

  const loadedVariogramSlicesImage = useQuery({
    queryKey: ['case-image', variogramSlicesImageId],
    queryFn: () => getVariogramImage(variogramSlicesImageId as string),
    enabled: !!variogramSlicesImageId,
  });

  const sphericalImage =
    resultImages && resultImages.find((x) => x.fileName.includes('spherical-'));
  const sphericalImageId =
    sphericalImage && sphericalImage.variogramResultFileId;

  const loadedSphericalImage = useQuery({
    queryKey: ['case-image', sphericalImageId],
    queryFn: () => getVariogramImage(sphericalImageId as string),
    enabled: !!sphericalImageId,
  });

  const gaussianImage =
    resultImages && resultImages.find((x) => x.fileName.includes('gaussian'));
  const gaussianImageId = gaussianImage && gaussianImage.variogramResultFileId;
  const loadedGaussianImage = useQuery({
    queryKey: ['case-image', gaussianImageId],
    queryFn: () => getVariogramImage(gaussianImageId as string),
    enabled: !!gaussianImageId,
  });

  const generalExponentialImage =
    resultImages &&
    resultImages.find((x) => x.fileName.includes('general_exponential'));
  const generalExponentialImageId =
    generalExponentialImage && generalExponentialImage.variogramResultFileId;
  const loadedGeneralExponentialImage = useQuery({
    queryKey: ['case-image', generalExponentialImageId],
    queryFn: () => getVariogramImage(generalExponentialImageId as string),
    enabled: !!generalExponentialImageId,
  });

  const exponentialImage =
    resultImages &&
    resultImages.find((x) => x.fileName.includes('-exponential'));
  const exponentialImageId =
    exponentialImage && exponentialImage.variogramResultFileId;
  const loadedExponentialImage = useQuery({
    queryKey: ['case-image', exponentialImageId],
    queryFn: () => getVariogramImage(exponentialImageId as string),
    enabled: !!exponentialImageId,
  });

  return (
    <Styled.Dialog open={open} isDismissable>
      <Styled.Content>
        <Tabs activeTab={activeTab} onChange={handleChange} className="tabs">
          <Tabs.List>
            <Tabs.Tab>Variogram slice</Tabs.Tab>
            <Tabs.Tab>Spherical</Tabs.Tab>
            <Tabs.Tab>Gaussian</Tabs.Tab>
            <Tabs.Tab>General Exponential</Tabs.Tab>
            <Tabs.Tab>Exponential</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels className="tabs-panels">
            <Tabs.Panel className="tabs-panel">
              <>
                {loadedVariogramSlicesImage.isLoading && (
                  <>
                    <CircularProgress
                      color="primary"
                      size={24}
                      value={100}
                      variant="indeterminate"
                    />
                  </>
                )}

                {loadedVariogramSlicesImage.data && (
                  <Styled.ImageWrapper>
                    <img
                      className="image"
                      alt="Case results"
                      src={
                        loadedVariogramSlicesImage.data
                          ? loadedVariogramSlicesImage.data
                          : ''
                      }
                    />
                  </Styled.ImageWrapper>
                )}
              </>
            </Tabs.Panel>
            <Tabs.Panel className="tabs-panel">
              <>
                {loadedSphericalImage && loadedSphericalImage.data ? (
                  <>
                    {loadedSphericalImage.isLoading && (
                      <>
                        <CircularProgress
                          color="primary"
                          size={24}
                          value={100}
                          variant="indeterminate"
                        />
                      </>
                    )}
                    {loadedSphericalImage.data && (
                      <Styled.ImageWrapper>
                        <img
                          className="image"
                          alt="Spherical"
                          src={
                            loadedSphericalImage.data
                              ? loadedSphericalImage.data
                              : ''
                          }
                        />
                      </Styled.ImageWrapper>
                    )}
                  </>
                ) : (
                  <Styled.ImageWrapper>
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Spherical variogram model is not included in the result
                    </Typography>
                  </Styled.ImageWrapper>
                )}
              </>
            </Tabs.Panel>
            <Tabs.Panel className="tabs-panel">
              <>
                {loadedGaussianImage && loadedGaussianImage.data ? (
                  <>
                    {loadedGaussianImage.isLoading && (
                      <>
                        <CircularProgress
                          color="primary"
                          size={24}
                          value={100}
                          variant="indeterminate"
                        />
                      </>
                    )}
                    {loadedGaussianImage.data && (
                      <Styled.ImageWrapper>
                        <img
                          className="image"
                          alt="Gaussian"
                          src={
                            loadedGaussianImage.data
                              ? loadedGaussianImage.data
                              : ''
                          }
                        />
                      </Styled.ImageWrapper>
                    )}
                  </>
                ) : (
                  <Styled.ImageWrapper>
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Gaussian variogram model is not included in the result
                    </Typography>
                  </Styled.ImageWrapper>
                )}
              </>
            </Tabs.Panel>

            <Tabs.Panel className="tabs-panel">
              <>
                {loadedGeneralExponentialImage &&
                loadedGeneralExponentialImage.data ? (
                  <>
                    {loadedGeneralExponentialImage.isLoading && (
                      <>
                        <CircularProgress
                          color="primary"
                          size={24}
                          value={100}
                          variant="indeterminate"
                        />
                      </>
                    )}
                    {loadedGeneralExponentialImage.data && (
                      <Styled.ImageWrapper>
                        <img
                          className="image"
                          alt="General Exponential"
                          src={
                            loadedGeneralExponentialImage.data
                              ? loadedGeneralExponentialImage.data
                              : ''
                          }
                        />
                      </Styled.ImageWrapper>
                    )}
                  </>
                ) : (
                  <Styled.ImageWrapper>
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      General exponential variogram model is not included in the
                      result
                    </Typography>
                  </Styled.ImageWrapper>
                )}
              </>
            </Tabs.Panel>
            <Tabs.Panel className="tabs-panel">
              <>
                {loadedExponentialImage && loadedExponentialImage.data ? (
                  <>
                    {loadedExponentialImage.isLoading && (
                      <>
                        <CircularProgress
                          color="primary"
                          size={24}
                          value={100}
                          variant="indeterminate"
                        />
                      </>
                    )}
                    {loadedExponentialImage.data && (
                      <Styled.ImageWrapper>
                        <img
                          className="image"
                          alt="Exponential"
                          src={
                            loadedExponentialImage.data
                              ? loadedExponentialImage.data
                              : ''
                          }
                        />
                      </Styled.ImageWrapper>
                    )}
                  </>
                ) : (
                  <Styled.ImageWrapper>
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Exponential variogram model is not included in the result
                    </Typography>
                  </Styled.ImageWrapper>
                )}
              </>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Styled.Content>

      <Dialog.Actions>
        <Button variant="contained" onClick={() => setOpen(!open)}>
          Close this window
        </Button>
      </Dialog.Actions>
    </Styled.Dialog>
  );
};
