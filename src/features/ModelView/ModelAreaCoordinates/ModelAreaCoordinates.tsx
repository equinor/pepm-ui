import { Button, Card, Chip, Typography } from '@equinor/eds-core-react';
import * as Styled from './ModelAreaCoordinates.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../stores/GlobalStore';

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

    return modelAreas.map((e, i) => (
      <Chip className="busterCards" key={i}>
        {e}
      </Chip>
    ));
  };

  return (
    <Styled.Wrapper>
      {/* <Card style={{ height: '100%', overflow: 'auto' }}> */}
      <Card style={{ height: '100%' }}>
        <Card.Content style={{ padding: '1rem' }}>
          <Typography variant="h3" as="h2">
            Model areas
          </Typography>
          <Typography variant="body_long">
            You can define multiple areas for calculation in your model by
            entering coordinates. The current areas are listed below:
          </Typography>
          <Styled.ChipWrapper>{chips()}</Styled.ChipWrapper>
          {isOwnerOrAdmin && (
            <div>
              <Button onClick={toggleOpen} variant="outlined">
                Set model areas…
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </Styled.Wrapper>
  );
};
