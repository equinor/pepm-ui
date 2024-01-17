import { Button, Icon } from '@equinor/eds-core-react';
import { add as ADD } from '@equinor/eds-icons';
import { ComputeCaseDto } from '../../api/generated';

export const AddCaseButtons = ({
  title,
  localList,
  addCase,
}: {
  title: string;
  localList?: ComputeCaseDto[];
  addCase?: (methodType: string) => void;
}) => {
  const filerLocalList = (methodType: string) => {
    if (!localList) return [];
    const methodFileter =
      localList && localList.filter((c) => c.computeMethod.name === methodType);

    return methodFileter;
  };
  return (
    <>
      {title === 'Indicator' && addCase && (
        <Button
          variant="ghost"
          onClick={() => addCase('Indicator')}
          disabled={filerLocalList('Indicator').length > 0}
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
      {title === 'Net-To-Gross' && addCase && (
        <Button
          variant="ghost"
          onClick={() => addCase('Net-To-Gross')}
          disabled={filerLocalList('Net-To-Gross').length > 0}
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
      {title === 'ContiniousParameter' && addCase && (
        <Button
          variant="ghost"
          onClick={() => addCase('ContiniousParameter')}
          disabled={filerLocalList('ContiniousParameter').length > 0}
        >
          <Icon data={ADD} size={18}></Icon>
          Add case
        </Button>
      )}
    </>
  );
};
