import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

/*
  Note: Hiding the input element because it is ugly,
  difficult to style and inconsistent in design
  across browsers. It can be activated by clicking the label,
  so we style the label like a styled link Typography, so
  the user will know to interact with it to upload files.

  opacity is used to hide the input, because assistive
  tech interprets visibility: hidden or display: none
  to mean that the file input isn't interactive
*/

const FileUpload = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacings.X_SMALL};

  > input[type='file'] {
    opacity: 0;
  }
`;

const SelectFile = styled(Typography).attrs({ variant: 'body_short_link' })`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
`;

export { FileUpload, SelectFile };
