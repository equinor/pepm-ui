import { Button, Typography } from '@equinor/eds-core-react';
import * as Styled from './ModelAreaCoordinates.styled';

export const ModelAreaCoordinates = ({
  toggleOpen,
}: {
  toggleOpen: () => void;
}) => {
  return (
    <Styled.Wrapper>
      <Typography variant="h3">Model areas</Typography>
      <Typography variant="body_long">
        You can define multiple areas for calculation in your model by entering
        coordinates.
      </Typography>
      <Button onClick={toggleOpen} variant="outlined">
        Set model areas…
      </Button>
    </Styled.Wrapper>
  );
};
