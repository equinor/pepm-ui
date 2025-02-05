/* eslint-disable max-lines-per-function */
import { Button, Icon } from '@equinor/eds-core-react';
import { add as ADD } from '@equinor/eds-icons';
import {
  ComputeCaseDto,
  ComputeMethod,
  ComputeType,
} from '../../api/generated';
import { useIsOwnerOrAdmin } from '../../hooks/useIsOwnerOrAdmin';

export const AddCaseButtons = ({
  title,
  localList,
  addCase,
}: {
  title: string;
  localList?: ComputeCaseDto[];
  addCase?: (methodType: ComputeMethod, computeType: ComputeType) => void;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const filerLocalList = (methodType: string) => {
    if (!localList) return [];
    const methodFileter =
      localList && localList.filter((c) => c.computeMethod === methodType);

    return methodFileter;
  };
  return (
    <>
      {title === ComputeMethod.INDICATOR && addCase && (
        <Button
          variant="ghost"
          onClick={() =>
            addCase(ComputeMethod.INDICATOR, ComputeType.VARIOGRAM)
          }
          disabled={
            filerLocalList(ComputeMethod.INDICATOR).length > 0 ||
            !isOwnerOrAdmin
          }
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
      {title === ComputeMethod.NET_TO_GROSS && addCase && (
        <Button
          variant="ghost"
          onClick={() =>
            addCase(ComputeMethod.NET_TO_GROSS, ComputeType.VARIOGRAM)
          }
          disabled={
            filerLocalList(ComputeMethod.NET_TO_GROSS).length > 0 ||
            !isOwnerOrAdmin
          }
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
      {title === ComputeMethod.CONTINIOUS_PARAMETER && addCase && (
        <Button
          variant="ghost"
          onClick={() =>
            addCase(ComputeMethod.CONTINIOUS_PARAMETER, ComputeType.VARIOGRAM)
          }
          disabled={
            filerLocalList(ComputeMethod.CONTINIOUS_PARAMETER).length > 0 ||
            !isOwnerOrAdmin
          }
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
    </>
  );
};
