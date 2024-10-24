import { Button, Typography } from '@equinor/eds-core-react';
import * as Styled from './ModelAreaCoordinates.styled';

export const ModelAreaCoordinates = ({
  toggleOpen,
  hideContent,
}: {
  toggleOpen: () => void;
  hideContent: () => boolean;
}) => {
  return (
    <Styled.Wrapper>
      <Typography variant="h3" as="h2">
        Model areas
      </Typography>
      <Typography variant="body_long">
        You can define multiple areas for calculation in your model by entering
        coordinates.
      </Typography>
      {hideContent() && (
        <Button onClick={toggleOpen} variant="outlined">
          Set model areas…
        </Button>
      )}
    </Styled.Wrapper>
  );
};
