import { Banner, Button, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { ErrorMessage, useErrorStore } from '../../stores/ErrorStore';
import { warning_outlined } from '@equinor/eds-icons';

/* eslint-disable camelcase */
Icon.add({ warning_outlined });

const ErrorList = styled.div`
  position: absolute;
  top: 4rem;
  z-index: 1000;
  width: 100%;
`;
const BannerMessage = styled(Banner.Message)`
  overflow: 'hidden'};
  text-overflow: ellipsis'};
  white-space: 'nowrap'};
`;

export const ErrorNotifications = () => {
  const { errors, removeError } = useErrorStore();
  return (
    <ErrorList>
      {errors.map((error) => (
        <ErrorNotification
          key={error.message}
          error={error}
          removeError={removeError}
        />
      ))}
    </ErrorList>
  );
};

interface ErrorNotificationProps {
  error: ErrorMessage;
  removeError: (error: ErrorMessage) => void;
}
const ErrorNotification = ({ error, removeError }: ErrorNotificationProps) => {
  return (
    <Banner elevation="raised">
      <Banner.Icon variant="warning">
        <Icon color="red" name="warning_outlined" />
      </Banner.Icon>
      <BannerMessage color="red">{error.message}</BannerMessage>
      <Banner.Actions>
        <Button
          variant="outlined"
          color="danger"
          onClick={() => removeError(error)}
        >
          Dismiss
        </Button>
      </Banner.Actions>
    </Banner>
  );
};
