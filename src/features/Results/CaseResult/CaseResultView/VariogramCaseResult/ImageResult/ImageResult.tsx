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
      <Dialog.CustomContent className="dialog-content">
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
                  <figure className="image-wrapper">
                    <img
                      className="image"
                      alt="Variogram x/y/z slice"
                      src={
                        loadedVariogramSlicesImage.data
                          ? loadedVariogramSlicesImage.data
                          : ''
                      }
                    />
                  </figure>
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
                      <figure className="image-wrapper">
                        <img
                          className="image"
                          alt="Spherical variogram (empirical and fitted)"
                          src={
                            loadedSphericalImage.data
                              ? loadedSphericalImage.data
                              : ''
                          }
                        />
                      </figure>
                    )}
                  </>
                ) : (
                  <figure className="image-wrapper">
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Spherical variogram model is not included in the result
                    </Typography>
                  </figure>
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
                      <figure className="image-wrapper">
                        <img
                          className="image"
                          alt="Gaussian variogram (empirical and fitted)"
                          src={
                            loadedGaussianImage.data
                              ? loadedGaussianImage.data
                              : ''
                          }
                        />
                      </figure>
                    )}
                  </>
                ) : (
                  <figure className="image-wrapper">
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Gaussian variogram model is not included in the result
                    </Typography>
                  </figure>
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
                      <figure className="image-wrapper">
                        <img
                          className="image"
                          alt="General Exponential variogram (empirical and fitted)"
                          src={
                            loadedGeneralExponentialImage.data
                              ? loadedGeneralExponentialImage.data
                              : ''
                          }
                        />
                      </figure>
                    )}
                  </>
                ) : (
                  <figure className="image-wrapper">
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      General exponential variogram model is not included in the
                      result
                    </Typography>
                  </figure>
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
                      <figure className="image-wrapper">
                        <img
                          className="image"
                          alt="Exponential variogram (empirical and fitted)"
                          src={
                            loadedExponentialImage.data
                              ? loadedExponentialImage.data
                              : ''
                          }
                        />
                      </figure>
                    )}
                  </>
                ) : (
                  <figure className="image-wrapper">
                    <Typography
                      variant="body_short"
                      className="placeholder-text"
                    >
                      Exponential variogram model is not included in the result
                    </Typography>
                  </figure>
                )}
              </>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Dialog.CustomContent>

      <Dialog.Actions>
        <Button variant="contained" onClick={() => setOpen(!open)}>
          Close this window
        </Button>
      </Dialog.Actions>
    </Styled.Dialog>
  );
};
