import { Typography } from '@equinor/eds-core-react';
import * as Styled from './NoResults.styled';
import { Link, useLocation } from 'react-router-dom';

export const NoResults = () => {
  const location = useLocation();

  return (
    <Styled.NoResults>
      <Typography variant="h2">No results found</Typography>
      <Typography variant="body_long">
        Please check your compute settings for
        {location.pathname.includes('variogram') && (
          <Link to={'../compute/variogram'}>variogram</Link>
        )}
        {location.pathname.includes('object') && (
          <Link to={'../compute/object'}>object</Link>
        )}
        case.
      </Typography>
    </Styled.NoResults>
  );
};
