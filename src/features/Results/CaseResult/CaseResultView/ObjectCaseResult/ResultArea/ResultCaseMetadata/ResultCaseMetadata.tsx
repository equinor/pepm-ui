import { Label, Typography } from '@equinor/eds-core-react';
import * as Styled from './ResultCaseMetadata.styled';

export const ResultCaseMetadata = ({
  computeMethod,
  modelArea,
}: {
  computeMethod?: string;
  modelArea: string;
}) => {
  return (
    <Styled.MetadataWrapperDiv>
      <Styled.MetadataDiv>
        <Label label="Object type"></Label>
        <Typography variant="h5"> {computeMethod}</Typography>
      </Styled.MetadataDiv>
      <Styled.MetadataDiv>
        <Label label="Area"></Label>
        <Typography variant="h5"> {modelArea}</Typography>
      </Styled.MetadataDiv>
    </Styled.MetadataWrapperDiv>
  );
};
