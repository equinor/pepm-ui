import { Button, Typography } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router-dom';
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent';

export const InvalidURL = () => {
  const navigate = useNavigate();

  return (
    <InfoPageComponent title="Invalid URL">
      <Typography variant="body_long">This URL is not valid!</Typography>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </InfoPageComponent>
  );
};
