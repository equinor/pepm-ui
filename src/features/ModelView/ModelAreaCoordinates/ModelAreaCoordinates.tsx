import { Button, Card, Chip, Typography } from '@equinor/eds-core-react';
import * as Styled from './ModelAreaCoordinates.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../stores/GlobalStore';
import * as StyledCard from '../../../styles/Card/Card.styled';

export const ModelAreaCoordinates = ({
  toggleOpen,
}: {
  toggleOpen: () => void;
}) => {
  const { analogueModel } = usePepmContextStore();
  const isOwnerOrAdmin = useIsOwnerOrAdmin();

  const chips = () => {
    const modelAreas = ['Whole model'].concat(
      analogueModel.modelAreas.map((x) => x.modelAreaType),
    );

    return modelAreas.map((e, i) => <Chip key={i}>{e}</Chip>);
  };

  return (
    <>
      <Card className="card-areas">
        <Card.Header>
          <Typography variant="h4" as="h3" className="card-title">
            Model areas
          </Typography>
        </Card.Header>
        <StyledCard.Content>
          <Typography variant="body_long">
            You can define multiple areas for calculation in your model by
            entering coordinates. The current areas are listed below:
          </Typography>
          <Styled.ChipWrapper>{chips()}</Styled.ChipWrapper>
          {isOwnerOrAdmin && (
            <Button onClick={toggleOpen} variant="outlined">
              Set model areas…
            </Button>
          )}
        </StyledCard.Content>
      </Card>
    </>
  );
};
