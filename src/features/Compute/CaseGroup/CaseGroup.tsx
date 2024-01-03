/* eslint-disable max-lines-per-function */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  ComputeCaseDto,
  ComputeJobStatus,
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
} from '../../../api/generated';
import { CaseCardComponent } from '../../../components/CaseCardComponent/CaseCardComponent';
import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

export const CaseGroup = ({
  caseList,
  methodName,
  localCaseList,
  saveObjectCase,
  saveCaseAlert,
  runCase,
}: {
  caseList: ComputeCaseDto[];
  methodName: string;
  localCaseList?: ComputeCaseDto[];
  saveObjectCase?: (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  saveCaseAlert: () => void;
  runCase: (computeCaseId: string) => void;
}) => {
  const [localObjectCaseList, setLocalObjectCaseList] = useState<
    ComputeCaseDto[]
  >([]);

  // TODO: Dynamic compute method, can be variogram cases as well
  const addCase = () => {
    const method = {
      computeMethodId: '7b298b84-de00-4134-a07e-ee01119c9949',
      name: methodName,
    };
    const randomId = Math.floor(Math.random() * 100).toString();
    const newCase: ComputeCaseDto = {
      computeCaseId: randomId,
      computeMethod: method,
      modelArea: {
        modelAreaId: '',
        name: '',
      },
      inputSettings: [],
      jobStatus: ComputeJobStatus.NOT_STARTED,
    };

    if (localObjectCaseList.length < 1) {
      setLocalObjectCaseList([...localObjectCaseList, newCase]);
    } else {
      // TODO: Error handling, inform user
      console.log('Just one unsaved case at time');
    }
  };

  const removeLocalCase = (id: string) => {
    const newList = localObjectCaseList.filter((c) => c.computeCaseId !== id);
    setLocalObjectCaseList(newList);
  };

  return (
    <>
      {methodName === 'Channel' && (
        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            <Tooltip
              title={
                localObjectCaseList.length < 1
                  ? ''
                  : 'Only one unsaved case at the time.'
              }
            >
              <Button
                variant="outlined"
                onClick={addCase}
                disabled={localObjectCaseList.length >= 1}
              >
                <Icon data={ADD} size={18}></Icon>
                {methodName}
              </Button>
            </Tooltip>
          </Styled.ButtonGroup>
          <Styled.ButtonGroup>
            <Tooltip title="Functionality not implemented yet.">
              <Button
                variant="outlined"
                onClick={() => console.log('Running all')}
                disabled
              >
                <Icon data={PLAY} size={18}></Icon>
                Run all
              </Button>
            </Tooltip>
          </Styled.ButtonGroup>
        </Styled.ButtonDiv>
      )}

      <CaseCardComponent
        title={methodName}
        key={caseList.length > 0 ? caseList[0].computeCaseId : null}
      >
        <Styled.CaseList>
          {methodName === 'Channel' ? (
            <>
              {caseList.concat(localObjectCaseList).map((c, index) => (
                <CaseRow
                  rowCase={c}
                  key={index}
                  id={c.computeCaseId}
                  allCasesList={caseList.concat(localObjectCaseList)}
                  caseList={caseList}
                  saveObjectCase={saveObjectCase}
                  saveCaseAlert={saveCaseAlert}
                  runCase={runCase}
                  removeLocalCase={removeLocalCase}
                />
              ))}
            </>
          ) : (
            <>
              {localCaseList &&
                caseList
                  .concat(localCaseList)
                  .map((c, index) => (
                    <CaseRow
                      rowCase={c}
                      key={index}
                      id={c.computeCaseId}
                      allCasesList={caseList.concat(localCaseList)}
                      caseList={caseList}
                      saveObjectCase={saveObjectCase}
                      saveCaseAlert={saveCaseAlert}
                      runCase={runCase}
                      removeLocalCase={removeLocalCase}
                    />
                  ))}
            </>
          )}
        </Styled.CaseList>
      </CaseCardComponent>
    </>
  );
};
