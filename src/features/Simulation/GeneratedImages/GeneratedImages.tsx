/* eslint-disable max-lines-per-function */

import { useState } from 'react';
import { Tabs, Typography } from '@equinor/eds-core-react';
import { StaticImage } from '../../../components/StaticImage';
import { CategorizedImages } from '../../../hooks/useFetchCategorizedImages';
import * as Styled from './GeneratedImages.styled';
import { ImageSlideshow } from '../../../components/ImageSlideshow/ImageSlideshow';

const { List, Tab, Panels, Panel } = Tabs;

interface GeneratedImagesProps {
  images?: CategorizedImages | null;
  orchestrationId?: string;
}

type TabConfig = {
  label: string;
  data: string[] | undefined;
  isSlideshow: boolean;
};

export const GeneratedImages = ({
  images,
  orchestrationId,
}: GeneratedImagesProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabConfig[] = [
    {
      label: 'Histograms',
      data: images?.histograms,
      isSlideshow: false,
    },
    {
      label: 'Cross Section Grain Size',
      data: images?.crossSectionGrainSize,
      isSlideshow: true,
    },
    {
      label: 'Cross Section Architecture',
      data: images?.crossSectionArchitecture,
      isSlideshow: false,
    },
    {
      label: 'Bathymetry and Architecture',
      data: images?.bathymetryArchitecture,
      isSlideshow: true,
    },
    {
      label: 'Cross Section Deposition Age',
      data: images?.crossSectionDepositionAge,
      isSlideshow: false,
    },
    {
      label: 'Bathymetry and Deposition Rate',
      data: images?.bathymetryDepositionRate,
      isSlideshow: true,
    },
  ];

  const hasImages = tabs.some((tab) => tab.data && tab.data.length > 0);

  return (
    <Styled.Container>
      <Typography variant="h5">Generated Images</Typography>

      <Styled.TabsWrapper>
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <List>
            {tabs.map((tab, index) => (
              <Tab key={index}>{tab.label}</Tab>
            ))}
          </List>
          <Panels>
            {tabs.map((tab, index) => (
              <Panel key={index}>
                <Styled.ImagePanel>
                  {!hasImages || !tab.data || tab.data.length === 0 ? (
                    <Styled.NoImagesMessage>
                      <Typography variant="body_short" color="textTertiary">
                        No images available yet.
                      </Typography>
                    </Styled.NoImagesMessage>
                  ) : tab.isSlideshow && tab.data.length > 0 ? (
                    <ImageSlideshow
                      images={tab.data}
                      orchestrationId={orchestrationId || ''}
                    />
                  ) : (
                    <Styled.ImageGrid>
                      {tab.data.map((filename, imgIndex) => (
                        <Styled.ImageWrapper key={imgIndex}>
                          <StaticImage
                            filename={filename}
                            orchestrationId={orchestrationId || ''}
                            alt={`${tab.label} ${imgIndex + 1}`}
                          />
                        </Styled.ImageWrapper>
                      ))}
                    </Styled.ImageGrid>
                  )}
                </Styled.ImagePanel>
              </Panel>
            ))}
          </Panels>
        </Tabs>
      </Styled.TabsWrapper>
    </Styled.Container>
  );
};
