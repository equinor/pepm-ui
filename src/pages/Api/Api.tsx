import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link as externalLink } from '@equinor/eds-icons';
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent';

export const Api = () => {
  return (
    <InfoPageComponent title="Using the PEPM API">
      <Typography variant="body_long">
        For API documentation and interactive testing, please visit our Swagger
        UI interface.
      </Typography>
      {/* TODO Add a link to Swagger */}
      <Typography link href="">
        PEPM API reference
        <Icon data={externalLink} title={'Link to Swagger'} size={18} />
      </Typography>
    </InfoPageComponent>
  );
};
