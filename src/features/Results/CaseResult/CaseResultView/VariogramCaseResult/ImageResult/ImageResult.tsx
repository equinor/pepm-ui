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

type ImageType = {
  id: string;
  label: string;
  searchTerm: string;
  altText: string;
};

const IMAGE_TYPES: ImageType[] = [
  {
    id: 'variogram_slices',
    label: 'Variogram slice',
    searchTerm: 'variogram_slices_',
    altText: 'Variogram x/y/z slice',
  },
  {
    id: 'spherical',
    label: 'Spherical',
    searchTerm: 'spherical-',
    altText: 'Spherical variogram',
  },
  {
    id: 'gaussian',
    label: 'Gaussian',
    searchTerm: 'gaussian',
    altText: 'Gaussian variogram',
  },
  {
    id: 'general_exponential',
    label: 'General exponential',
    searchTerm: 'general_exponential',
    altText: 'General exponential variogram',
  },
  {
    id: 'exponential',
    label: 'Exponential',
    searchTerm: '-exponential',
    altText: 'Exponential variogram',
  },
];

const ImagePanel = ({
  imageId,
  altText,
  label,
}: {
  imageId?: string;
  altText: string;
  label: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['case-image', imageId],
    queryFn: () => getVariogramImage(imageId as string),
    enabled: !!imageId,
  });

  if (!imageId || !data) {
    return (
      <figure className="image-wrapper">
        <Typography variant="body_short" className="placeholder-text">
          {label} variogram model is not included in the result
        </Typography>
      </figure>
    );
  }

  return (
    <>
      {isLoading && (
        <CircularProgress
          color="primary"
          size={24}
          value={100}
          variant="indeterminate"
        />
      )}
      {data && (
        <figure className="image-wrapper">
          <img className="image" alt={altText} src={data} />
        </figure>
      )}
    </>
  );
};

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

  const getImageId = (searchTerm: string) => {
    const image = resultImages?.find((x) => x.fileName.includes(searchTerm));
    return image?.variogramResultFileId;
  };

  return (
    <Styled.Dialog open={open} isDismissable>
      <Dialog.CustomContent className="dialog-content">
        <Tabs activeTab={activeTab} onChange={setActiveTab} className="tabs">
          <Tabs.List>
            {IMAGE_TYPES.map(({ label }) => (
              <Tabs.Tab key={label}>{label}</Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels className="tabs-panels">
            {IMAGE_TYPES.map(({ id, searchTerm, altText, label }) => (
              <Tabs.Panel key={id} className="tabs-panel">
                <ImagePanel
                  imageId={getImageId(searchTerm)}
                  altText={altText}
                  label={label}
                />
              </Tabs.Panel>
            ))}
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
