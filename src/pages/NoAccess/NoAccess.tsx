import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link as externalLink } from '@equinor/eds-icons';
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent';

export const NoAccess = () => {
  const requiredAccesses = [
    {
      name: 'Parameter estimation from conseptual geological models',
      type: 'Basic access',
    },
  ];
  return (
    <InfoPageComponent title="Access required">
      <Typography variant="body_long">
        You will need the following access before you can use PEPM:
        {requiredAccesses.map((item) => (
          <li key={item.name}>
            {item.name}
            {' - '}
            {item.type}
          </li>
        ))}
      </Typography>

      <Typography link href="https://accessit.equinor.com/">
        Apply through Access IT
        <Icon data={externalLink} title={'Link to Api'} />
      </Typography>
    </InfoPageComponent>
  );
};
