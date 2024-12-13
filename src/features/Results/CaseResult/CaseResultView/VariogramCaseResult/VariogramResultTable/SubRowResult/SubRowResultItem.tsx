/* eslint-disable max-lines-per-function */
import { EdsProvider, Icon, Table, Tooltip } from '@equinor/eds-core-react';
import { help_outline as HELP } from '@equinor/eds-icons';
import { roundResultString } from '../../../../../../../utils/RoundResultString';
import { ResultObjectType } from '../TanStackTable/TanStackTable';
import * as Styled from './SubRowResultItem.styled';
export const SubRowResultItem = ({
  resultList,
}: {
  resultList: ResultObjectType[];
}) => {
  return (
    <EdsProvider density="compact">
      <Styled.TableWrapper>
        <Table className="variogram-models-table">
          <Table.Head>
            <Styled.HeaderContent>
              <Table.Cell>Variogram model</Table.Cell>
              <Table.Cell className="align-right">
                Range major <span className="unit">(m)</span>
              </Table.Cell>
              <Table.Cell className="align-right">
                Range minor <span className="unit">(m)</span>
              </Table.Cell>
              <Table.Cell className="align-right">
                Azimuth <span className="unit">(deg)</span>
              </Table.Cell>
              <Table.Cell className="align-right">
                Range vertical <span className="unit">(m)</span>
              </Table.Cell>
              <Table.Cell className="align-right">
                SILL/STD <span className="unit">(m)</span>
              </Table.Cell>
              <Table.Cell>
                <div className="has-tooltip">
                  X/Y/Z quality factor
                  <Tooltip
                    title="The quality factor is based on the 3D-variogram for each axis"
                    placement="top"
                  >
                    <Icon data={HELP} className="icon" />
                  </Tooltip>
                </div>
              </Table.Cell>
            </Styled.HeaderContent>
          </Table.Head>
          <Table.Body>
            {resultList.map((resultItem) => (
              <Table.Row key={resultItem.computeCaseId + resultItem.quality}>
                <Table.Cell>
                  <span className="capitalize">
                    {resultItem.variogramModel}
                  </span>
                </Table.Cell>
                <Table.Cell className="align-right">
                  {resultItem.rmajor}
                </Table.Cell>
                <Table.Cell className="align-right">
                  {resultItem.rminor}
                </Table.Cell>
                <Table.Cell className="align-right">
                  {resultItem.azimuth}
                </Table.Cell>
                <Table.Cell className="align-right">
                  {resultItem.rvertical}
                </Table.Cell>
                <Table.Cell className="align-right">
                  {resultItem.sigma}
                </Table.Cell>
                <Table.Cell>
                  <div>
                    {roundResultString(resultItem.qualityX, 2)} {' / '}
                    {roundResultString(resultItem.qualityY, 2)} {' / '}
                    {roundResultString(resultItem.qualityZ, 2)}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Styled.TableWrapper>
    </EdsProvider>
  );
};
