import { Typography } from '@equinor/eds-core-react';
import * as Styled from './NoResults.styled';
import { Link } from 'react-router-dom';

export const NoResults = () => {
  return (
    <Styled.NoResults>
      <Typography variant="h2">No results found</Typography>
      <Typography variant="body_long">
        Please check your compute settings for
        <Link to={'../compute/variogram'}>variogram</Link>
        or
        <Link to={'../compute/object'}>object</Link>
        cases.
      </Typography>
    </Styled.NoResults>
  );
};
