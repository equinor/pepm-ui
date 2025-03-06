import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link as externalLink } from '@equinor/eds-icons';
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent';
import { apiConfig } from '../../auth/authConfig';

export const Api = () => {
  return (
    <InfoPageComponent title="Using the PEPM API">
      <Typography variant="body_long">
        For API documentation and interactive testing, please visit our Swagger
        UI interface.
      </Typography>
      <Typography link href={`${apiConfig.baseUrl}/swagger/index.html`}>
        PEPM API reference
        <Icon data={externalLink} title={'Link to Swagger'} size={18} />
      </Typography>
    </InfoPageComponent>
  );
};
